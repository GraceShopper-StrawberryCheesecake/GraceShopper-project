import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import {me} from './store'
import AllItems from './components/AllItems'
import SingleItem from './components/SingleItem';
import AllCustomers from './components/AllCustomers'
import SingleCustomers from './components/SingleCustomer'
import UpdateForm from './components/UpdateForm'
import AddForm from './components/AddForm'
import Checkout from './components/Checkout';
import OrderHistory from './components/OrderHistory';


function FourOhFour() {
  return (
    <h1>Something went wrong 404.</h1>
  )
}

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    const {isAdmin} = this.props

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route exact path="/items" component={AllItems} />
            <Route exact path="/items/:id" component={SingleItem} />
            <Route path="/checkout" component={Checkout}/>
            <Route exact path="/customers/:customerId" component={SingleCustomers} />
            <Route exact path="/customers/:customerId/update" component={UpdateForm} />
            <Route exact path="/orderHistory" component={OrderHistory} />
            {isAdmin ? (
              <Switch>
                <Route exact path="/customers" component={AllCustomers} />
                <Route path="/customer/add" component={AddForm} />
                <Route path="/item/add" component={AddForm} />
                <Route exact path="/items/:itemId/update" component={UpdateForm} />
                <Redirect to="/home" />
              </Switch>
            ): (null)}
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={ Home } />
            <Route path="/home" component={Home} />
            <Route exact path="/items" component={AllItems} />
            <Route exact path="/items/:id" component={SingleItem} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/checkout" component={Checkout}/>
            <Route path="/*" component={FourOhFour} />
          </Switch>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
