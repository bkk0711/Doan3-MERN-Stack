import {Form, Button, Modal, Row} from 'react-bootstrap'
import { useContext, useState, useEffect } from 'react'
import { PostContext } from '../context/PostContext'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const EditModel = () => {
    const {
		postState: { post },
		showUpdatePostModal,
		setShowUpdatePostModal,
		updatePost,
		setShowToast
	} = useContext(PostContext)

	// State
	const [updatedPost, setUpdatedPost] = useState(post)

	useEffect(() => setUpdatedPost(post), [post])

	const { title, description, tags } = updatedPost

	const onChangeUpdatedPostForm = event =>
		setUpdatedPost({ ...updatedPost, [event.target.name]: event.target.value })

    const OnchangeTags = (event) =>{
        setUpdatedPost({
        ...updatedPost, [event.target.name]: event.target.value.split(",")
        })
        // console.log( { AddPostForm} );
    }
    const OnchageData = ( event, editor ) => {
        const data = editor.getData();
        setUpdatedPost({
            ...updatedPost, description: data
        })
        // console.log( { AddPostForm, data } );
    }
    
	const closeDialog = () => {
		setUpdatedPost(post)
		setShowUpdatePostModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updatePost(updatedPost)
		setShowUpdatePostModal(false)
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

    return (
        <Modal show={showUpdatePostModal} onHide={closeDialog}>
        <Modal.Header closeButton>
            <Modal.Title>Making progress?</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
            <Modal.Body>
                     {/* <AlertMessage info={alert} /> */}
       <Row className="mb-3">
         <Form.Group controlId="FormTitle">
           <Form.Label>Tiêu đề</Form.Label>
           <Form.Control type="text" placeholder="Tiêu đề bài viết" name="title" value={title} onChange={onChangeUpdatedPostForm}/>
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
         <Form.Control placeholder="Tags" name="tags"  value={tags} onChange={OnchangeTags}/>
       </Form.Group>
     
     
     
       
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={closeDialog}>
                    Cancel
                </Button>
                <Button variant="primary" type="submit">
        Chỉnh sửa bài viết
       </Button>
            </Modal.Footer>
        </Form>
    </Modal>
    )
}

export default EditModel
