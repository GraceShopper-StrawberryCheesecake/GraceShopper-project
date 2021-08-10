import axios from "axios"

// actions
const SEND_MAIL = "SEND_MAIL"

// action creators

const _sendMail = (result) => ({
    type: SEND_MAIL,
    result
})

// thunks

export const sendMail = (email, content) => {
    return async dispatch => {
        try {
            console.log("THIS IS THE CONTENT", content)
            const { data } = await axios.post(`/api/sendMail`, { email, content })
            dispatch(_sendMail(data))
        } catch (err) {
            console.log('there was a problem sending the email!')
        }
    }
}


// reducer
export default function mailReducer (state = {}, action) {
    switch (action.type) {
        case SEND_MAIL:
            return action.result
        default:
            return state
    }
}