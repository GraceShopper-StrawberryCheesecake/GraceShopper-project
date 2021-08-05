import React from 'react';
import { connect } from "react-redux";
import { fetchOrder } from "../store/order"
import { fetchItems } from '../store/items'


class Cart extends React.Component {

    constructor() {
        super()
        this.state = {
            order: {}
        }
    }

    // when the component mounts we check if the user is logged in and get the order rom the database
    // otherwise, we pull from window.localStorage and setState 
    componentDidMount () {
        console.log("Mounted")
        this.props.getItems()
        if (this.props.customerId) {
            this.props.getOrder(this.props.customerId)
        } else {
            const order = JSON.parse(window.localStorage.getItem('order'))
            if (order) {
                this.setState({
                    order
                })
            }
        }
    }

    // after the database call, we set the state with the user's order
    componentDidUpdate() {

        // we check to see if the cart on local storage is not equal to the current order on state
        // and then update the state to the most current order
        const newCart = JSON.parse(window.localStorage.getItem('order'))
        if (JSON.stringify(newCart) !== JSON.stringify(this.state.order)) {
            this.setState({
                order: newCart
            })
        }

        // we check to see if the order on the state is an empty object
        // if it is and the order on props exists, we set the state to the order on props
        if (Object.keys(this.state.order).length < 1 && Object.keys(this.props.order).length > 0 ) {
            console.log('store update check')
            this.setState({
                order: this.props.order
            })
        }
    }


    render () {
        // filter over the items array check if the order object contains the item id
        const cartItems = this.props.items.filter((item) => Object.keys(this.state.order).includes(String(item.id)))
        return (
            <div id="cart">
                <h1>Cart</h1>
                {Object.keys(this.state.order).length > 0 && cartItems.map((item, index) => <div key={index} >{item.name} {this.state.order[item.id]}</div>)}
            </div>
        )
    }

}

const mapState = (state) => ({
    customerId: state.auth.id,
    order: state.orderReducer,
    items: state.items
})

const mapDispatch = (dispatch) => ({
    getOrder: (id) => dispatch(fetchOrder(id)),
    getItems: () => dispatch(fetchItems())
})



export default connect(mapState, mapDispatch)(Cart)