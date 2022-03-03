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
import NotFound from '../layout/NotFound'
import ReactHtmlParser from 'react-html-parser'
import { ProductContext } from './ProductContext'
import moment from 'moment'
import { CartContext } from '../order/CartContext'
import ToastMessage from '../layout/ToastMessage'

const ProductDetail = () => {
    const { id } = useParams()
    const {
        ProductState: {product, productloading },
		getOneProduct
	} = useContext(ProductContext)
    useEffect(() => {getOneProduct(id)}, [])
    
    const NoImg = "https://www.vkist.gov.vn/upload/21/7/10/noimage.jpg"
    const [show, setShow] = useState({_status: false, message: null, title: null, _style: null});

    const {
		AddToCart,
	} = useContext(CartContext)

    const AddToCartOnClick = async () =>{
        try {
            const res = await AddToCart(id)
            if(res.success){
                setShow({_status: true, message: res.message, title: "Thành công", _style: ""}) //success
                setTimeout(() => setShow(null), 1500)
            }else{
                setShow({_status: true, message: res.message, title: "Thất bại", _style: ""}) //danger
                setTimeout(() => setShow(null), 1500)
            }
        } catch (error) {
             console.log(error)
        }   
    }
    
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
                <ToastMessage show={show} />
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
                            by <Link to="/">{product.userId ? product.userId.fullname : 'Nguời dùng'}</Link>
                            <p>Đăng vào lúc {moment(product.updatedAt).format("d/M/YYYY HH:mm")}</p>
                            
                            {product.discount == null ? (<h5 style={{color: 'red'}}> {(product.price).toLocaleString()} VNĐ</h5>) : (<>   <h5 style={{color: 'red'}}><small><small><small style={{color: 'black'}}><s>{(product.price).toLocaleString()} VNĐ</s> {' - '}</small></small></small>    {(product.discount).toLocaleString()} VNĐ</h5></>)}
                           
                            <Button variant="outline-success" size="sm" onClick={AddToCartOnClick}><i className="fas fa-shopping-basket"></i> Thêm vào giỏ hàng</Button>{' '}
                            <Link to={'/checkout/'+ id} className="btn btn-success btn-sm"><i className="fas fa-shopping-cart"></i> Mua hàng</Link>

                                <br/><br/>
                            <small>Tags: <Badge bg="success">Bootstrap</Badge></small>
                        </Col>
                    </Row>
                    <hr/>
                
                
                <Card.Body>{ReactHtmlParser(product.description)}</Card.Body>
                {/* <Card  bg="success" className="text-white">
  <Card.Header >Bình Luận</Card.Header>
  <Card.Body>
    <FacebookProvider appId="260856202169334">
        <Comments href="http://localhost:3000/product/61cf41e46688bfa34e996f27" />
    </FacebookProvider>
   </Card.Body>
</Card> */}
               
                </Col>
                <Col md={3}>
                
<Card bg="success" className="text-white">
  <Card.Header>Sản phẩm ngẫu nhiên</Card.Header>
  <ListGroup variant="flush">
    <ListGroup.Item>Bài viết Số 1</ListGroup.Item>
    <ListGroup.Item>Bài viết Số 2</ListGroup.Item>
    <ListGroup.Item>Bài viết Số 3</ListGroup.Item>
    <ListGroup.Item>Bài viết Số 4</ListGroup.Item>
    <ListGroup.Item>Bài viết Số 5</ListGroup.Item>
    <ListGroup.Item>Bài viết Số 6</ListGroup.Item>
    <ListGroup.Item>Bài viết Số 7</ListGroup.Item>
    
   
  </ListGroup>
</Card>
<br />
<Card bg="success" className="text-white">
  <Card.Header>Sản phẩm cùng chuyên mục</Card.Header>
  <ListGroup variant="flush">
  <ListGroup.Item>Bài viết Số 1</ListGroup.Item>
    <ListGroup.Item>Bài viết Số 2</ListGroup.Item>
    <ListGroup.Item>Bài viết Số 3</ListGroup.Item>
    <ListGroup.Item>Bài viết Số 4</ListGroup.Item>
    <ListGroup.Item>Bài viết Số 5</ListGroup.Item>
    <ListGroup.Item>Bài viết Số 6</ListGroup.Item>
    <ListGroup.Item>Bài viết Số 7</ListGroup.Item>
    
   
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

export default ProductDetail
