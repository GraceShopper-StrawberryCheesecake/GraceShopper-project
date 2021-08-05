import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

/**
 * COMPONENT
 */
export const Home = props => {
  const {name} = props

  return (
    <div>
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
    name: state.auth.name
  }
}

export default connect(mapState)(Home)
