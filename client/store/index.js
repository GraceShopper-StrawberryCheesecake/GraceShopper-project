import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import items from './items'
import singleItemReducer from './singleItem'
import orderReducer from './order'
import customers from './customers'
import singleCustomer from './singleCustomer'

const reducer = combineReducers({ auth, items, singleItemReducer, orderReducer, customers, singleCustomer })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
