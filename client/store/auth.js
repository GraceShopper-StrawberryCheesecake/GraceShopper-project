import axios from 'axios'
import history from '../history'
import { mergeCart } from './order'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH'

/**
 * ACTION CREATORS
 */
const setAuth = auth => ({type: SET_AUTH, auth})

/**
 * THUNK CREATORS
 */
export const me = (method) => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    })
    if(method) {
      mergeCart(res.data.orders[0])
    }
    return dispatch(setAuth(res.data))
  }
}

export const authenticate = (email, password, method, name) => async dispatch => {
  try {
    const res = await axios.post(`/auth/${method}`, {name, email, password})
    window.localStorage.setItem(TOKEN, res.data.token)
    dispatch(me(method))
  } catch (authError) {
    return dispatch(setAuth({error: authError}))
  }
}

export const logout = () => {
  window.localStorage.removeItem(TOKEN)
  window.localStorage.removeItem('order')
  history.push('/login')
  return {
    type: SET_AUTH,
    auth: {}
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    default:
      return state
  }
}
