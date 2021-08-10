import React, { Component } from 'react'
import axios from 'axios'

export default class OrderHistory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: []
    }
  }

  async componentDidMount() {
    const { data } = await axios.get(`/api/customers/${this.props.match.params.customerId}/orderHistory`, {headers: {
      authorization: window.localStorage.getItem('token')
  }})
  this.setState({
    orders: data
  })
  }

  render() {
    const { orders } = this.state;
    return (
      <div className="historyContainer">
        {!orders[0] && <h1 style={{textAlign: 'center'}}>You Haven't Ordered Anything Yet</h1>}
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
