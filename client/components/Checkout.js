import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { me } from '../store/auth'
import { mergeCart } from '../store/order'

class Checkout extends React.Component {
    constructor() {
        super()
        this.state = {
            isCheckedOut: false
        }
        this.handleClick = this.handleClick.bind(this)
    }

    async componentDidMount() {
        await this.props.getCustomerInfo()
        await this.props.syncCart(this.props.customer.orders[0])
    }

    handleClick() {
        this.setState({isCheckedOut: !this.state.isCheckedOut})
    }

    render() {
        // console.log(this.props.customer)
        const { customer } = this.props
        let sum = 0
        return(
            <div>
                <h1>Your Order</h1>
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
            </div>
        )
    }
}

const mapState = state => ({
    customer: state.auth
})

const mapDispatch = dispatch => ({
    getCustomerInfo: () => dispatch(me()),
    syncCart: (cart) => mergeCart(cart)
})

export default connect(mapState, mapDispatch)(Checkout)