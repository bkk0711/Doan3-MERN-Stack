import { useParams, Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import {Container, 
    Spinner, 
    Card, 
    Badge, 
    Row, 
    Col, 
    ListGroup, 
    InputGroup, 
    FormControl,
    Button} from 'react-bootstrap'
import NotFound from '../shop/layout/NotFound'
import ReactHtmlParser from 'react-html-parser'
import moment from 'moment'
import { ProductContext } from '../shop/product/ProductContext'

const AdminViewProduct = () => {
    const { id } = useParams()
    const {
        ProductState: {product, productloading },
		AdminViewProduct
	} = useContext(ProductContext)
    useEffect(() => {AdminViewProduct(id)}, [])
    
    const NoImg = "https://www.vkist.gov.vn/upload/21/7/10/noimage.jpg"
    console.log(product)
    let body
 
    if (productloading) {
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
    }else if(product == null){ 
            return <NotFound />
            // Navigate('/')
        
	}else{
        body = (
            <Container>
               
            <Row>
                <Col md={9} style={{borderRight: '1px solid #ddd'}}>
                    <Row>
                        <Col md="5">
                            <img src={NoImg} className='thumbnail' style={{width: '100%'}}/>
                            <br/><br/>
                            <center>
                            <p><Button variant="success" size="sm"><i className="fas fa-tv"></i> Xem Demo</Button></p>
                            </center>
                           
                        </Col>
                        <Col md="7">
                            <h3>
                                {product.title}
                            </h3>
                            <hr/>
                            <font style={{color:'green'}}>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                            </font> 4.5/ 5 <br/>
                            by <Link to="/">{product.userId ? product.userId.fullname : 'Ngu???i d??ng'}</Link>
                            <p>????ng v??o l??c {moment(product.updatedAt).format("d/M/YYYY HH:mm")}</p>
                            
                            {product.discount == null ? (<h5 style={{color: 'red'}}> {(product.price).toLocaleString()} VN??</h5>) : (<>   <h5 style={{color: 'red'}}><small><small><small style={{color: 'black'}}><s>{(product.price).toLocaleString()} VN??</s> {' - '}</small></small></small>    {(product.discount).toLocaleString()} VN??</h5></>)}
                           
                            <Button variant="outline-success" size="sm"><i className="fas fa-shopping-basket"></i> Th??m v??o gi??? h??ng</Button>{' '}
                            <Link to="/" className="btn btn-success btn-sm"><i className="fas fa-shopping-cart"></i> Mua h??ng</Link>

                                <br/><br/>
                            <small>Tags: <Badge bg="success">Bootstrap</Badge></small>
                        </Col>
                    </Row>
                    <hr/>
                
                
                <Card.Body>{ReactHtmlParser(product.description)}</Card.Body>
               
                </Col>
                <Col md={3}>
               
<Card bg="success" className="text-white">
  <Card.Header>S???n ph???m ng???u nhi??n</Card.Header>
  <ListGroup variant="flush">
    <ListGroup.Item>B??i vi???t S??? 1</ListGroup.Item>
    <ListGroup.Item>B??i vi???t S??? 2</ListGroup.Item>
    <ListGroup.Item>B??i vi???t S??? 3</ListGroup.Item>
    <ListGroup.Item>B??i vi???t S??? 4</ListGroup.Item>
    <ListGroup.Item>B??i vi???t S??? 5</ListGroup.Item>
    <ListGroup.Item>B??i vi???t S??? 6</ListGroup.Item>
    <ListGroup.Item>B??i vi???t S??? 7</ListGroup.Item>
    
   
  </ListGroup>
</Card>
<br />
<Card bg="success" className="text-white">
  <Card.Header>S???n ph???m c??ng chuy??n m???c</Card.Header>
  <ListGroup variant="flush">
  <ListGroup.Item>B??i vi???t S??? 1</ListGroup.Item>
    <ListGroup.Item>B??i vi???t S??? 2</ListGroup.Item>
    <ListGroup.Item>B??i vi???t S??? 3</ListGroup.Item>
    <ListGroup.Item>B??i vi???t S??? 4</ListGroup.Item>
    <ListGroup.Item>B??i vi???t S??? 5</ListGroup.Item>
    <ListGroup.Item>B??i vi???t S??? 6</ListGroup.Item>
    <ListGroup.Item>B??i vi???t S??? 7</ListGroup.Item>
    
   
  </ListGroup>
</Card>
                </Col>
            </Row>
            </Container>
            
        )
    }
    return (
        <div>
            {body}
        </div>
    )
}

export default AdminViewProduct
