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
    return async dispatch => {
        try {
            const localStorageOrder = JSON.parse(window.localStorage.getItem('order'))
            await axios.put(`/api/orders/${cartId}`, localStorageOrder)
            dispatch(_syncCart(cartId))
        } catch (error) {
            console.log('failed to sync cart')
        }
    }
}

// not a thunk

// this function will merge the cart in the database with the local storage cart
export const mergeCart = (dbCart) => {

    const localOrder = JSON.parse(window.localStorage.getItem('order'));

    // we parse the database cart into our order object { itemId: itemQuantity }
    const dbOrder = dbCart.items.reduce((accum, item) => {
        accum[item.id] = item.orderItem.quantity
        return accum
    }, {})

    // we check if the local storage is NOT equal to our database order
    if(window.localStorage.getItem('order') !== JSON.stringify(dbOrder)) {

        // we loop through each itemId on the local order and see if it already exists on the database order
        for (let itemId in localOrder) {
            if (!dbOrder[itemId]) {
                dbOrder[itemId] = localOrder[itemId]
            } else {
                // if the itemId exists on the db order, we check to see if the db order quantity + local storage quantity
                // is larger than our item's stock, if it is we cap the amount at the item's stock
                for (let i = 0; i < dbCart.items.length; i++) {
                    if (parseInt(itemId) === dbCart.items[i].id && dbOrder[itemId] + localOrder[itemId] > dbCart.items[i].quantity) {
                        dbOrder[itemId] = dbCart.items[i].quantity
                        break
                    } else {
                       dbOrder[itemId] = dbOrder[itemId] + localOrder[itemId]
                    }
                }
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