import axios from "axios";

const GET_ITEM = "GET_ITEM";

export const getItem = (item) => {
  return {
    type: GET_ITEM,
    item,
  };
};

export const fetchSingleItem = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/items/${id}`);
      dispatch(getItem(data));
    } catch (e) {
      console.log(e);
    }
  };
};

const initialState = {};

export default function singleItemReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ITEM:
      return action.item;
    default:
      return state;
  }
}
