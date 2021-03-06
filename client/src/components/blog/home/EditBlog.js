import { useContext, useEffect, useState } from 'react'
import { PostContext } from '../context/PostContext'
import NotFound from '../../shop/layout/NotFound'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import {Container, 
    Card, 
    Form, 
    Row, 
    Col, 
    ListGroup, 
    InputGroup, 
    FormControl,
    Button, 
    Spinner} from 'react-bootstrap'
import AlertMessage from '../../shop/layout/AlertMessage';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

const EditBlog = () => {
    const { id } = useParams()
    const {
        PostState: {post, postsloading },
        updatePost
	} = useContext(PostContext)

    const navigate = useNavigate()
    const [alert, setAlert] = useState(null)
    const [EditPostForm, setEditPostForm] = useState({
        _id: post ? post._id : '',
        title: post ? post.title : '',
        description: post ? post.description : '',
        tags : post ? post.tags : ''
    })
    const {_id, title, description, tags} = EditPostForm

    const OnchangeEdit = event =>{
        setEditPostForm({
           ...EditPostForm, [event.target.name]: event.target.value
         })
         console.log(EditPostForm)
       }
       const OnchangeTags = (event) =>{
        setEditPostForm({
        ...EditPostForm, [event.target.name]: event.target.value.split(",")
        })
        console.log( { EditPostForm} );
    }
    const OnchageData = ( event, editor ) => {
        const data = editor.getData();
        setEditPostForm({
            ...EditPostForm, description: data
        })


        console.log( { EditPostForm} );
    }
   
    const editPostSubmit =  async event =>{
        event.preventDefault()
        try {
            const EditPostData = await updatePost(EditPostForm)
            if(EditPostData.success){
              setAlert({ type: 'success', message: EditPostData.message })
                      setTimeout(() => setAlert(null), 5000)
              await sleep(1000);
              navigate('/blog/all')
            }else{
              setAlert({ type: 'danger', message: EditPostData.message })
                      setTimeout(() => setAlert(null), 5000)
            }
          } catch (error) {
            console.log(error)
          }
		
    }
       let body
    // console.log(post)
    if(post == null){
        body = (<Navigate to="/blog/all"></Navigate>)
    }else{
        
        body = (
            <Container>
                 <Row>
                     <Col md={8}>
                     <Card >
     
       <Card.Header>Ch???nh s???a b??i vi???t</Card.Header>
       <Card.Body>
     
                     <Form onSubmit={editPostSubmit}>
                     <AlertMessage info={alert} />
       <Row className="mb-3">
         <Form.Group controlId="FormTitle">
           <Form.Label>Ti??u ?????</Form.Label>
           <Form.Control type="text" placeholder="Ti??u ????? b??i vi???t" name="title" value={title} onChange={OnchangeEdit}/>
         </Form.Group>
     
       </Row>
       <Row className="mb-3" >
       <Form.Group controlId="FormContent">
       <Form.Label>N???i dung</Form.Label>
       <CKEditor
                         editor={ ClassicEditor }
                         data={description}
                         onReady={ editor => {
                             // You can store the "editor" and use when it is needed.
                             console.log( 'Editor is ready to use!', editor );
                         } }
                         onChange={OnchageData} 
                        //  onChange={OnchageData} 
                         // onBlur={ ( event, editor ) => {
                         //     console.log( 'Blur.', editor );
                         // } }
                         // onFocus={ ( event, editor ) => {
                         //     console.log( 'Focus.', editor );
                         // } }
                     />
                     
      
      </Form.Group>
       </Row>
     
       <Form.Group className="mb-3" controlId="FormTags">
         <Form.Label>Tags</Form.Label>
         <p><small style={{color:'red', fontSize: '11px'}}> C??c tag c??ch nhau b???ng d???u ph???y ( ,) </small></p>
         <Form.Control placeholder="Tags" name="tags"  value={tags} onChange={OnchangeTags}/>
       </Form.Group>
     
     
     
       <Button variant="primary" type="submit">
        Ch???nh s???a b??i vi???t
       </Button>
     </Form>
     </Card.Body>
     </Card>
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
           Search
         </Button>
       </InputGroup>
       </Card.Body>
     </Card>
     <br />
     <Card >
     <Card.Header>N???i quy ????ng b??i</Card.Header>
  <ListGroup variant="flush">
    <ListGroup.Item>Ghi ????ng ch??nh t???</ListGroup.Item>
    <ListGroup.Item>Kh??ng ???????c vi ph???m ph??p lu???t</ListGroup.Item>
    <ListGroup.Item>Kh??ng ph?? gi?? th??? tru??ng</ListGroup.Item>
   
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

export default EditBlog
