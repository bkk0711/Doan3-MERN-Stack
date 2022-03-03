import React from 'react'
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import AlertMessage from '../layout/AlertMessage';


// function sleep(ms) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }

const RegisterForm = () => {

 //context
 const {registeruser} = useContext(AuthContext)

 //History
 const navigate = useNavigate()

 const [registerform, setRegisterForm] = useState({
   fullname: '',
   email: '',
   username : '',
   password: ''
 })

 const [alert, setAlert] = useState(null)

 const {fullname, email, username, password, re_password} = registerform

 const OnchangeRegister = event =>{
  setRegisterForm({
     ...registerform, [event.target.name]: event.target.value
   })
 }

  const register = async event =>{
    event.preventDefault()
    if(password != re_password){
      setAlert({ type: 'danger', message: "Mật khẩu không khớp" })
      setTimeout(() => setAlert(null), 5000)
      return
    }
    try {
      const RegisterData = await registeruser(registerform)
      if(RegisterData.success){
        // setAlert({ type: 'success', message: RegisterData.message })
				// setTimeout(() => setAlert(null), 5000)
        // await sleep(1500);
        // navigate('/')
      }else{
        setAlert({ type: 'danger', message: RegisterData.message })
				setTimeout(() => setAlert(null), 5000)
      }
    } catch (error) {
      console.log(error)
    }
   
  }
    return (
        <Form onSubmit={register}>
           <AlertMessage info={alert} />
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

       
        <div className="d-grid gap-2">
        <Button variant="primary" type="submit" >
          Đăng Ký
        </Button>
        </div>
        <br />
        <p>
            Bạn đã có tài khoản ? <Link to='/login'> Đăng nhập ngay !</Link>
        </p>
      </Form>
    )
}

export default RegisterForm
