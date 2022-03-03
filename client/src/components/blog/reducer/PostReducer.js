export const PostReducer = (state, action) => {
    const {type, payload} = action

    switch (type ) {
        case "POSTS_LOADED_SUCCESS":
          
        return {
        ...state,
            posts: payload,
            postsloading: false
        }
        case 'POSTS_LOADED_FAIL':
			return {
				...state,
				posts: [],
				postsloading: false
			}
        case 'FIND_POST':
			return { ...state, post: payload }
        
        case 'POST_ONE_SUCCESS':
            return { ...state, post: payload, postsloading: false }
        
        case 'POSTS_FAIL':
            return { ...state, post: null, postsloading: false }
        
        case 'POST_MY_SUCCESS':
        return { ...state, posts: payload, postsloading: false }
        
        case 'UPDATE_POST':
        const newPosts = state.posts.map(row =>
            row._id === payload._id ? payload : row
        )
        
        return {
            ...state,
            posts: newPosts
        }
            
        case 'DELETE_POST':
			return {
				...state,
				posts: state.posts.filter(post => post._id !== payload)
			}


        default:
            return state
           
    }
    
}
