


import {Container, 
    Spinner, 
    Card, 
    Badge, 
    Row, 
    Col, 
    ListGroup, 
    InputGroup, 
    Form,
    Button,
    Modal} from 'react-bootstrap'
import { AuthContext } from '../shop/auth/AuthContext'
import { Fragment, useContext, useEffect, useState } from 'react'
import ToastMessage from '../shop/layout/ToastMessage';
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

const AdminEditUser = () => {
    const {UserState:{OneUser}, ModelEditShow, setModelEditShow, EditUser } = useContext(AuthContext)
    const [EditUserForm, setEditUserForm] = useState(OneUser)
    useEffect(() => setEditUserForm(OneUser), [OneUser])
    const [show, setShow] = useState({_status: false, message: null, title: null, _style: null});
    const {balance, email, fullname, verified} = EditUserForm
    const OnchangeEdit = event =>{
        setEditUserForm({
           ...EditUserForm, [event.target.name]: event.target.value
         })
       }
    
    const OnsubmitEditUser = async (event) =>{
        event.preventDefault()
        try {
            const res = await EditUser(EditUserForm)
            if(res.success)
            setShow({_status: true, message: res.message, title: "Thành công", _style: ""}) //success
            setTimeout(() => setShow(null), 3000)
             await sleep(500);
             setModelEditShow(false)

        } catch (error) {
            console.log(error)
            setShow({_status: true, message: error.message, title: "Thất bại", _style: ""}) //success
            setTimeout(() => setShow(null), 2500)
        }
    }
    console.log(EditUserForm)
    return (
        <>
        <ToastMessage show={show} />
        <Modal
        size="lg"
        show={ModelEditShow.show}
        onHide={() => setModelEditShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
      >
           <Form onSubmit={OnsubmitEditUser}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Cập nhật <b>{OneUser.username}</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className="mb-3" controlId="username" >
            <Form.Label>UserName</Form.Label>
            <Form.Control type="text" value={OneUser.username}  disabled />
        </Form.Group>
        <Form.Group className="mb-3" controlId="fullname">
            <Form.Label>Họ & Tên</Form.Label>
            <Form.Control type="text" name="fullname" value={fullname} onChange={OnchangeEdit} placeholder="Bùi Khôi" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Email">
            <Form.Label>Địa chỉ Email</Form.Label>
            <Form.Control type="email" name="email" value={email} onChange={OnchangeEdit} placeholder="name@example.com" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="balance">
            <Form.Label>Số Dư</Form.Label>
            <Form.Control type="number" name="balance" value={balance} onChange={OnchangeEdit} placeholder="100000" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="verified">
            <Form.Label>Xác Minh</Form.Label>
            <Form.Check 
        type='radio'
        id={`default-VERI`}
        label={`Đã xác minh`}
        name="verified"
        onChange={OnchangeEdit}
        value="true"
        // checked="true"
        defaultChecked={OneUser.verified == true ? true: false}
      />
       <Form.Check 
        type='radio'
        id={`default-NOVERI`}
        label={`Chưa xác minh`}
        name="verified"
        onChange={OnchangeEdit}
        value="false"
        // checked="true"
        defaultChecked={OneUser.verified != true ? true: false}
      />
        </Form.Group>
        

        </Modal.Body>
        <Modal.Footer>
        <Button type='submit' variant='warning'>Cập nhật</Button>
          <Button onClick={() => setModelEditShow({show:false})}>Close</Button>
        </Modal.Footer>
        </Form>
      </Modal>
      </>
    )
}

export default AdminEditUser
