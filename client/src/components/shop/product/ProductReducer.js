export const ProductReducer = (state, action) =>{

    const {type, payload} = action

    switch (type) {
        case 'PRODUCT_LOADED_SUCCESS':
            return {
                ...state,
                products: payload,
                productloading: false
            }
        case 'PRODUCT_LOADED_FAIL':
            return {
                ...state,
                product: null,
                products: [],
                productloading: false
            }
        case 'ONE_PRODUCT_LOADED_SUCCESS':
            return {
                ...state,
                product: payload,
                productloading: false
            }
        case 'FIND_PRODUCT':
            return {
                ...state,
                product: payload,
                productloading: false
            }

        case 'UPDATE_PRODUCT':
			const newPosts = state.products.map(post =>
				post._id === payload._id ? payload : post
			)
            return {
				...state,
				products: newPosts
			}

         case 'DELETE_PRODUCT':
			return {
				...state,
				products: state.products.filter(post => post._id !== payload)
			}
        
    
        default:
            return state
        
    }
}
