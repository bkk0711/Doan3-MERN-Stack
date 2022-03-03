import {Container, 
    Spinner, 
    Card, 
    Badge, 
    Row, 
    Col, 
    ListGroup, 
    InputGroup, 
    FormControl,
    Form,
    Button,
    Modal} from 'react-bootstrap'
    
import { Fragment, useContext, useEffect, useState } from 'react'
import { PostContext } from '../blog/context/PostContext'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ToastMessage from '../shop/layout/ToastMessage';
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
const AdminEditPost = () => {
    const {
		PostState: {post },
        updatePost,
        showUpdatePostModal,
        setShowUpdatePostModal
	} = useContext(PostContext)
    const [EditPostForm, setEditPostForm] = useState(post)
    useEffect(() => setEditPostForm(post), [post])
    const [show, setShow] = useState({_status: false, message: null, title: null, _style: null});
    const {_id, title, description, tags, status} = EditPostForm
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
    const editPostSubmit = async (event) =>{
        event.preventDefault()
        try {
            const EditPostData = await updatePost(EditPostForm)
            if(EditPostData.success){
                setShow({_status: true, message: EditPostData.message, title: "Thành công", _style: ""}) //success
                setTimeout(() => setShow(null), 3000)
              await sleep(500);
              setShowUpdatePostModal(false)
            }else{
                setShow({_status: true, message: EditPostData.message, title: "Thất bại", _style: ""}) //success
                setTimeout(() => setShow(null), 3000)
            }
          } catch (error) {
            console.log(error)
            setShow({_status: true, message: error.message, title: "Thất bại", _style: ""}) //success
            setTimeout(() => setShow(null), 3000)
          }
    }
    let tagsText = tags.join(",")
    let OnCheck
    if(status == 'WAITING'){
        OnCheck = (
            <>
              <Form.Check
                      inline
                      label="Chờ Duyệt"
                      name="status"
                      type="radio"
                      id="WAITING-radio"
                      onChange={OnchangeEdit}
                      value="WAITING"
                      defaultChecked
                  />
                  <Form.Check
                      inline
                      label="Đã Duyệt"
                      name="status"
                      type="radio"
                      id="OK-radio"
                      onChange={OnchangeEdit}
                      value="OK"
                  />

                  <Form.Check
                      inline
                      label="Huỷ bỏ"
                      name="status"
                      type="radio"
                      id="CANCEL-radio"
                      onChange={OnchangeEdit}
                      value="CANCEL"
                  />
            </>
        )
    }else if(status == 'OK'){
      OnCheck = (
        <>
          <Form.Check
                  inline
                  label="Chờ Duyệt"
                  name="status"
                  type="radio"
                  id="WAITING-radio"
                  onChange={OnchangeEdit}
                  value="WAITING"
                 
              />
              <Form.Check
                  inline
                  label="Đã Duyệt"
                  name="status"
                  type="radio"
                  id="OK-radio"
                  onChange={OnchangeEdit}
                  value="OK"
                  defaultChecked
              />

              <Form.Check
                  inline
                  label="Huỷ bỏ"
                  name="status"
                  type="radio"
                  id="CANCEL-radio"
                  onChange={OnchangeEdit}
                  value="CANCEL"
              />
        </>
    )
    }else{
      OnCheck = (
        <>
          <Form.Check
                  inline
                  label="Chờ Duyệt"
                  name="status"
                  type="radio"
                  id="WAITING-radio"
                  onChange={OnchangeEdit}
                  value="WAITING"
                 
              />
              <Form.Check
                  inline
                  label="Đã Duyệt"
                  name="status"
                  type="radio"
                  id="OK-radio"
                  onChange={OnchangeEdit}
                  value="OK"
                 
              />

              <Form.Check
                  inline
                  label="Huỷ bỏ"
                  name="status"
                  type="radio"
                  id="CANCEL-radio"
                  onChange={OnchangeEdit}
                  value="CANCEL"
                  defaultChecked
              />
        </>
    )
    }
    return (
       <>
         <ToastMessage show={show}/>
       <Modal
      show={showUpdatePostModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
         <Form onSubmit={editPostSubmit}>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
         Cập nhật bài viết
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
     
                     
       <Row className="mb-3">
         <Form.Group controlId="FormTitle">
           <Form.Label>Tiêu đề</Form.Label>
           <Form.Control type="text" placeholder="Tiêu đề bài viết" name="title" value={title} onChange={OnchangeEdit}/>
         </Form.Group>
     
       </Row>
       <Row className="mb-3" >
       <Form.Group controlId="FormContent">
       <Form.Label>Nội dung</Form.Label>
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
         <p><small style={{color:'red', fontSize: '11px'}}> Các tag cách nhau bằng dấu phẩy ( ,) </small></p>
         <Form.Control placeholder="Tags" name="tags"  value={tagsText} onChange={OnchangeTags}/>
       </Form.Group>
     
       <Form.Group className="mb-3" controlId="FormStatus">
         <Form.Label>Trạng thái</Form.Label><br/>
        {OnCheck}
       </Form.Group>
     
     
      
     
      </Modal.Body>
      <Modal.Footer>
      <Button variant="warning" type="submit">
        Chỉnh sửa bài viết
       </Button>
        <Button onClick={()=>{ setShowUpdatePostModal(false)}}>Close</Button>
      </Modal.Footer>
      </Form>
    </Modal>
    </>
    )
}

export default AdminEditPost
