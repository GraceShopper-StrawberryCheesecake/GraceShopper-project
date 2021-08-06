
import axios from "axios";



export const syncCartToDataBase = async (cartId) => {
    const localStorageOrder = JSON.parse(window.localStorage.getItem('order'))
    await axios.put(`/api/orders/${cartId}`, localStorageOrder)
}


export const mergeCart = (dbCart) => {

    const localOrder = JSON.parse(window.localStorage.getItem('order'));

    const dbOrder = dbCart.items.reduce((accum, item) => {
        accum[item.id] = item.orderItem.quantity
        return accum
    }, {})

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