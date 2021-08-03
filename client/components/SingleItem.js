import React from 'react'
import { connect } from 'react-redux'
import { fetchSingleItem } from '../store/singleItem'

class SingleItem extends React.Component {

  componentDidMount() {
    const itemId = this.props.match.params.id
    console.log(typeof itemId)
    this.props.getSingleItem(itemId)
  }

  render() {
    const item = this.props.item
  return (
    <div>
      <img src="https://sugarspunrun.com/wp-content/uploads/2019/01/Best-Cheesecake-Recipe-2-1-of-1-7.jpg" />
      <div>Item Name: {item.name}</div>
      <div>Item Price: {item.price}</div>
      <div>Item Description: {item.description}</div>
      <button>Add to cart</button>
    </div>
  )
}
}


const mapState = state => {
  return {
    item: state.singleItemReducer
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleItem: (id) => dispatch(fetchSingleItem(id))
  }
}

export default connect(mapState, mapDispatch)(SingleItem)


