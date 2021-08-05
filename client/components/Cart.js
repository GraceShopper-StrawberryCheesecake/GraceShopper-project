import React from "react";
import { connect } from "react-redux";
import { fetchOrder } from "../store/order";
import { fetchItems } from "../store/items";

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      order: {},
    };
    this.mergeCarts = this.mergeCarts.bind(this);
    this.parseOrderToCart = this.parseOrderToCart.bind(this);
  }

  // when the component mounts we check if the user is logged in and get the order rom the database
  // otherwise, we pull from window.localStorage and setState
  componentDidMount() {
    this.props.getItems();
    if (this.props.customerId) {
      this.props.getOrder(this.props.customerId);
    } else {
      const order = JSON.parse(window.localStorage.getItem("order"));
      if (order) {
        this.setState({
          order,
        });
      }
    }
  }

  parseOrderToCart(order) {
      const orderItems = order.items
      const cartItems = orderItems.reduce((accum, item) => {
        accum[item.id] = 1
        return accum
      }, {})
      return cartItems
  }

  mergeCarts(storeCart, localCart) {
    console.log('storeCart', storeCart)
    console.log('localCart', localCart)
    if (!localCart || Object.keys(localCart).length < 1) {
        return storeCart
    }
    const storeCartKeys = Object.keys(storeCart);
    const localCartKeys = Object.keys(localCart);
    const allKeys = [...storeCartKeys, ...localCartKeys].sort((a, b) => a - b)
    const hashMap = {}

    for (let i = 0; i < allKeys.length; i++) {
        let sum = 0
        if (!hashMap[allKeys[i]]) {
            if(storeCartKeys[allKeys[i]]) sum += parseInt(storeCartKeys[allKeys[i]])
            if(localCartKeys[allKeys[i]]) sum += parseInt(localCartKeys[allKeys[i]])
            hashMap[allKeys[i]] = sum
        } 
    }
    
    return hashMap

  }

  // after the database call, we set the state with the user's order
  componentDidUpdate() {
    // we check to see if the order on the state is an empty object
    // if it is and the order on props exists, we set the state to the order on props
    if (
      Object.keys(this.state.order).length < 1 &&
      Object.keys(this.props.order).length > 0
    ) {
      const localCart = JSON.parse(window.localStorage.getItem("order"));
      let storeCart = {}
      if (this.props.order.id) {
        storeCart = this.parseOrderToCart(this.props.order)
      } else {
        storeCart = this.props.order
      }
    //   this.props.order.id ? this.parseOrderToCart(this.props.order) : this.props.order;
      const mergedCart = this.mergeCarts(storeCart, localCart);
      window.localStorage.setItem("order", JSON.stringify(mergedCart));
      this.setState({
        order: mergedCart,
      });
    }

    // we check to see if the cart on local storage is not equal to the current order on state
    // and then update the state to the most current order
    const newCart = JSON.parse(window.localStorage.getItem("order"));
    if (newCart) {
      if (JSON.stringify(newCart) !== JSON.stringify(this.state.order)) {
        this.setState({
          order: newCart,
        });
      }
    }
  }

  render() {
    // filter over the items array check if the order object contains the item id
    const cartItems = this.props.items.filter((item) =>
      Object.keys(this.state.order).includes(String(item.id))
    );
    return (
      <div id="cart">
        <h1>Cart</h1>
        {Object.keys(this.state.order).length > 0 &&
          cartItems.map((item, index) => (
            <div key={index}>
              {item.name} {this.state.order[item.id]}
            </div>
          ))}
      </div>
    );
  }
}

const mapState = (state) => ({
  customerId: state.auth.id,
  order: state.orderReducer,
  items: state.items,
});

const mapDispatch = (dispatch) => ({
  getOrder: (id) => dispatch(fetchOrder(id)),
  getItems: () => dispatch(fetchItems()),
});

export default connect(mapState, mapDispatch)(Cart);
