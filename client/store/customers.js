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
            const token = window.localStorage.getItem("token")
            const { data } = await axios.get('/api/customers', {headers:{authorization: token}})
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