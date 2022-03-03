import { createContext, useReducer, useEffect, useState } from "react"
import axios from 'axios'
import { AuthReducer } from "./AuthReducer"
import { API_URL, LOCAL_STORAGE_TOKEN_NAME } from "./constans"
import setAuthToken from "./setAuthToken"
import {UserReducer} from "./UserReducer"
export const AuthContext = createContext()

const AuthContextProvider = ({children}) =>{
    const [authState, dispatch] = useReducer(AuthReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })

    const [UserState, _dispatch] = useReducer(UserReducer, {
        OneUser: null,
        userLoading: true,
        Fullinfo: null,
        users: null,
        Fulllogs : null,
        LogLoading: true,
    })

   
    const [ModelShow, setModelShow] = useState({show: false});
    const [ModelEditShow, setModelEditShow] = useState({show: false});
    const [ModelAddBank, setModelAddBank] = useState({show: false});
    //xac thuc nguoi dung
     const loadUser = async ()=>{
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }

        try {
            const response = await axios.get(`${API_URL}/auth`)

            if(response.data.success){
                dispatch({type:'SET_AUTH', payload: {isAuthenticated: true, user: response.data.user}})
            }   
            
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch({type:'SET_AUTH', payload: {isAuthenticated: false, user: null}})

        }
     }
     useEffect(() => loadUser(), [])
     const loadOneUser = async (id)=>{
     
        try {
            const response = await axios.get(`${API_URL}/auth/${id}`)

            if(response.data.success){
                _dispatch({type:'USER_LOADED_SUCCESS', payload: response.data.user})
            }   
            
        } catch (error) {
            _dispatch({type:'USER_LOADED_FAIL'})

        }
     }

     const DeleteOneUser = async (id)=>{
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }
        try {
            const response = await axios.delete(`${API_URL}/auth/${id}`)

            if(response.data.success){
                _dispatch({type:'DELETE_USER', payload: id})
            }   
            
        } catch (error) {
           
            return error.response.data
            ? error.response.data
            : { success: false, message: 'Server error' }

        }
     }

     const AdminGetUser = async ()=>{
     
        try {
            const response = await axios.get(`${API_URL}/auth/list`)

            if(response.data.success){
                _dispatch({type:'ADMIN_GET_USER', payload: response.data.users})
            }   
            
        } catch (error) {
            _dispatch({type:'ADMIN_LOAD_FAIL'})

        }
     }

  
     const loadInfoUser = async ()=>{
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }
        try {
            const response = await axios.get(`${API_URL}/auth/thongtin`)

            if(response.data.success){
                _dispatch({type:'USER_INFO_SUCCESS', payload: response.data})
            }   
            
        } catch (error) {
            _dispatch({type:'USER_INFO_FAIL'})
            // localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            // setAuthToken(null)

        }
     }

     //withdraw
     const withdraw = async userForm =>{
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }
        try {
            const response = await axios.post(`${API_URL}/auth/withdraw`, userForm)
            if(response.data.success)
                return response.data
        } catch (error) {
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    const AddBank = async userForm =>{
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }
        try {
            const response = await axios.put(`${API_URL}/auth/bank/add`, userForm)
            if(response.data.success)
                return response.data
        } catch (error) {
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    const loadLogs = async ()=>{
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }
        try {
            const response = await axios.get(`${API_URL}/auth/logs`)

            if(response.data.success){
                _dispatch({type:'USER_LOAD_LOGS', payload: response.data})
            }   

            
        } catch (error) {
            _dispatch({type:'USER_LOAD_LOGS_FAIL'})
            // localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            // setAuthToken(null)

        }
     }

     const DeleteBankUser = async (id)=>{
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }
        try {
            const response = await axios.delete(`${API_URL}/auth/bank/${id}`)
            if(response.data.success){
                // _dispatch({type:'DELETE_BANK_USER', payload: id})
            }   
            
        } catch (error) {
           
            return error.response.data
            ? error.response.data
            : { success: false, message: 'Server error' }

        }
     }



    //Login
    const loginuser = async userForm =>{
        try {
            const response = await axios.post(`${API_URL}/auth/login`, userForm)
            if(response.data.success)
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accesstoken)
            
                await loadUser()
            return response.data
        } catch (error) {
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    //REgister
     const registeruser = async userForm =>{
        try {
            const response = await axios.post(`${API_URL}/auth/register`, userForm)
            if(response.data.success)
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accesstoken)
            
                await loadUser()
            return response.data
        } catch (error) {
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }
    const findUser = Id => {
		const user = UserState.users.find(row => row._id === Id)
		_dispatch({ type: 'FIND_USER', payload: user })
	}

    const AddNewUser = async userForm =>{
        try {
            const response = await axios.post(`${API_URL}/auth/register`, userForm)
            if(response.data.success)
                 _dispatch({type:'ADMIN_ADD_USER', payload: response.data.newUser})
                return response.data
        } catch (error) {
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    const EditUser = async userForm =>{
        try {
            const response = await axios.put(`${API_URL}/auth/${userForm._id}`, userForm)
            if(response.data.success)
                 _dispatch({type:'ADMIN_EDIT_USER', payload: response.data.user})
                return response.data
        } catch (error) {
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    const ChangePass = async userForm =>{
        try {
            const response = await axios.put(`${API_URL}/auth/change-pass/${userForm._id}`, userForm)
            if(response.data.success)
                return response.data
        } catch (error) {
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }


    const logout = async () =>{
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        setAuthToken(null)
        dispatch({type:'SET_AUTH', payload: {isAuthenticated: false, user: null}})
        // navigate('/')
        // window.location.reload()
        await loadUser()
    }

    const authContextData = {loadUser, loginuser, 
        authState, registeruser, logout, 
        loadOneUser, UserState, loadInfoUser, 
        AdminGetUser, DeleteOneUser, ModelShow, setModelShow, AddNewUser,
        EditUser, setModelEditShow, ModelEditShow, findUser, withdraw, loadLogs, DeleteBankUser,
        AddBank, ModelAddBank, setModelAddBank, ChangePass}

    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider