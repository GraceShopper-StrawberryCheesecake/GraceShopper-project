import React from 'react';
import { connect } from "react-redux";
import { fetchOrder } from "../store/order"


class Cart extends React.Component {

    componentDidMount () {
        this.props.getOrder(this.props.customerId)
    }

    render () {
        return (
            <div>
                <h1>CART</h1>
                {this.props.order.items && this.props.order.items.map((item, index) => <div key={index} >{item.name}</div>)}
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