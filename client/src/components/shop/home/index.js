import { Fragment, useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Card, Badge, CardGroup, Spinner, ListGroup,ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext'
import { PostContext } from '../../blog/context/PostContext'
import { ProductContext } from '../product/ProductContext'
import moment from 'moment'
import { CartContext } from '../order/CartContext'
import ToastMessage from '../layout/ToastMessage'
import { IMG_URL } from '../auth/constans'
const HomePage = () => {
  
    const {authState: {authLoading, isAuthenticated, user}} = useContext(AuthContext)
    const {
		PostState: {posts, postsloading },
		getPosts,
	} = useContext(PostContext)
    
    const {
		ProductState: {products, productloading },
		getProduct,
	} = useContext(ProductContext)

    const {
		AddToCart,
	} = useContext(CartContext)

    useEffect(() => getPosts(1, 4), [])
    useEffect(() => getProduct(1, 12), [])
    const [show, setShow] = useState({_status: false, message: null, title: null, _style: null});
    const AddToCartOnClick = async id =>{
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

    const NoImg = "https://www.vkist.gov.vn/upload/21/7/10/noimage.jpg"
    const Noavt = "/img/noavt.png"

    let userInfo
    if (authLoading)
    return (
        <div className='d-flex justify-content-center mt-2'>
            <Spinner animation='border' variant='info' />
        </div>
    )
    else if (isAuthenticated) userInfo = (  
            <>
                     <Row>
                     <Col md="5">
                         <Card>
                            <Card.Body>
                                <Row>
                                <Col md="6">
                                    <img src={Noavt} style={{width:'100%'}}/>
                                </Col>
                                <Col md="6"> 
                                <Card.Title>{user.fullname} {user.verified == true ? (<i className="fas fa-check-circle" style={{fontSize: '18px',color: 'green'}}></i>) : ''}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">@{user.username}</Card.Subtitle>
                            <Card.Text>
                            Số Dư : <b>{(user.balance).toLocaleString()} Coin</b>
                            </Card.Text>
                            <div className="d-grid gap-2">
                            <Link to="/blog/add" className='btn btn-success btn-sm btn-block' >Đăng Bài Viết</Link>
                            
                            <Link to="/product/add" className='btn btn-danger btn-sm btn-block'>Đăng Sản Phẩm</Link>
                            </div>
                                </Col>
                            </Row>
                            </Card.Body>
                            </Card> 
                         </Col>
                         <Col md="3">
                      
                           
                            {/* <ListGroup>
                                <ListGroup.Item>Tổng số sản phẩm: <b>100</b></ListGroup.Item>
                                <ListGroup.Item>Tổng số đơn hàng: <b>500</b></ListGroup.Item>
                                <ListGroup.Item>Tổng số bài viết: <b>200</b></ListGroup.Item>
                                <ListGroup.Item>Đánh giá: <font style={{color: 'green'}}><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i> <i className="fas fa-star-half-alt"></i></font></ListGroup.Item>
                                <ListGroup.Item>Tổng số bài viết: <b>200</b></ListGroup.Item>
                            </ListGroup> */}
                    

                         </Col>
                         
                     </Row>
           
           
                     <hr />
        </>
       )
    let HTMLPost
       if (postsloading) {
            HTMLPost = (
                <div className='spinner-container'>
                    <Spinner animation='border' variant='info' />
                </div>
            )
	    } else if (posts.length === 0) {

        }else{
            HTMLPost = (
                <>
                <hr/>
            
            <Row>
                <Col md="12">
                <h2 className="title-panel">
                    Tin tức mới nhất
                </h2>
                </Col>
                <Col md="12">
                <CardGroup>
                {posts.map(post => (
				
                <Card key={post._id}>
                    <Link to={'/blog/'+post._id} key={'thumbnail-' + post._id}>
                    <Card.Img variant="top" src={post.thumbnail? `${IMG_URL}/public/uploads/products/${post.thumbnail}` : NoImg} />
                    </Link>
                    <Card.Body>
                    <Link to={'/blog/'+post._id} key={'content-' + post._id}>
                    <Card.Title>{post.title}</Card.Title>
                    </Link>
                    </Card.Body>
                    <Card.Footer>
                    <small className="text-muted">{moment(post.createdAt).format("d/M/YYYY HH:mm")}</small>
                    </Card.Footer>
                </Card>
              
               
                
					))}
                
                </CardGroup>
                </Col>
            </Row>
           
            </>
            )
        }

        let HTMLProductList 

        if(productloading){
            HTMLProductList = ( 
                <div className='spinner-container'>
                <Spinner animation='border' variant='info' />
                </div>
            )
        }else if(products.length == 0 ){

        }else{
            HTMLProductList = (
                
                <Row>
                <Col md="12">
                    <h2 className='title-panel'>Sản phẩm mới nhất</h2>
                </Col>

                {products.map(product => (
                    <Col md="2" key={product._id}>
                        <Card style={{ marginBottom: '20px' }}>
                        <Link to={'/product/'+ product._id}>
                        <Card.Img variant="top" src={product.thumbnail ? `${IMG_URL}/public/uploads/products/${product.thumbnail}`: NoImg} />
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
                            
                                <ListGroupItem>
                                    <Badge pill bg="success" onClick={AddToCartOnClick.bind(this, product._id)} style={{ cursor: 'pointer'}}>
                                        <i className="fas fa-shopping-basket"></i>
                                        </Badge>{' '}
                                        <Badge pill bg="warning" style={{ cursor: 'pointer'}}>
                                            Mua
                                        </Badge>
                                </ListGroupItem>
                              
                            </ListGroup>
                           
                        </Card>
                    </Col>
                ))}

                <hr/>
                <Col md="12">
                    <h2 className='title-panel'>Mã nguồn mới nhất</h2>
                </Col>

                {products.map(product => (
                    <Col md="2" key={product._id}>
                        <Card style={{ marginBottom: '20px' }}>
                        <Link to={'/product/'+ product._id}>
                        <Card.Img variant="top" src={product.thumbnail ? `${IMG_URL}/public/uploads/products/${product.thumbnail}` :NoImg} />
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
                            
                                <ListGroupItem>
                                    <Badge pill bg="success" onClick={AddToCartOnClick.bind(this, product._id)} style={{ cursor: 'pointer'}}>
                                        <i className="fas fa-shopping-basket"></i>
                                        </Badge>{' '}
                                        <Badge pill bg="warning" style={{ cursor: 'pointer'}}>
                                            Mua
                                        </Badge>
                                </ListGroupItem>
                              
                            </ListGroup>
                           
                        </Card>
                    </Col>
                ))}
                <hr/>
                <Col md="12">
                    <h2 className='title-panel'>Tài liệu mới nhất</h2>
                </Col>

                {products.map(product => (
                    <Col md="2" key={product._id}>
                        <Card style={{ marginBottom: '20px' }}>
                        <Link to={'/product/'+ product._id}>
                        <Card.Img variant="top" src={product.thumbnail ? `${IMG_URL}/public/uploads/products/${product.thumbnail}` : NoImg} />
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
                            
                                <ListGroupItem>
                                    <Badge pill bg="success" onClick={AddToCartOnClick.bind(this, product._id)} style={{ cursor: 'pointer'}}>
                                        <i className="fas fa-shopping-basket"></i>
                                        </Badge>{' '}
                                        <Badge pill bg="warning" style={{ cursor: 'pointer'}}>
                                            Mua
                                        </Badge>
                                </ListGroupItem>
                              
                            </ListGroup>
                           
                        </Card>
                    </Col>
                ))}
                
                <hr/>
                <Col md="12">
                    <h2 className='title-panel'>Đồ hoạ mới nhất</h2>
                </Col>

                {products.map(product => (

                    <Col md="2" key={product._id}>
                        <Card style={{ marginBottom: '20px' }}>
                        <Link to={'/product/'+ product._id}>
                        <Card.Img variant="top" src={product.thumbnail ? `${IMG_URL}/public/uploads/products/${product.thumbnail}` : NoImg} />
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
                            
                                <ListGroupItem>
                                    <Badge pill bg="success" onClick={AddToCartOnClick.bind(this, product._id)} style={{ cursor: 'pointer'}}>
                                        <i className="fas fa-shopping-basket"></i>
                                        </Badge>{' '}
                                        <Badge pill bg="warning" style={{ cursor: 'pointer'}}>
                                            Mua
                                        </Badge>
                                </ListGroupItem>
                              
                            </ListGroup>
                           
                        </Card>
                    </Col>
                ))}


            </Row>
            )
        }



    return (
       <Fragment>
           <Container>
            <ToastMessage show={show}/>
                {userInfo}
                {HTMLProductList}   
                {HTMLPost}
           
            </Container>
       </Fragment>
    )
}

export default HomePage
