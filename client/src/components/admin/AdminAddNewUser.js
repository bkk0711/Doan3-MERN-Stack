
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
const AdminAddNewUser = () => {
    const {AddNewUser, ModelShow, setModelShow} = useContext(AuthContext)
    
 const [registerform, setRegisterForm] = useState({
    fullname: '',
    email: '',
    username : '',
    password: ''
  })
  
 const {fullname, email, username, password, re_password} = registerform

 const OnchangeRegister = event =>{
  setRegisterForm({
     ...registerform, [event.target.name]: event.target.value
   })
 }
 const [show, setShow] = useState({_status: false, message: null, title: null, _style: null});
  const register = async event =>{
    event.preventDefault()
    if(password != re_password){
        setShow({_status: true, message: "Mật khẩu không giống nhau", title: "Thử lại", _style: ""}) //success
        setTimeout(() => setShow(null), 2500)
      return
    }
    try {
      const RegisterData = await AddNewUser(registerform)
      if(RegisterData.success){
        setShow({_status: true, message: "Thêm mới người dùng thành công", title: "Thành công", _style: ""}) //success
        setTimeout(() => setShow(null), 3000)
        setModelShow(false)
        setRegisterForm({
            ...registerform, 
            fullname: '',
            email: '',
            username : '',
            password: '',
            re_password: ''
          })
        // await sleep(1500);
        // navigate('/')
      }else{
        setShow({_status: true, message: RegisterData.message, title: "Thử lại", _style: ""}) //success
        setTimeout(() => setShow(null), 3000)
       
      }
    } catch (error) {
      console.log(error)
    }
   
  }
    return (
        <>
         <ToastMessage show={show} />
         
        <Modal
        size="lg"
        show={ModelShow.show}
        onHide={() => setModelShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
           <Form onSubmit={register}>
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Thêm người dùng mới
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
       
           
           <Form.Group className="mb-3" controlId="fullname">
          <Form.Label>Họ & Tên</Form.Label>
          <Form.Control type="text" placeholder="Nhập Họ & Tên" name="fullname" value={fullname} onChange={OnchangeRegister} required/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Tên đăng nhập</Form.Label>
          <Form.Control type="text" placeholder="Nhập tên đăng nhập" name="username" value={username} onChange={OnchangeRegister} required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Nhập địa chỉ Email" name="email" value={email} onChange={OnchangeRegister} required/>
        </Form.Group>
       
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control type="password" placeholder="Nhập mật khẩu" name="password" value={password} onChange={OnchangeRegister} required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Nhập lại mật khẩu</Form.Label>
          <Form.Control type="password" placeholder="Nhập lại mật khẩu" name="re_password" value={re_password} onChange={OnchangeRegister} required/>
        </Form.Group>

      </Modal.Body>
        <Modal.Footer>
        <Button type='submit' className='btn btn-sm btn-success'>Thêm người dùng</Button>
        <Button className='btn btn-sm btn-danger' onClick={() =>setModelShow(false)}>Huỷ bỏ</Button>
      </Modal.Footer>
      </Form>
      </Modal>
      </>
    )
}

export default AdminAddNewUser
