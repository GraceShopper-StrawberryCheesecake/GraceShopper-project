import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { me } from '../store/auth'
import { syncCartToDataBase } from '../store/order'
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
        this.handleRemoveItem = this.handleRemoveItem.bind(this)
    }
    
    //this checkout page has to check if the user is logged in or not in order to render the correct info. 
    //then i have to get all the items from local storage and put them in an array to be rendered to the page
    //isCheckedOut determines if the "thank you for purchase feild should be rendered"
    async componentDidMount() {
        
        const cart = JSON.parse(window.localStorage.getItem('order'))
        const itemsArr = []
        for(let id in cart) {
            const {data} = await axios.get(`/api/items/${id}`)
            itemsArr.push(data)
        }
        
        if(window.localStorage.getItem('token') !== null) {
            await this.props.getCustomerInfo()
            this.setState({cart: cart, itemsArr: itemsArr})
        } else {
            this.setState({isLoggedIn: false, cart: cart, itemsArr: itemsArr})
            
        }
    }
    
    
    //then when clicking checkout
    //if your not logged in it will make an order in the database, set orderComplete to true, and add all the item as a child to the order while setting the quatity in the orderItems table
    //if logged in then it finds the order and sets that order to complete and makes a new order for the user in the database
    async handleClick() {
        if(this.state.isLoggedIn) {
            this.props.syncCart(this.props.customer.orders[0].id)
            await axios.get(`/api/orders/updateorder/${this.props.customer.orders[0].id}`, {
                headers: {
                    authorization: window.localStorage.getItem('token')
                }
            })
        } else {
            this.props.syncCart(0)
        }
        window.localStorage.removeItem('order')
        this.setState({isCheckedOut: !this.state.isCheckedOut})
    }
    
   
    async handleRemoveItem(itemId) {
        let order = this.state.cart;
        delete order[itemId];
        window.localStorage.setItem("order", JSON.stringify(order));
        this.state.isLoggedIn && this.props.syncCart(this.props.customer.orders[0].id)

        const itemsArr = []
        for(let id in order) {
            const {data} = await axios.get(`/api/items/${id}`)
            itemsArr.push(data)
        }

    this.setState({cart: order, itemsArr: itemsArr});
    }

    render() {
        const { cart, itemsArr, isCheckedOut } = this.state
        //total sum to be calculated
        let sum = 0
        return(
            <div>
                <h1>Your Order</h1>
                {isCheckedOut ? (
                //thank you page
                            <div>
                                <h1>Thank You For Your Purchase</h1>
                                <Link to="/items">Continue Shopping</Link>
                            </div>
                        ) : (
                            //local storage cart
                            <React.Fragment>
                                <div>
                                    {itemsArr.map((item, index) => {
                                        sum = sum + (item.price * cart[item.id])
                                        return (
                                            <div className="ItemInfo" key={item.id}>
                                                {/* <img src={item.imgUrl}/> */}
                                                <h3>{item.name}</h3>
                                                <div>Quantity: {cart[item.id]}</div>
                                                <div> Price: {(item.price * cart[item.id]) / 100}</div>
                                                <Button variant="outlined" onClick={() => this.handleRemoveItem(item.id, index)}>Delete</Button>
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
    syncCart: (id) => dispatch(syncCartToDataBase(id))
})

export default connect(mapState, mapDispatch)(Checkout)