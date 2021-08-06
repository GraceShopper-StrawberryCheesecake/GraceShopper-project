import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from "@material-ui/core";

/**
 * COMPONENT
 */
export const Home = props => {
  const {name} = props.auth

  return (
    <div>
      {props.auth.isAdmin ? (
        <React.Fragment>
          <Button onClick={() => {props.history.push('/customers')}}variant="outlined">customers</Button>
          <Button onClick={() => {props.history.push('/customer/add')}}variant="outlined">add customers</Button>
          <Button onClick={() => {props.history.push('/item/add')}}variant="outlined">add items</Button>

        </React.Fragment>
      ) : (null)}
      <h3>Welcome, {name}</h3>
      <Link to='/items'>Checkout our selection of cheesecakes</Link>
      <img src="/cheesecakeicon.svg"/>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapState)(Home)
