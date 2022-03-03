export const CartReducer = (state, action) =>{

    const {type, payload} = action

    switch (type) {
        case 'CART_LOADED_SUCCESS':
            return {
                ...state,
                cart: payload,
                cartloading: false
            }
        case 'CART_LOADED_FAIL':
            return {
                ...state,
                cart: [],
                cartloading: false
            }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
				cart: state.cart.filter(row => row._id !== payload)
            }
    
        default:
            return state
        
    }
}
