import React from 'react'
import { connect } from 'react-redux'
import { fetchItems } from '../store/items'

class AllItems extends React.Component {
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
                                        <button>add to cart</button>
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
}

const mapState = (state) => ({
    items: state.items
})

const mapDispatch = (dispatch) => ({
    getItems: () => dispatch(fetchItems())
})

export default connect(mapState, mapDispatch)(AllItems)