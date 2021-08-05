import axios from "axios";

// constants
const SET_ORDER = 'SET_ORDER'



// action creators

const _setOrder = (order) => ({
    type: SET_ORDER,
    order
})


//thunk function
export const fetchOrder = (userId) => {
    return async dispatch => {
        try {
            const { data } = await axios.get(`/api/customers/${userId}/cart`)
            console.log('data ->', data)
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