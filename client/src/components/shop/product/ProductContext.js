import { createContext, useReducer, useState } from "react"
import axios from 'axios'
import { ProductReducer } from "./ProductReducer"
import setAuthToken from "../auth/setAuthToken"
import { API_URL, LOCAL_STORAGE_TOKEN_NAME } from "../auth/constans"

export const ProductContext = createContext()

const ProductContextProvider = ({children}) => {

    //state
    const [ProductState, dispatch] = useReducer(ProductReducer, {
        product: null,
        products: [],
        productloading: true
    })
	const [showUpdateProductModal, setShowUpdateProductModal] = useState(false)

    const AddNewProduct = async AddPostForm=>{
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }
        try {
            const response = await axios.post(`${API_URL}/product`, AddPostForm)
            if(response.data.success){
                return response.data
            }

        } catch (error) {
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    const getProduct = async (page, limit) => {
		try {
			let response

			if(page && limit){
				response = await axios.get(`${API_URL}/product?page=${page}&limit=${limit}`)
			}else{
				response = await axios.get(`${API_URL}/product`)
			}
			
			if (response.data.success) {
				dispatch({ type: 'PRODUCT_LOADED_SUCCESS', payload: response.data.products })
			}
		} catch (error) {
			dispatch({ type: 'PRODUCT_LOADED_FAIL' })
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
		}
	}

	const getMyProduct = async (page, limit) => {
		try {
			let response

			if(page && limit){
				response = await axios.get(`${API_URL}/product/list?page=${page}&limit=${limit}`)
			}else{
				response = await axios.get(`${API_URL}/product/list`)
			}
			
			if (response.data.success) {
				dispatch({ type: 'PRODUCT_LOADED_SUCCESS', payload: response.data.products })
			}
		} catch (error) {
			dispatch({ type: 'PRODUCT_LOADED_FAIL' })
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
		}
	}

    const getAllProduct = async (page, limit) => {
		try {
			let response

			if(page && limit){
				response = await axios.get(`${API_URL}/product/all?page=${page}&limit=${limit}`)
			}else{
				response = await axios.get(`${API_URL}/product/all`)
			}
			
			if (response.data.success) {
				dispatch({ type: 'PRODUCT_LOADED_SUCCESS', payload: response.data.products })
			}
		} catch (error) {
			dispatch({ type: 'PRODUCT_LOADED_FAIL' })
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
		}
	}

    const getOneProduct = async (id) => {
		try {
			let	response = await axios.get(`${API_URL}/product/${id}`)
			
			if (response.data.success) {
				dispatch({ type: 'ONE_PRODUCT_LOADED_SUCCESS', payload: response.data.product })
			}
		} catch (error) {
			dispatch({ type: 'PRODUCT_LOADED_FAIL' })
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
		}
	}

    const AdminViewProduct = async (id) => {
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }
		try {
			let	response = await axios.get(`${API_URL}/product/admin/view/${id}`)
			
			if (response.data.success) {
				dispatch({ type: 'ONE_PRODUCT_LOADED_SUCCESS', payload: response.data.product })
			}
		} catch (error) {
			dispatch({ type: 'PRODUCT_LOADED_FAIL' })
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
		}
	}

    const PayOneProduct = async (id) => {
		try {
			let	response = await axios.get(`${API_URL}/checkout/${id}`)
			
			if (response.data.success) {
                return response.data
			}
		} catch (error) {
			
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
		}
	}

    const PayCart = async () => {
		try {
			let	response = await axios.get(`${API_URL}/checkout`)
			
			if (response.data.success) {
                dispatch({ type: 'PRODUCT_LOADED_FAIL' })
                return response.data
                
			}
            
		} catch (error) {
			
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
		}
	}
	const findProduct = Id => {
		const post = ProductState.products.find(post => post._id === Id)
		dispatch({ type: 'FIND_PRODUCT', payload: post })
	}

	// Update 
	const updateProduct = async updatedProduct => {
		try {
			const response = await axios.put(
				`${API_URL}/product/${updatedProduct._id}`,
				updatedProduct
			)
			if (response.data.success) {
				dispatch({ type: 'UPDATE_PRODUCT', payload: response.data.product })
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}

	const deleteProduct = async Id => {
		try {
			const response = await axios.delete(`${API_URL}/product/${Id}`)
			if (response.data.success)
				dispatch({ type: 'DELETE_PRODUCT', payload: Id })
		} catch (error) {
			console.log(error)
		}
	}


    const ProductContextData = {
        ProductState,
        AddNewProduct,
        getProduct,
        getOneProduct,
        PayOneProduct,
        PayCart,
        getAllProduct,
        AdminViewProduct,
		findProduct,
		updateProduct,
		showUpdateProductModal,
		setShowUpdateProductModal,
		deleteProduct,
		getMyProduct
    }
    return (
        <ProductContext.Provider value={ProductContextData}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider
