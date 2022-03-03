import { useParams, Link } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { PostContext } from '../context/PostContext'
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
import NotFound from '../../shop/layout/NotFound'
import ReactHtmlParser from 'react-html-parser'; 


const BlogDetails = () => {
    const { id } = useParams()
    const {
        PostState: {post, postsloading },
		getOnePosts
	} = useContext(PostContext)

    useEffect(() => {getOnePosts(id)}, [])
    let body
 
    if (postsloading) {
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
    }else if(post == null){ 
            return <NotFound />
            // Navigate('/')
        
	}else{
        body = (
            <Container>
            <Row>
                <Col md={8} style={{borderRight: '1px solid #ddd'}}>
                <h1>
                    {post.title}
                </h1>
                <p className="lead"> by <Link to="/">Super User</Link>
                </p>
                <hr/>
                <p> Posted on August 24, 2014 at 9:00 PM</p>
				<p> Tags: <Badge bg="primary">Bootstrap</Badge></p>
                <hr />
                
                <Card.Body>{ReactHtmlParser(post.description)}</Card.Body>
               
                </Col>
                <Col md={4}>
                <Card>

  <Card.Body>
      
  
  <InputGroup>
    <FormControl
      placeholder="Nhap noi dung tim kiem"
      aria-label="Nhap noi dung tim kiem"
      aria-describedby="basic-addon2"
    />
    <Button variant="outline-secondary" id="button-addon2">
      Đăng Bài
    </Button>
  </InputGroup>
  </Card.Body>
</Card>
<br />
      
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
        <>
         {body}
        </>
      
    )
}

export default BlogDetails
