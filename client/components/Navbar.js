import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout, updateOrder } from "../store";
import { syncCartToDataBase } from "../store/order"
import Cart from "./Cart"


class Navbar extends React.Component {

  constructor() {
    super()
    this.state = {
      cartIsOpen: false
    }
    this.setCartIsOpen = this.setCartIsOpen.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.componentCleanup = this.componentCleanup.bind(this)
  }

// const Navbar = ({ handleClick, isLoggedIn, customer }) => {

  setCartIsOpen(cartIsOpen) {
    this.setState({
      cartIsOpen: cartIsOpen
    })
  }


  async handleClick(cartId) {
    await this.props.syncCart(cartId)
    await this.props.logout()
    await this.props.updateOrder({})
    this.setCartIsOpen(false)
  }

  // added an event listener to the window on refresh to sync cart to database
  componentDidMount() {
    window.addEventListener('beforeunload', this.componentCleanup);
  }

  async componentCleanup() {
    if(this.props.isLoggedIn) {
      await this.props.syncCart(this.props.customer.orders[0].id)
      window.localStorage.setItem('order', JSON.stringify({}))
    }
  }

  render() {
    const { isLoggedIn, customer } = this.props

    return (
      <div className="navbar-container">
        <div className="logo">
          <Link to="/home">
          <img src="/cheesecakeIcon2.svg" />
          </Link>
          <h1>Chaotic Cheesecake</h1>
        </div>
        <nav>
          {isLoggedIn ? (
            <div className="nav-links-div">
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
              <a href="#" onClick={() => this.handleClick(customer.orders[0].id)}>
                Logout
              </a>
              <div className="cart-button" onClick={() => this.setCartIsOpen(!this.state.cartIsOpen)} >
                <img src="/shopping-cart.svg" />
              </div>
            </div>
          ) : (
            <div className="nav-links-div">
              {/* The navbar will show these links before you log in */}
              <Link to="/items">Products</Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              {/* <Link to="/checkout">Checkout</Link> */}
              <div className="cart-button" onClick={() => this.setCartIsOpen(!this.state.cartIsOpen)} >
                <img src="/shopping-cart.svg" />
              </div>
            </div>
          )}
          {<Cart open={this.state.cartIsOpen}/>} 
        </nav>
      </div>
    );
  }



}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    customer: state.auth
  };
};

const mapDispatch = (dispatch) => {
  return {
    syncCart: (cartId) => dispatch(syncCartToDataBase(cartId)),
    logout: () => dispatch(logout()),
    updateOrder: (order) => dispatch(updateOrder(order))

  };
};

export default connect(mapState, mapDispatch)(Navbar);
