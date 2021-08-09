import axios from 'axios'
import React, { Component } from 'react'

export default class OrderHistory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: []
    }
  }

  async componentDidMount() {
    const { data } = await axios.get('/api/customers/orders/orderHistory', {headers: {
      authorization: window.localStorage.getItem('token')
  }})
  this.setState({
    orders: data
  })
  }

  render() {
    // console.log(this.state.orders)
    const { orders } = this.state;
    console.log(orders);
    return (
      <div className="historyContainer">
      {orders.map(order => {
        let sum = 0;
        return (
          <div key={order.id} className="orderInfo">
            <h2>Order #{order.id}</h2>
            {order.items.map(item => {
              sum += item.price * item.orderItem.quantity
              return (
                <div key={item.id}>
                  <h3>{item.name}</h3>
                  <div>Quantity: {item.orderItem.quantity} </div>
                  <div>Price: {item.price * item.orderItem.quantity / 100} </div>
                </div>
              )
            })}
            <div>
            Total: {sum/100}
            </div>
          </div>
        )
      })}
    </div>
    )
  }
}

