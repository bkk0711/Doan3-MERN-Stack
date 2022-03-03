import React from 'react'
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import AlertMessage from '../layout/AlertMessage';

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const LoginForm = () => {

  //context
  const {loginuser} = useContext(AuthContext)

  //History
  const navigate = useNavigate()

  const [loginform, setLoginForm] = useState({
    username : '',
    password: ''
  })

  const [alert, setAlert] = useState(null)

  const {username, password} = loginform

  const OnchangeLogin = event =>{
    setLoginForm({
      ...loginform, [event.target.name]: event.target.value
    })
  }
  const login = async event =>{
    event.preventDefault()
    try {
      const LoginData = await loginuser(loginform)
      if(LoginData.success){
        // setAlert({ type: 'success', message: LoginData.message })
				// setTimeout(() => setAlert(null), 5000)
        // await sleep(1500);
        // navigate('/')
      }else{
        setAlert({ type: 'danger', message: LoginData.message })
				setTimeout(() => setAlert(null), 5000)
      }
    } catch (error) {
      console.log(error)
    }
   
  }
    return (
        <Form onSubmit={login}>
          <AlertMessage info={alert} />
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Tên đăng nhập</Form.Label>
          <Form.Control type="text" placeholder="Nhập tên đăng nhập" name="username" value={username} onChange={OnchangeLogin} required/>   
        </Form.Group>
      
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control type="password" placeholder="Nhập mật khẩu" name="password" value={password} onChange={OnchangeLogin} required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Ghi nhớ đăng nhập" />
        </Form.Group>
        <div className="d-grid gap-2">
        <Button variant="primary" type="submit" >
          Đăng Nhập
        </Button>
        </div>
        <br />
        <p>
            Bạn chưa có tài khoản ? <Link to='/register'> Đăng ký ngay !</Link>
        </p>
      </Form>
    )
}

export default LoginForm
