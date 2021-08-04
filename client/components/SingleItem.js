import React from "react";
import { connect } from "react-redux";
import { fetchSingleItem } from "../store/singleItem";
import { Button } from "@material-ui/core";

class SingleItem extends React.Component {
  componentDidMount() {
    const itemId = this.props.match.params.id;
    console.log(typeof itemId);
    this.props.getSingleItem(itemId);
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
          <p> price: $ {item.price}</p>
          <Button variant="outlined">Add to cart</Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    item: state.singleItemReducer,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getSingleItem: (id) => dispatch(fetchSingleItem(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleItem);
