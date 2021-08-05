import React from 'react';
import { connect } from "react-redux";
import { fetchOrder } from "../store/order"


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
        if (!this.state.order.id && this.props.order) {
            this.setState({
                order: this.props.order
            })
        }
    }

    render () {
        return (
            <div>
                <h1>CART</h1>
                {this.state.order.items && this.state.order.items.map((item, index) => <div key={index} >{item.name}</div>)}
                {/* {this.props.order.items && window.localStorage.setItem('order', JSON.stringify(this.props.order))} */}
            
            </div>
        )
    }

}

const mapState = (state) => ({
    customerId: state.auth.id,
    order: state.orderReducer 
})

const mapDispatch = (dispatch) => ({
    getOrder: (id) => dispatch(fetchOrder(id)) 
})



export default connect(mapState, mapDispatch)(Cart)