import axios from "axios";

//constant
const SET_CUSTOMER = 'SET_CUSTOMER'

//action creator
const _setCustomer = (customer) => ({
    type: SET_CUSTOMER,
    customer
})

//thunk function
export const fetchSingleCustomer = (id) => {
    return async dispatch => {
        try {
            const { data } = await axios.get(`/api/customers/${id}`, {headers: {authorization: window.localStorage.getItem('token')}})
            dispatch(_setCustomer(data))
        } catch (error) {
            console.log('cannot get customers')
        }
    }
}

//reducer
export default function singleCustomer(state = {}, action) {
    switch (action.type) {
        case SET_CUSTOMER:
            return action.customer
        default:
            return state
    }
}