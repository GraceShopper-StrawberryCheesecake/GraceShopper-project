import axios from 'axios'

//constants
const SET_ITEMS = 'SET_ITEMS'

//action creator
const _setItems = (items) => ({
    type: SET_ITEMS,
    items
})

//thunk function
export const fetchItems = () => {
    return async dispatch => {
        try {
            const { data } = await axios.get("/api/items")
            dispatch(_setItems(data))
        } catch (error) {
            console.log('connot get items')            
        }
    }
}

//reducer
export default function(state = [], action) {
    switch (action.type) {
        case SET_ITEMS:
            return action.items
        default:
            return state 
    }
}