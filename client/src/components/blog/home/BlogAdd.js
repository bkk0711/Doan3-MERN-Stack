import {useContext, useState} from 'react'
import {Container, 
    Card, 
    Form, 
    Row, 
    Col, 
    ListGroup, 
    InputGroup, 
    FormControl,
    Button} from 'react-bootstrap'
    
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PostContext } from '../context/PostContext';
import { useNavigate } from 'react-router-dom';
import AlertMessage from '../../shop/layout/AlertMessage';

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const BlogAdd = () => {
    const {AddPost} = useContext(PostContext)
    const navigate = useNavigate()
    
    const [AddPostForm, setAddPostForm] = useState({
        title: '',
        description: '',
        tags : '',
        thumbnail: ''
    })

    const [alert, setAlert] = useState(null)

    const {title, description, tags, thumbnail} = AddPostForm

    const OnchageData = ( event, editor ) => {
        const data = editor.getData();
        setAddPostForm({
            ...AddPostForm, description: data
        })
        // console.log( { AddPostForm, data } );
    }

    const OnchangeAddPost = (event) =>{
        setAddPostForm({
        ...AddPostForm, [event.target.name]: event.target.value
        })
        // console.log( { AddPostForm} );
   }
   const handlePhoto = (e) => {
    setAddPostForm({...AddPostForm, thumbnail: e.target.files[0]});
}
   const OnchangeTags = (event) =>{
        setAddPostForm({
        ...AddPostForm, [event.target.name]: event.target.value.split(",")
        })
        // console.log( { AddPostForm} );
   }
   const AddPostSubmit = async event =>{
    event.preventDefault()
    try {
      const formData = new FormData();
      formData.append('thumbnail', AddPostForm.thumbnail);
      formData.append('title', AddPostForm.title);
      formData.append('description', AddPostForm.description);
      formData.append('tags', AddPostForm.tags);

      const AddPostData = await AddPost(formData)
      if(AddPostData.success){
        setAlert({ type: 'success', message: AddPostData.message })
				setTimeout(() => setAlert(null), 5000)
        await sleep(1000);
        navigate('/blog/add')
      }else{
        setAlert({ type: 'danger', message: AddPostData.message })
				setTimeout(() => setAlert(null), 5000)
      }
    } catch (error) {
      console.log(error)
    }
}

    return (
       <Container>
            <Row>
                <Col md={8}>
                <Card >

  <Card.Header>Đăng bài viết mới</Card.Header>
  <Card.Body>

                <Form onSubmit={AddPostSubmit} encType='multipart/form-data'>
                <AlertMessage info={alert} />
  <Row className="mb-3">
    <Form.Group controlId="FormTitle">
      <Form.Label>Tiêu đề</Form.Label>
      <Form.Control type="text" placeholder="Tiêu đề bài viết" name="title" onChange={OnchangeAddPost}/>
    </Form.Group>

  </Row>
  <Row className="mb-3" >
  <Form.Group controlId="FormContent">
  <Form.Label>Nội dung</Form.Label>
  <CKEditor
                    editor={ ClassicEditor }
                    data="<p></p><p></p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={OnchageData} 
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
    <p><small style={{color:'red', fontSize: '11px'}}> Các tag cách nhau bằng dấu phẩy ( ,) </small></p>
    <Form.Control placeholder="Tags" name="tags" onChange={OnchangeTags}/>
  </Form.Group>
  <Row className="mb-3">

<Form.Group controlId="FormThumbnail">
<Form.Label>Thumbnail</Form.Label>
<br/>
<input 
    type="file" 
    accept=".png, .jpg, .jpeg"
    name="thumbnail"
    onChange={handlePhoto}
/>
</Form.Group>
</Row>        


  <Button variant="primary" type="submit">
    Đăng bài viết
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
      Tìm Kiếm
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
    {/* <ListGroup.Item>Cras justo odio</ListGroup.Item>
    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
    <ListGroup.Item>Cras justo odio</ListGroup.Item> */}
   
  </ListGroup>
</Card>

                </Col>
            </Row>
            </Container>
    )
}

export default BlogAdd
