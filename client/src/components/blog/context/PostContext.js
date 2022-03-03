import { createContext, useReducer, useState } from "react"
import axios from 'axios'
import {PostReducer} from "../reducer/PostReducer"
import { API_URL } from "../../shop/auth/constans"
import { LOCAL_STORAGE_TOKEN_NAME } from "../../shop/auth/constans"
import setAuthToken from "../../shop/auth/setAuthToken"

export const PostContext = createContext()

const PostContextProvider = ({children}) =>{
    //state
    const [PostState, dispatch] = useReducer(PostReducer, {
        post: null,
        posts: [],
        postsloading: true
    })

    const [showAddPostModal, setShowAddPostModal] = useState(false)
	const [showUpdatePostModal, setShowUpdatePostModal] = useState(false)
	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})


    // Get all posts
	const getPosts = async (page, limit) => {
		try {
			let response

			if(page && limit){
				response = await axios.get(`${API_URL}/posts/all?page=${page}&limit=${limit}`)
			}else{
				response = await axios.get(`${API_URL}/posts/all`)
			}
			
			if (response.data.success) {
				dispatch({ type: 'POSTS_LOADED_SUCCESS', payload: response.data.posts })
			}
		} catch (error) {
			dispatch({ type: 'POSTS_LOADED_FAIL' })
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
		}
	}
	const AdminGetPosts = async (page, limit) => {
		try {
			let response

			if(page && limit){
				response = await axios.get(`${API_URL}/posts/admin/all?page=${page}&limit=${limit}`)
			}else{
				response = await axios.get(`${API_URL}/posts/admin/all`)
			}
			
			if (response.data.success) {
				dispatch({ type: 'POSTS_LOADED_SUCCESS', payload: response.data.posts })
			}
		} catch (error) {
			dispatch({ type: 'POSTS_LOADED_FAIL' })
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
		}
	}

    // GET ONE POST
	const getOnePosts = async _id => {
		try {
			const response = await axios.get(`${API_URL}/posts/${_id}`)
			if (response.data.success) {
				dispatch({ type: 'POST_ONE_SUCCESS', payload: response.data.post })
			}
		} catch (error) {
			dispatch({ type: 'POSTS_FAIL' })
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
		}
	}

    // GET POST USER

    const getMyPost = async () => {
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }

		try {
			const response = await axios.get(`${API_URL}/posts`)
			if (response.data.success) {
				dispatch({ type: 'POST_MY_SUCCESS', payload: response.data.posts })
			}
            
		} catch (error) {
			dispatch({ type: 'POSTS_LOADED_FAIL' })
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
		}
	}

    const AddPost = async AddPostForm=>{
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }
        try {
            const response = await axios.post(`${API_URL}/posts`, AddPostForm)
            if(response.data.success){
                return response.data
            }

        } catch (error) {
            if(error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }

    const findPost = postId => {
		const post = PostState.posts.find(post => post._id === postId)
		dispatch({ type: 'FIND_POST', payload: post })
	}

    // Update post
	const updatePost = async updatedPost => {
		try {
			const response = await axios.put(
				`${API_URL}/posts/${updatedPost._id}`,
				updatedPost
			)
			if (response.data.success) {
				dispatch({ type: 'UPDATE_POST', payload: response.data.post })
				// console.log("debug: " + response.data.post.status)
				return response.data
			}
		} catch (error) {
			return error.response.data
				? error.response.data
				: { success: false, message: 'Server error' }
		}
	}
    // Delete post
	const deletePost = async postId => {
		try {
			const response = await axios.delete(`${API_URL}/posts/${postId}`)
			if (response.data.success)
				dispatch({ type: 'DELETE_POST', payload: postId })
		} catch (error) {
			console.log(error)
		}
	}


// Post context data
const postContextData = {
    PostState,
    getPosts,
    findPost,
    getOnePosts,
    AddPost,
    getMyPost,
    updatePost,
    deletePost,
    setShowUpdatePostModal,
	showUpdatePostModal,
    setShowAddPostModal,
    setShowToast,
	AdminGetPosts
}
    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    )
} 

export default PostContextProvider