
import {
    Card, 
    Form, 
    Row, 
    Col, 
    ListGroup, 
    InputGroup, 
    FormControl,
    Button, Modal} from 'react-bootstrap'
import { CateContext } from './cateContext'
import { useContext, useEffect, useState } from 'react'
import ToastMessage from '../layout/ToastMessage'
const CateEdit =() => {
    const {
        CateState: {category },
        modalShow,
        setModalShow,
        updateCate
	} = useContext(CateContext)
    const [show, setShow] = useState({_status: false, message: null, title: null, _style: null});
    const [updatedCate, setUpdatedCate] = useState(category)

	useEffect(() => setUpdatedCate(category), [category])

	const { cname, description, type_product, status } = updatedCate

	const onChangeForm = event =>
    setUpdatedCate({ ...updatedCate, [event.target.name]: event.target.value })

	// const closeDialog = () => {
	// 	setUpdatedCate(category)
	// 	setModalShow(false)
	// }

	const onSubmit = async event => {
		event.preventDefault()
		const data = await updateCate(updatedCate)
        setShow({_status: true, message: data.message, title: "Thành công", _style: ""}) //success
        setTimeout(() => setShow(null), 2500)
        
        setModalShow(false)
		// setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}
    console.log(updatedCate)

    let OnCheck
    if(category.status == 'ON'){
        OnCheck = (
            <>
             <Form.Check
            inline
            label="Bật"
            name="status"
            type="radio"
            id="On-radio"
            onChange={onChangeForm}
            value="ON"
            defaultChecked
            
        />
        <Form.Check
            inline
            label="Tắt"
            name="status"
            type="radio"
            id="Off-radio"
            onChange={onChangeForm}
            value="OFF"
            
        />
            </>
        )
    }else{
        OnCheck = (
            <>
             <Form.Check
            inline
            label="Bật"
            name="status"
            type="radio"
            id="On-radio"
            onChange={onChangeForm}
            value="ON"
            
            
        />
        <Form.Check
            inline
            label="Tắt"
            name="status"
            type="radio"
            id="Off-radio"
            onChange={onChangeForm}
            value="OFF"
            defaultChecked
            
        />
            </>
        )
    }
    let typeProduct 
    if(category.type_product == "CODE"){
        typeProduct= (
            <>
             <Form.Check
                        inline
                        label="CODE"
                        name="type_product"
                        type="radio"
                        id="CODE-radio"
                        onChange={onChangeForm}
                        value="CODE"
                        defaultChecked
                    />
                    <Form.Check
                        inline
                        label="DOCUMENT"
                        name="type_product"
                        type="radio"
                        id="DOCUMENT-radio"
                        onChange={onChangeForm}
                        value="DOCUMENT"
                    />
                    <Form.Check
                        inline
                        label="MEDIA"
                        name="type_product"
                        type="radio"
                        id="MEDIA-radio"
                        onChange={onChangeForm}
                        value="MEDIA"
                    />
                </>
        )
    }else if(category.type_product == "DOCUMENT"){
        typeProduct= (
            <>
             <Form.Check
                        inline
                        label="CODE"
                        name="type_product"
                        type="radio"
                        id="CODE-radio"
                        onChange={onChangeForm}
                        value="CODE"
                        
                    />
                    <Form.Check
                        inline
                        label="DOCUMENT"
                        name="type_product"
                        type="radio"
                        id="DOCUMENT-radio"
                        onChange={onChangeForm}
                        value="DOCUMENT"
                        defaultChecked
                    />
                    <Form.Check
                        inline
                        label="MEDIA"
                        name="type_product"
                        type="radio"
                        id="MEDIA-radio"
                        onChange={onChangeForm}
                        value="MEDIA"
                    />
                </>
        )
    }else{
        typeProduct= (
            <>
             <Form.Check
                        inline
                        label="CODE"
                        name="type_product"
                        type="radio"
                        id="CODE-radio"
                        onChange={onChangeForm}
                        value="CODE"
                        
                    />
                    <Form.Check
                        inline
                        label="DOCUMENT"
                        name="type_product"
                        type="radio"
                        id="DOCUMENT-radio"
                        onChange={onChangeForm}
                        value="DOCUMENT"
                       
                    />
                    <Form.Check
                        inline
                        label="MEDIA"
                        name="type_product"
                        type="radio"
                        id="MEDIA-radio"
                        onChange={onChangeForm}
                        value="MEDIA"
                        defaultChecked
                    />
                </>
        )
    }
    //onSubmit={AddProductSubmit}
    return (
        <>
        <ToastMessage show={show}/>
        <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
            
          <Form onSubmit={onSubmit}>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Sửa chuyên mục  <b>{category.cname}</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
                                {/* <AlertMessage info={alert} /> */}
                                <Row className="mb-3">
                                    <Form.Group controlId="FormTitle">
                                        <Form.Label>Tên chuyên mục</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Tên chuyên mục" 
                                            name="cname" 
                                            value={cname} 
                                            onChange={onChangeForm}
                                        />
                                    </Form.Group>
                                </Row>    
                                <Row className="mb-3">
                                    <Form.Group controlId="FormDesc">
                                        <Form.Label>Mô tả ngắn <small> (25-50 ký tự)</small></Form.Label>
                                        <Form.Control 
                                            as="textarea" 
                                            rows={2} 
                                            placeholder="Tên Chuyên Mục" 
                                            name="description" 
                                            value={description} 
                                            onChange={onChangeForm}
                                        />
                                    </Form.Group>
                                </Row>  
                                <Row className="mb-3">
                                    <Form.Group controlId="FormType">
                                        <Form.Label>Thể loại</Form.Label><br/>
                                       {typeProduct}
                                    </Form.Group>
                                </Row>  
                               
                                <Row className="mb-3">
                                    <Form.Group controlId="FormStatus">
                                        <Form.Label>Trạng thái</Form.Label><br/>
                                       {OnCheck}
                                       
                                    </Form.Group>
                                </Row> 
                               

                            
        </Modal.Body>
        <Modal.Footer>
        <Button variant="warning" type="submit">
                                   Sửa chuyên mục
                                </Button>
          <Button variant="danger" onClick={() =>setModalShow(false)}>Close</Button>
        </Modal.Footer>
        </Form>
      </Modal>
      </>
    )
}

export default CateEdit
