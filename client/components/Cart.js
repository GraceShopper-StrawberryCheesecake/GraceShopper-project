import React from "react";
import { connect } from "react-redux";
import { fetchOrder } from "../store/order";
import { fetchItems } from "../store/items";
import { FormControl, InputLabel, Input, TextField, Button } from "@material-ui/core";

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      order: {},
    };
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
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

  // it removed a key from the order object
  handleRemoveItem(itemId) {
    let order = this.state.order;
    delete order[itemId];
    window.localStorage.setItem("order", JSON.stringify(order));
    this.setState({
      order,
    });
  }

  parseOrderToCart(order) {
    const orderItems = order.items;
    const cartItems = orderItems.reduce((accum, item) => {
      accum[item.id] = 1;
      return accum;
    }, {});
    return cartItems;
  }

  // after the database call, we set the state with the user's order
  componentDidUpdate() {
    // we check to see if the order on the local storage exists
    // if it does, we check if it is the same as the state order
    // if they are different, we push the local storage on the state

    if (JSON.parse(window.localStorage.getItem("order"))) {
      if (
        JSON.stringify(this.state.order) !==
        window.localStorage.getItem("order")
      ) {
        const localCart = JSON.parse(window.localStorage.getItem("order"));

        if (localCart) {
          this.setState({
            order: localCart,
          });
        }
      }
    } else {
      window.localStorage.setItem("order", JSON.stringify({}));
    }
  }

  componentWillUnmount() {
    window.localStorage.setItem("order", JSON.stringify(this.state.order));
  }

  handleChangeQuantity(event) {
    event.persist();
    const currentStateOrder = this.state.order;

    currentStateOrder[parseInt(event.target.name)] = parseInt(
      event.target.value
    );

    window.localStorage.setItem("order", JSON.stringify(currentStateOrder));
    this.setState({ order: currentStateOrder });
  }

  render() {
    // filter over the items array check if the order object contains the item id
    const cartItems = this.props.items.filter((item) =>
      Object.keys(this.state.order).includes(String(item.id))
    );
    return (
      <div id="cart">
        <h1>Items in your cart</h1>
        <div>
          {Object.keys(this.state.order).length > 0 &&
            cartItems.map((item, index) => (
              <div key={index} className="cart-items">
                <InputLabel>{item.name}</InputLabel>{" "}
                <TextField
                  type="number"
                  InputProps={{ inputProps: { min: 1, max: item.quantity } }}
                  value={this.state.order[item.id]}
                  name={String(item.id)}
                  onChange={this.handleChangeQuantity}
                  style={{width: '35px'}}
                />
                <button
                  value={item.id}
                  onClick={() => this.handleRemoveItem(item.id)}
                >X</button>
              </div>
            ))}
            <Button variant="outlined" style={{ width: '100%', marginTop: '10px' }} >Checkout</Button>
        </div>
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
