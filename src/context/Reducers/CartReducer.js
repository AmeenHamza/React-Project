const CartReducer = (state, action) => {
    switch (action.type) {

        case 'GET_PRODUCTS':
            return { ...state, products: action.payload }

        case 'ADD_TO_CART' :
            return {...state, cart : [...state.cart, {...action.payload, qty : 1}]}

        case 'REMOVE_FROM_CART' :
            return {...state, cart : state.cart.filter((prod) => prod.id !== action.payload)}

        case 'CHANGE_QTY' :
            return {...state, cart : state.cart.filter((prod) => prod.id === action.payload.id ? prod.qty = action.payload.qty : prod.qty)}

        default:
            return state;
    }
}

export default CartReducer;