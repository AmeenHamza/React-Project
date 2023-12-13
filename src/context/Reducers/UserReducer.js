const UserReducer = (state, action) => {
    switch (action.type) {

        case 'LOGIN':
            return { ...state, user: { ...state.user, status: true } }
            
        case 'SIGNUP':
            return { ...state, user: action.payload }

        case 'LOGOUT':
            return { ...state, user: {...state.user, status : false} }

        default:
            return state;
    }
}

export default UserReducer;