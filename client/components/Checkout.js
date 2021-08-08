import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { me } from '../store/auth'
import { mergeCart, syncCartToDataBase } from '../store/order'
import axios from 'axios'

class Checkout extends React.Component {
    constructor() {
        super()
        this.state = {
            isCheckedOut: false,
            isLoggedIn: true,
            cart: {},
            itemsArr: []
        }
        this.handleClick = this.handleClick.bind(this)
    }

    async componentDidMount() {
        if(window.localStorage.getItem('token') !== null) {
            await this.props.getCustomerInfo()
            await this.props.syncCart(this.props.customer.orders[0])
        } else {
            console.log('not logged in')
            const cart = JSON.parse(window.localStorage.getItem('order'))
            const itemsArr = []
            for(let id in cart) {
                const {data} = await axios.get(`/api/items/${id}`)
                itemsArr.push(data)
            }
            console.log('item object: ', cart)
            console.log('item array: ', itemsArr)

            this.setState({isLoggedIn: false, cart: cart, itemsArr: itemsArr})
        }
    }
    
    handleClick() {
        this.setState({isCheckedOut: !this.state.isCheckedOut})
        const cart = this.props.notLoggedInSyncCart(0)
    }

    render() {
        // console.log(this.props.customer)
        const { customer } = this.props
        const { cart, itemsArr } = this.state
        let sum = 0
        return(
            <div>
                <h1>Your Order</h1>
                {this.state.isLoggedIn ? (
                    <React.Fragment>
                        {this.state.isCheckedOut ? (
                            <div>
                                <h1>Thank You For Your Purchase</h1>
                                <Link to="/items">Continue Shopping</Link>
                            </div>
                        ) : (
                            <React.Fragment>
                                <div>
                                    {customer.orders && customer.orders[0].items.map(item => {
                                        sum = sum + (item.price * item.orderItem.quantity)
                                        return (
                                            <div className="ItemInfo" key={item.id}>
                                                {/* <img src={item.imgUrl}/> */}
                                                <h3>{item.name}</h3>
                                                <div>Quantity: {item.orderItem.quantity}</div>
                                                <div> Price: {(item.price * item.orderItem.quantity) / 100}</div>
                                            </div>
                                        )
                                    })}
                                    <h2>Total: ${sum / 100}</h2>
                                </div>
                                <Button variant="outlined" onClick={this.handleClick}>Checkout</Button>
                            </React.Fragment>
                        )}
                    </React.Fragment>

                ) : (
                    <React.Fragment>
                        {this.state.isCheckedOut ? (
                            <div>
                                <h1>Thank You For Your Purchase</h1>
                                <Link to="/items">Continue Shopping</Link>
                            </div>
                        ) : (
                            <React.Fragment>
                                <div>
                                    {itemsArr.map(item => {
                                        sum = sum + (item.price * cart[item.id])
                                        return (
                                            <div className="ItemInfo" key={item.id}>
                                                {/* <img src={item.imgUrl}/> */}
                                                <h3>{item.name}</h3>
                                                <div>Quantity: {cart[item.id]}</div>
                                                <div> Price: {(item.price * cart[item.id]) / 100}</div>
                                            </div>
                                        )
                                    })}
                                    <h2>Total: ${sum / 100}</h2>
                                </div>
                                <Button variant="outlined" onClick={this.handleClick}>Checkout</Button>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                )}
            </div>
        )
    }
}

const mapState = state => ({
    customer: state.auth
})

const mapDispatch = dispatch => ({
    getCustomerInfo: () => dispatch(me()),
    loggedInSyncCart: (cart) => mergeCart(cart),
    notLoggedInSyncCart: (id) => dispatch(syncCartToDataBase(id))
})

export default connect(mapState, mapDispatch)(Checkout)