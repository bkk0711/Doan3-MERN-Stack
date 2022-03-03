import { AuthContext } from '../shop/auth/AuthContext'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'

const RequireAuth = ({children}) => {
    const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext)

    if (authLoading)
    return (
        <div className='d-flex justify-content-center mt-2'>
            <Spinner animation='border' variant='info' />
        </div>
    )
    else if (isAuthenticated) return children
    else  return  <Navigate to='/' />
   
}

export default RequireAuth
