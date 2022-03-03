import { Fragment, useContext, useEffect } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { CateContext } from '../categories/cateContext'
import { ProductContext } from '../product/ProductContext'
import { Container, Row, Col, Card, Badge, CardGroup, Spinner, ListGroup,ListGroupItem } from 'react-bootstrap'

const ShopPage = () => {
    const {
		ProductState: {products, productloading },
		getProduct,
	} = useContext(ProductContext)

    useEffect(() => getProduct(), [])  
    const {
        CateState: {categories, cateloading },
        GetCategories,
    } = useContext(CateContext)

    useEffect(() => GetCategories(), [])


    const NoImg = "https://www.vkist.gov.vn/upload/21/7/10/noimage.jpg"
   

    let CategoriesHTML 

    let ProductHTML

    if(productloading){

    }else if(products.length == 0){

    }else{
        ProductHTML = (
            <Row>
                {products.map(product => (
                    <Col md="2" key={product._id}>
                        <Card style={{ marginBottom: '20px' }}>
                        <Link to={'/product/'+ product._id}>
                        <Card.Img variant="top" src={NoImg} />
                        </Link>
                            <Card.Body style={{maxHeight: '140px', height: '140px' }}>
                            <Link to={'/product/'+ product._id}> 
                            <Card.Title style={{fontSize: 'small'}}>
                                   {product.title}
                                    </Card.Title>
                             </Link>
                        {product.discount ? (<><small style={{fontSize: '13px'}}><b className='text-secound'><s>{(product.price).toLocaleString()} VNĐ</s></b></small><p><b className='text-danger'>{(product.discount).toLocaleString()} VNĐ</b></p></>):
                            (<p><b className='text-danger'>{(product.price).toLocaleString()} VNĐ</b></p>)}
                            
                          
                            
                        
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                            
                                <ListGroupItem><Badge pill bg="success"><i class="fas fa-shopping-basket"></i></Badge>{' '}<Badge pill bg="warning">Mua</Badge></ListGroupItem>
                              
                            </ListGroup>
                           
                        </Card>
                    </Col>
                ))}
                
                
                


            </Row>
        )
    }

    return (
        <Container>
            <Row>
                <Col md="12">
                    {/* Categories  */}

                </Col>
                <Col md="12">
                    {ProductHTML}
                </Col>
            </Row>
        </Container>
    )
}

export default ShopPage
