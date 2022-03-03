import { useParams, Link } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { PostContext } from '../blog/context/PostContext'
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
import ReactHtmlParser from 'react-html-parser'; 


const AdminViewBlog = () => {
    const {
        PostState: {post},
	} = useContext(PostContext)


    let body
 
 if(post == null){ 
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
<Card >
<Card.Header>Nội quy đăng bài</Card.Header>
  <ListGroup variant="flush">
    <ListGroup.Item>Ghi đúng chính tả</ListGroup.Item>
    <ListGroup.Item>Không được vi phạm pháp luật</ListGroup.Item>
    <ListGroup.Item>Không phá giá thị truòng</ListGroup.Item>
   
  </ListGroup>
</Card>
<br />
<Card >
  {/* <Card.Header>Featured</Card.Header>
  <ListGroup variant="flush">
    <ListGroup.Item>Cras justo odio</ListGroup.Item>
    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
    <ListGroup.Item>Cras justo odio</ListGroup.Item>
    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
    <ListGroup.Item>Cras justo odio</ListGroup.Item>
   
  </ListGroup> */}
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

export default AdminViewBlog
