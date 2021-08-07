import React from 'react'
import { connect } from 'react-redux'
import { fetchItems } from '../store/items'
import { Button } from '@material-ui/core'
import { updateOrder } from '../store/order'
import { me } from '../store/auth';
import axios from 'axios';


class AllItems extends React.Component {
    constructor() {
        super()
        this.handleDelete = this.handleDelete.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.addItemToCart = this.addItemToCart.bind(this)
    }
    componentDidMount() {
        this.props.getItems()
        if(window.localStorage.getItem('token')) {
            this.props.getAuth()
        }
    }

    async handleDelete(id) {
        await axios.delete(`/api/items/${id}`, {headers: {authorization: window.localStorage.getItem('token')}})
        this.props.getItems()
    }

    render() {
        return (
            <div className="container">
                <h1>All Items</h1>
                {this.props.items.map(item => {
                    return(
                        <div key={item.id} className="item" >
                            <img src={item.imgUrl} onClick={() => {this.props.history.push(`/items/${item.id}`)}}/>
                            <div className="content">
                                <h2>{item.name}</h2>
                                <h3>item description</h3>
                                <div className="description">{item.description}</div>
                                <div>Price: ${item.price/100}</div>
                                {item.quantity > 0 ? (
                                    <div id="stock">
                                        <div>In Stock</div>
                                        {/* <Button variant="outlined">add to cart</Button> */}

                                        <button value={item.id} onClick={(event) => this.handleClick(event, item.quantity)}>Add to cart</button>
                                        {this.props.isAdmin ? (
                                            <Button color="secondary" variant="outlined" onClick={() => this.handleDelete(item.id)}>Delete</Button>
                                        ) : (null)}
                                    </div>
                                ) : (
                                    <div id="stock">Out of Stock</div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    handleClick(event, quantity) {
        this.addItemToCart(event.target.value, quantity)
    }

    addItemToCart(itemId, quantity) {
        const oldCart = JSON.parse(window.localStorage.getItem('order'));
        let newCart = {}
        if (!oldCart) {
            newCart = { [itemId]: 1}
        } else {
            newCart = oldCart
            if (Object.keys(oldCart).includes(itemId)) {
                if (oldCart[itemId] < quantity) {
                    newCart[itemId] = oldCart[itemId] +1
                }
            } else {
                newCart[itemId] = 1
            }
        }
        window.localStorage.setItem('order', JSON.stringify(newCart))
        this.props.updateOrder(newCart)
    }


}

const mapState = (state) => ({
    items: state.items,
    isAdmin: state.auth.isAdmin
})

const mapDispatch = (dispatch) => ({
    getItems: () => dispatch(fetchItems()),
    updateOrder: (order) => dispatch(updateOrder(order)),
    getAuth: () => dispatch(me())
})

export default connect(mapState, mapDispatch)(AllItems)