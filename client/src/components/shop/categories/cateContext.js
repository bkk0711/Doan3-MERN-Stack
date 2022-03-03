import { createContext, useReducer, useState } from "react"
import axios from 'axios'
import setAuthToken from "../auth/setAuthToken"
import { API_URL, LOCAL_STORAGE_TOKEN_NAME } from "../auth/constans"
import { CateReducer } from "./cateReducer"

export const CateContext = createContext()

const CateContextProvider = ({children}) => {

    //state
    const [CateState, dispatch] = useReducer(CateReducer, {
        category: null,
        categories: [],
        cateloading: true
    })
    const [modalShow, setModalShow] = useState(false)

    // Theem Chuyeen muc
    const AddCategory = async AddPostForm=>{
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }
        try {
            const response = await axios.post(`${API_URL}/categories`, AddPostForm)
            if(response.data.success){
                return response.data
            }

        } catch (error) {
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    // GET chuyen muc ON
    const GetCategories = async ()=>{
      
        try {
            const response = await axios.get(`${API_URL}/categories`)
            if(response.data.success){
                dispatch({ type: 'CATE_LOADED_SUCCESS', payload: response.data.categories })
            }
            console.log(response.data.categories)

        } catch (error) {
            dispatch({ type: 'CATE_LOADED_FAIL' })
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }


        // GET chuyen muc theo TYPE
        const GetCategoriesWType = async Ctype=>{
      
            try {
                const response = await axios.get(`${API_URL}/categories/type/${Ctype}`)
                if(response.data.success){
                    dispatch({ type: 'CATE_LOADED_SUCCESS', payload: response.data.categories })
                }
                // console.log(response.data.categories)
    
            } catch (error) {
                dispatch({ type: 'CATE_LOADED_FAIL' })
                if(error.response.data) return error.response.data
                else return {success: false, message: error.message}
            }
        }
        const AdminGetCategories = async ()=>{
      
            try {
                const response = await axios.get(`${API_URL}/categories/list`)
                if(response.data.success){
                    dispatch({ type: 'CATE_LOADED_SUCCESS', payload: response.data.category })
                }
    
            } catch (error) {
                dispatch({ type: 'CATE_LOADED_FAIL' })
                if(error.response.data) return error.response.data
                else return {success: false, message: error.message}
            }
        }

        const findCate = cateId => {
            const post = CateState.categories.find(post => post._id === cateId)
            dispatch({ type: 'FIND_CATE', payload: post })
        }
        
        const updateCate = async updatedCate => {
            try {
                const response = await axios.put(
                    `${API_URL}/categories/${updatedCate._id}`,
                    updatedCate
                )
                if (response.data.success) {
                    dispatch({ type: 'UPDATE_CATE', payload: response.data.category })
                    return response.data
                }
            } catch (error) {
                return error.response.data
                    ? error.response.data
                    : { success: false, message: 'Server error' }
            }
        }

    	// Delete post
	const deleteCate = async CateId => {
		try {
			const response = await axios.delete(`${API_URL}/categories/${CateId}`)
			if (response.data.success)
				dispatch({ type: 'DELETE_CATE', payload: CateId })
		} catch (error) {
			console.log(error)
		}
	}
    


    const CateContextData = {
        CateState,
        AddCategory,
        GetCategories,
        GetCategoriesWType,
        AdminGetCategories,
        findCate,
        setModalShow,
        modalShow,
        updateCate,
        deleteCate
    }
    return (
        <CateContext.Provider value={CateContextData}>
            {children}
        </CateContext.Provider>
    )
}

export default CateContextProvider
