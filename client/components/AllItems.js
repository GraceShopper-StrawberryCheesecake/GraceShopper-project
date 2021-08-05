import React from 'react'
import { connect } from 'react-redux'
import { fetchItems } from '../store/items'
import { Button } from '@material-ui/core'
import { updateOrder } from '../store/order'

class AllItems extends React.Component {

    constructor() {
        super()
        this.handleClick = this.handleClick.bind(this)
        this.addItemToCart = this.addItemToCart.bind(this)
    }

    componentDidMount() {
        this.props.getItems()
    }

    render() {
        return (
            <div className="container">
                <h1>All Items</h1>
                {this.props.items.map(item => {
                    return(
                        <div key={item.id} className="item" >
                            <img src={item.imgUrl} />
                            <div className="content">
                                <h2>{item.name}</h2>
                                <h3>item description</h3>
                                <div className="description">{item.description}</div>
                                <div>Price: ${item.price}</div>
                                {item.quantity > 0 ? (
                                    <div id="stock">
                                        <div>In Stock</div>
                                        <Button variant="outlined" value={item} onClick={(event) => this.handleClick(event)}>Add to cart</Button>
                                        <button value={item.id} onClick={(event) => this.handleClick(event)}>Add to cart</button>
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

    handleClick(event) {
        this.addItemToCart(event.target.value)
    }

    addItemToCart(itemId) {
        const oldCart = JSON.parse(window.localStorage.getItem('order'));
        let newCart = {}
        if (!oldCart) {
            newCart = { [itemId]: 1}
        } else {
            newCart = oldCart
            if (Object.keys(oldCart).includes(itemId)) {
                newCart[itemId] = oldCart[itemId] +1
            } else {
                newCart[itemId] = 1
            }
        }
        window.localStorage.setItem('order', JSON.stringify(newCart))
        this.props.updateOrder(newCart)
    }


}

const mapState = (state) => ({
    items: state.items
})

const mapDispatch = (dispatch) => ({
    getItems: () => dispatch(fetchItems()),
    updateOrder: (order) => dispatch(updateOrder(order))
})

export default connect(mapState, mapDispatch)(AllItems)