import { AuthContext } from '../shop/auth/AuthContext'
import { useContext } from 'react'


const IsAuth = ({children}) => {
    const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext)

   if (isAuthenticated) return children
    else  return  ""
   
}

export default IsAuth
