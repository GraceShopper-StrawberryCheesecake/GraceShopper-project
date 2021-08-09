import React from 'react'
import { connect } from 'react-redux'
import { fetchSingleCustomer } from '../store/singleCustomer'
import { me } from '../store'
import axios from 'axios'

class SingleCustomer extends React.Component {
    constructor() {
        super()
        this.handleView = this.handleView.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount() {
        this.props.getCustomer(this.props.match.params.customerId)
        this.props.getAuth()
    }

    handleView(id) {
        this.props.history.push(`/customers/${id}/update`)
    }

    async handleDelete(id) {
        await axios.delete(`/api/customers/${id}`, {headers: {
            authorization: window.localStorage.getItem('token')
        }})
        this.props.history.push(`/customers`)

    }

    render() {
        const { customer, isAdmin } = this.props
        return (
            <div className="singleCustomer">
                {customer ? (
                    <div className="singleCustomerInfo">
                        <div>{customer.name}</div>
                        <div>{customer.email}</div>
                        <button onClick={() => this.handleView(customer.id)}>Update</button>
                        {isAdmin && <button onClick={() => this.handleDelete(customer.id)}>Delete</button>}
                    </div>
                ) : (null)}

            </div>
        )
    }
}

const mapState = (state) => ({
    customer: state.singleCustomer,
    isAdmin: state.auth.isAdmin
})

const mapDispatch = (dispatch) => ({
    getCustomer: (id) => dispatch(fetchSingleCustomer(id)),
    getAuth: () => dispatch(me())
})

export default connect(mapState, mapDispatch)(SingleCustomer)
