import React from "react";
import { connect } from "react-redux";
import { fetchSingleCustomer } from '../store/singleCustomer'
import { fetchSingleItem } from '../store/singleItem'
import axios from "axios";

class Update extends React.Component {
    constructor() {
        super()
        this.state = {
            item: {
                name: '',
                imgUrl: '',
                description: '',
                quantity: 0,
                price: 0
            },
            customer: {
                name: '',
                email: '',
                password: ''
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async componentDidMount() {
        if(this.props.match.params.customerId) {
            await this.props.getCustomer(this.props.match.params.customerId)
            const { customer } = this.props
            this.setState({customer: {name: customer.name, email: customer.email, password: customer.password}})
        } else {
            await this.props.getItem(this.props.match.params.itemId)
            const { item } = this.props
            this.setState({item: {name: item.name, imgUrl: item.imgUrl, description: item.description, quantity: item.quantity, price: item.price}})
        }

    }

    handleChange(evt) {
        if(this.props.match.params.customerId) {
            this.setState({customer: {...this.state.customer, [evt.target.name]: evt.target.value}})
        } else {
            this.setState({item: {...this.state.item, [evt.target.name]: evt.target.value}})
        }
    }

    async handleSubmit(evt) {
        evt.preventDefault()
        if(this.props.match.params.customerId) {
            await axios.put(`/api/customers/${this.props.match.params.customerId}`,{...this.state.customer}, {headers:{authorization: window.localStorage.getItem('token')}})
            this.props.history.push(`/customers/${this.props.match.params.customerId}`)
        } else {
            await axios.put(`/api/items/${this.props.match.params.itemId}`,{...this.state.item}, {headers:{authorization: window.localStorage.getItem('token')}})
            this.props.history.push(`/items/${this.props.match.params.itemId}`)
        }
    }

    render() {
        const {params} = this.props.match
        return(
            <div className="update">
                {params.customerId ? (
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor='name'>Name</label>
                        <input type="text" name="name" value={this.state.customer.name} onChange={this.handleChange}/>

                        <label htmlFor='email'>Email</label>
                        <input type="text" name="email" value={this.state.customer.email} onChange={this.handleChange}/>

                        <label htmlFor='password'>Password</label>
                        <input type="password" name="password" onChange={this.handleChange}/>
                        <br/>

                        <button id="updateCustomerButt" type="submit">Update Customer</button>
                    </form>
                ) : (
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor='name'>Name</label>
                        <input type="text" name="name" value={this.state.item.name} onChange={this.handleChange}/>

                        <label htmlFor='imgUrl'>Image Url</label>
                        <input type="text" name="imgUrl" value={this.state.item.imgUrl} onChange={this.handleChange}/>

                        <label htmlFor='description'>Description</label>
                        <textarea type="text" name="description" value={this.state.item.description} onChange={this.handleChange}/>

                        <label htmlFor='quantity'>Quantity</label>
                        <input type="number" name="quantity" value={this.state.item.quantity} onChange={this.handleChange}/>

                        <label htmlFor='price'>Price</label>
                        <input type="number" step="0.01" min="0" name="price" value={this.state.item.price} onChange={this.handleChange}/>
                        <br/>

                        <button id="updateItemButt" type="submit">Update Item</button>
                    </form>
                )}
            </div>
        )
    }
}

const mapState = state => ({
    customer: state.singleCustomer,
    item: state.singleItemReducer
})

const mapDispatch = dispatch => ({
    getCustomer: (id) => dispatch(fetchSingleCustomer(id)),
    getItem: (id) => dispatch(fetchSingleItem(id))
})
export default connect(mapState, mapDispatch)(Update)
