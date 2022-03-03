export const UserReducer = (state, action) =>{

    const {type, payload} = action

    switch (type) {
        case 'USER_LOADED_SUCCESS':
            return {
                ...state,
                OneUser: payload,
                userLoading: false
            }
        case 'USER_LOADED_FAIL':
            return {
                ...state,
                OneUser: null,
                userLoading: false
            }
        case 'USER_INFO_SUCCESS':
            return {
                ...state,
                Fullinfo: payload,
                userLoading: false
            }
         case 'USER_INFO_FAIL':
            return {
                ...state,
                Fullinfo: null,
                userLoading: false
            }

        case 'ADMIN_GET_USER':
            return {
                ...state,
                users: payload,
                userLoading: false
            }
        case "ADMIN_ADD_USER":
            return {
                ...state,
				users: [...state.users, payload]
            }
      
         case 'ADMIN_LOAD_FAIL':
            return {
                ...state,
                users: null,
                userLoading: false
            }
        case "FIND_USER":
            return { ...state, OneUser: payload }

        case 'ADMIN_EDIT_USER':
        const newPosts = state.users.map(row =>
            row._id === payload._id ? payload : row
        )
        
        return {
            ...state,
            users: newPosts
        }
        case "DELETE_USER":
            return {
                ...state,
				users: state.users.filter(row => row._id !== payload)
            }
        
        case "USER_LOAD_LOGS":
            return {
                ...state,
				Fulllogs: payload,
                LogLoading: false
            }
        case "USER_LOAD_LOGS_FAIL":
            return {
                ...state,
				Fulllogs: null,
                LogLoading: false
            }
        case "DELETE_BANK_USER":
            return {
                ...state,
				user: state.user.banks.filter(row => row._id !== payload)
            }
        
        default:
            return state
        
    }
}
