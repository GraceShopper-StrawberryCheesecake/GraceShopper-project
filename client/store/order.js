import axios from "axios";

// constants
const SET_ORDER = 'SET_ORDER'

const SYNC_CART = 'SYNC_CART'



// action creators

const _setOrder = (order) => ({
    type: SET_ORDER,
    order
})

const _syncCart = (orderId) => ({
    type: SYNC_CART,
    orderId
})

export const updateOrder = (order) => {
    console.log('order in update order', order)
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

export const syncCartToDataBase = (cartId) => {
    console.log('cartId', cartId)
    return async dispatch => {
        try {
            const localStorageOrder = JSON.parse(window.localStorage.getItem('order'))
            console.log('localStorageOrder', localStorageOrder)
            await axios.put(`/api/orders/${cartId}`, localStorageOrder)
            dispatch(_syncCart(cartId))
        } catch (error) {
            console.log('failed to sync cart')
        }
    }
}

// not a thunk

export const mergeCart = (dbCart) => {

    const localOrder = JSON.parse(window.localStorage.getItem('order'));

    const dbOrder = dbCart.items.reduce((accum, item) => {
        accum[item.id] = item.orderItem.quantity
        return accum
    }, {})

    if(window.localStorage.getItem('order') !== JSON.stringify(dbOrder)) {

    
    for (let item in localOrder) {
        if (!dbOrder[item]) {
            dbOrder[item] = localOrder[item]
        } else {
            dbOrder[item] = dbOrder[item] + localOrder[item]
        }
    }


    const mergedOrder = dbOrder

    window.localStorage.setItem('order', JSON.stringify(mergedOrder))

    syncCartToDataBase(dbCart.id)

    return mergedOrder
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