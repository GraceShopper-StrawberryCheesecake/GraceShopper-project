import React from 'react'
import { connect } from 'react-redux'
import { fetchItems } from '../store/items'
import { Button } from '@material-ui/core'
import { updateOrder } from '../store/order'
import { me } from '../store/auth';
import axios from 'axios';
import { Link } from 'react-router-dom'


class AllItems extends React.Component {
    constructor() {
        super()
        this.state = {
            items: [],
            filter: 'all'
        }
        this.handleDelete = this.handleDelete.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.addItemToCart = this.addItemToCart.bind(this)
        this.dropDownButton = this.dropDownButton.bind(this)
        this.handleChangeFilter = this.handleChangeFilter.bind(this)
    }
    async componentDidMount() {
        await this.props.getItems()
        if(window.localStorage.getItem('token')) {
            this.props.getAuth()
        }
        this.setState({
            items: this.props.items
        })
    }

    async handleDelete(id) {
        await axios.delete(`/api/items/${id}`, {headers: {authorization: window.localStorage.getItem('token')}})
        this.props.getItems()
    }

    handleChangeFilter(event) {

        const filter = event.target.value
        let items = []
        if (filter === 'all') {
            items = this.props.items
        } else {
            items = this.props.items.filter(item => item.type === filter )
        }
        this.setState({
            items,
            filter
        })
    }

    dropDownButton() {
        return (
            <select onChange={this.handleChangeFilter}>
                <option value="all">All</option>
                <option value="Karmel">Caramel</option>
                <option value="Fruits">Fruits</option>
                <option value="Vegan">Vegan</option>
                <option value="Chocolate">Chocolate</option>
            </select>
        )
    }

    render() {
        return (
            <div className="container">
                <h1>Products</h1>
                {this.dropDownButton()}
                {!this.state.items[0] && <h2>{`There are no ${this.state.filter} cheesecakes!`}</h2>}
                {this.state.items.map(item => {
                    return(
                        <div key={item.id} className="item" >
                            <img src={item.imgUrl} onClick={() => {this.props.history.push(`/items/${item.id}`)}}/>
                            <div className="content">
                                <Link to={`/items/${item.id}`}><h2>{item.name}</h2></Link>
                                {/* <h3>item description</h3> */}
                                <div className="description">{item.description}</div>
                                <div>Price: ${parseFloat(item.price/100).toFixed(2)}</div>
                                {item.quantity > 0 ? (
                                    <div id="stock">
                                        <div style={ {color: 'green'}}>In Stock</div>
                                        {/* <Button variant="outlined">add to cart</Button> */}
                                        <button className="add-to-cart" value={item.id} onClick={(event) => this.handleClick(event, item.quantity)}>Add to cart</button>
                                        {this.props.isAdmin ? (
                                            <Button color="secondary" variant="outlined" onClick={() => this.handleDelete(item.id)}>Delete</Button>
                                        ) : (null)}
                                    </div>
                                ) : (
                                    <div id="stock" style={{color: 'red'}}>Out of Stock</div>
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