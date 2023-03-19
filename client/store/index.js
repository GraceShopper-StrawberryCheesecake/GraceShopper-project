import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import items from './items';
import singleItemReducer from './singleItem';
import orderReducer, { updateOrder } from './order';
import customers from './customers';
import singleCustomer from './singleCustomer';

const reducer = combineReducers({
  auth,
  items,
  singleItemReducer,
  orderReducer,
  customers,
  singleCustomer,
});

let middleware = [];
const logger = createLogger({ collapsed: true });

if (process.env.NODE_ENV === 'development') {
  middleware = [...middleware, thunkMiddleware, logger];
} else {
  middleware = [...middleware, thunkMiddleware];
}

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
export * from './auth';
export * from './order';
