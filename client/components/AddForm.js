import React from "react";
import axios from "axios";

class AddForm extends React.Component {
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

    handleChange(evt) {
        if(this.props.match.url.includes('customer')) {
            this.setState({customer: {...this.state.customer, [evt.target.name]: evt.target.value}})
        } else {
            this.setState({item: {...this.state.item, [evt.target.name]: evt.target.value}})
        }
    }
    
    async handleSubmit(evt) {
        evt.preventDefault()
        if(this.props.match.url.includes('customer')) {
            await axios.post('/api/customers',{...this.state.customer}, {headers:{authorization: window.localStorage.getItem('token')}})
            this.props.history.push('/customers')
        } else {
            await axios.post('/api/items',{...this.state.item}, {headers:{authorization: window.localStorage.getItem('token')}})
            this.props.history.push('/items')
        }
    }

    render() {
        const {url} = this.props.match
        return(
            <div>
                {url.includes('customer') ? (
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor='name'>Name</label>
                        <input type="text" name="name" onChange={this.handleChange}/>

                        <label htmlFor='email'>Email</label>
                        <input type="text" name="email" onChange={this.handleChange}/>
                        
                        <label htmlFor='password'>Password</label>
                        <input type="password" name="password" onChange={this.handleChange}/>
                        <br/>

                        <button type="submit">Add Customer</button>
                    </form>
                ) : (
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor='name'>Name</label>
                        <input type="text" name="name" onChange={this.handleChange}/>

                        
                        <label htmlFor='quantity'>Quantity</label>
                        <input type="number" min="0" name="quantity" onChange={this.handleChange}/>
                        
                        <label htmlFor='price'>Price</label>
                        <input type="number" step="0.01" min="0" name="price" onChange={this.handleChange}/>

                        <label htmlFor='imgUrl'>Image Url</label>
                        <input type="text" name="imgUrl" onChange={this.handleChange}/>

                        <label htmlFor='description'>Description</label>
                        <input type="text" name="description" onChange={this.handleChange}/>
                        <br/>

                        <button type="submit">Add Item</button>
                    </form>
                )}
            </div>
        )
    }
}

export default AddForm