import axios from "axios";

//constant
const SET_CUSTOMERS = 'SET_CUSTOMERS'

//action creator
const _setCustomers = (customers) => ({
    type: SET_CUSTOMERS,
    customers
})

//thunk function
export const fetchCustomers = () => {
    return async dispatch => {
        try {
            const { data } = await axios.get('/api/customers', {authorization: window.localStorage.getItem('token')})
            dispatch(_setCustomers(data))
        } catch (error) {
            console.log('cannot get customers')
        }
    }
}

//reducer
export default function customers(state = [], action) {
    switch (action.type) {
        case SET_CUSTOMERS:
            return action.customers
        default:
            return state
    }
}