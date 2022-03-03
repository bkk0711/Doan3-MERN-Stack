import { createContext, useReducer, useState } from "react"
import axios from 'axios'
import setAuthToken from "../auth/setAuthToken"
import { API_URL, LOCAL_STORAGE_TOKEN_NAME } from "../auth/constans"
import {CartReducer} from './CartReducer'

export const CartContext = createContext()

const CartContextProvider = ({children}) => {
     //state
     const [CartState, dispatch] = useReducer(CartReducer, {
        cart: [],
        cartloading: true
    })

    const AddToCart = async _id =>{
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }
        try {
            const response = await axios.get(`${API_URL}/cart/${_id}`)
            if(response.data.success){
                return response.data
            }
        } catch (error) {
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    const RemoveFromCart = async _id =>{
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }
        try {
            const response = await axios.delete(`${API_URL}/cart/${_id}`)
            if(response.data.success){
                dispatch({ type: 'REMOVE_FROM_CART', payload: _id })
                return {success: true, message: response.data.message}
            }
        } catch (error) {
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    const RemoveAllFromCart = async () =>{
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }
        try {
            const response = await axios.delete(`${API_URL}/cart/all`)
            if(response.data.success){
                dispatch({ type: 'CART_LOADED_FAIL'})
                return {success: true, message: response.data.message}
            }
        } catch (error) {
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    
    const GetAllCart = async () =>{
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }
        try {
            const response = await axios.get(`${API_URL}/cart/list`)
            
            if (response.data.success) {
                if(response.data.cart != null){
                    dispatch({ type: 'CART_LOADED_SUCCESS', payload: response.data.cart.product })
                }else{
                    dispatch({ type: 'CART_LOADED_FAIL' })
                }
				
			}
        } catch (error) {
            dispatch({ type: 'CART_LOADED_FAIL' })
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }


    const CartContextData = {
        CartState,
        AddToCart,
        GetAllCart,
        RemoveFromCart,
        RemoveAllFromCart

    }
    return (
        <CartContext.Provider value={CartContextData}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider
