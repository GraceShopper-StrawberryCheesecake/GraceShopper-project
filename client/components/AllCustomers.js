import React from 'react'
import { connect } from 'react-redux'
import { fetchCustomers } from '../store/customers'
import axios from 'axios'

class AllCustomers extends React.Component {
    constructor() {
        super()
        this.handleView = this.handleView.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        this.props.getCustomers()
    }

    handleView(id) {
        this.props.history.push(`/customers/${id}`)
    }

    async handleDelete(id) {
        await axios.delete(`/api/customers/${id}`, {headers: {
            authorization: window.localStorage.getItem('token')
        }})
        this.props.getCustomers()
    }


    render() {
        const { customers } = this.props
        return (
            <div className="allCustomers">
                {customers.map(customer => {
                    return(
                        <div key={customer.id} className="customerInfo">
                            <div>{customer.name}</div>
                            <div>{customer.email}</div>
                            <button onClick={() =>this.handleView(customer.id)}>View</button>
                            <button onClick={() => this.handleDelete(customer.id)}>Delete</button>
                        </div>
                    )
                })}
            </div>
        )
    }
}

const mapState = (state) => ({
    customers: state.customers
})

const mapDispatch = (dispatch) => ({
    getCustomers: () => dispatch(fetchCustomers())
})

export default connect(mapState, mapDispatch)(AllCustomers)