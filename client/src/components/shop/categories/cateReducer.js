export const CateReducer = (state, action) =>{

    const {type, payload} = action

    switch (type) {
        case 'CATE_LOADED_SUCCESS':
            return {
                ...state,
                categories: payload,
                cateloading: false
            }
            break;
            
        case 'CATE_LOADED_FAIL':
            return{
                ...state,
                categories: [],
                cateloading: true
            }
        case 'FIND_CATE':
			return { ...state, category: payload }
            
        case 'UPDATE_CATE':
			const newPosts = state.categories.map(post =>
				post._id === payload._id ? payload : post
			)

			return {
				...state,
				categories: newPosts
			}
        case 'DELETE_CATE':
			return {
				...state,
				categories: state.categories.filter(post => post._id !== payload)
			}
        default:
            return state
            break;
    }
}
