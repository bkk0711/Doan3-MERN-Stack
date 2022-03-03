import { Fragment, useContext } from 'react'
import LoginForm from '../components/shop/auth/LoginForm'
import RegisterForm from '../components/shop/auth/RegisterForm'
import { Card, Spinner } from 'react-bootstrap'
import { AuthContext } from '../components/shop/auth/AuthContext'
import {Navigate} from 'react-router-dom'

const Auth = ({authRoute}) => {

    const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext)
    let body

    if (authLoading)
    body = (
        <div className='d-flex justify-content-center mt-2'>
            <Spinner animation='border' variant='info' />
        </div>
    )
    else if (isAuthenticated) return <Navigate to='/' />
    else
    body = (
        <Fragment>
            
            <Card>
            <center>
            <Card.Header as="h5">{authRoute === 'login' ? 'Đăng nhập' : 'Đăng ký '}</Card.Header>
            </center>
            <Card.Body>
                {
                    authRoute === 'login' && <LoginForm />
                }
                {
                    authRoute === 'register' && <RegisterForm />
                }
            </Card.Body>
            </Card>
        </Fragment>
    )

    return(
        <div className='container'>
            {body}
        </div>
    )
}

export default Auth
