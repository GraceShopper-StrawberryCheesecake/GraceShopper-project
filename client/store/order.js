import axios from "axios";

// constants
const SET_ORDER = 'SET_ORDER'



// action creators

const _setOrder = (order) => ({
    type: SET_ORDER,
    order
})

export const updateOrder = (order) => {
    return dispatch => {
        dispatch(_setOrder(order))
    }
}

//thunk function
export const fetchOrder = (userId) => {
    return async dispatch => {
        try {
            const { data } = await axios.get(`/api/customers/${userId}/cart`)
            dispatch(_setOrder(data))
        } catch (error) {
            console.log('cannot get cart')            
        }
    }
}

//reducer
export default function orderReducer (state = {}, action) {
    switch (action.type) {
        case SET_ORDER:
            return action.order
        default:
            return state 
    }
}