import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import Cart from "./Cart"

const Navbar = ({ handleClick, isLoggedIn }) => {
  
  const [cartIsOpen, setCartIsOpen] = useState(false);

  return (
    <div className="navbar-container">
      <div className="logo">
        <img src="/cheesecakeIcon2.svg" />
        <h1>Chaotic Cheesecake</h1>
      </div>
      <nav>
        {isLoggedIn ? (
          <div className="nav-links-div">
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
            <div className="cart-button" onClick={() => setCartIsOpen(!cartIsOpen)} >
              <img src="/shopping-cart.svg" />
            </div>
          </div>
        ) : (
          <div className="nav-links-div">
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <div className="cart-button" onClick={() => setCartIsOpen(!cartIsOpen)} >
              <img src="/shopping-cart.svg" />
            </div>
          </div>
        )}
        {cartIsOpen && <Cart />} 
      </nav>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
