import React from "react";
import { connect } from "react-redux";
import { fetchSingleItem } from "../store/singleItem";
import { Button } from "@material-ui/core";
import {me} from '../store/auth'
import axios from "axios";

class SingleItem extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    const itemId = this.props.match.params.id;
    this.props.getSingleItem(itemId);
    if(window.localStorage.getItem('token')) {
      this.props.getAuth()
    }
  }

  handleClick(id) {
    this.props.history.push(`/items/${id}/update`)
  }

  async handleDelete(id) {
    await axios.delete(`/api/items/${id}`, {headers: {authorization: window.localStorage.getItem('token')}})
    this.props.history.push('/items')
  }

  render() {
    const item = this.props.item;
    return (
      <div className="single-item-div">
        <img src={item.imgUrl} />
        <div className="single-item-info">
          <h1>{item.name}</h1>
          <p id="item-description">
            {item.description}
          </p>
          <div id="price-and-button">
          <p> price: $ {item.price/100}</p>
          <Button variant="outlined">Add to cart</Button>
          {this.props.isAdmin ? (
            <React.Fragment>
              <Button onClick={() => this.handleClick(item.id)}variant="outlined" color="primary">Update Info</Button>
              <Button onClick={() => this.handleDelete(item.id)}variant="outlined" color="secondary">Delete</Button>
            </React.Fragment>
          ) : (null)}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    item: state.singleItemReducer,
    isAdmin: state.auth.isAdmin
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSingleItem: (id) => dispatch(fetchSingleItem(id)),
    getAuth: () => dispatch(me())
  };
};

export default connect(mapState, mapDispatch)(SingleItem);
