import { csrfFetch } from "./csrf";

const GET = "spots/GET";
const ADD = "spots/ADD";
const EDIT = "spots/EDIT";
const USERSPOTS = "spots/USERSPOTS";
const DELETE = "spots/DELETE";

const getSpot = (spot) => {
  return {
    type: GET,
    spot,
  };
};
const addSpot = (spot) => {
  return {
    type: ADD,
    spot,
  };
};
const editSpot = (spot) => {
  return {
    type: EDIT,
    spot,
  };
};
const getMySpots = (spot) => {
  return {
    type: USERSPOTS,
    spot,
  };
};
const deleteSpot = (spot) => {
  return {
    type: DELETE,
    spot,
  };
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET:
      newState = { ...state, ...action.spot };
      return newState;
    case ADD:
      newState = { ...state, ...action.spot };
      return newState;
    case EDIT:
      newState = { ...state, ...action.spot };
      return newState;
    case USERSPOTS:
      newState = { ...state, ...action.spot };
      return newState;
    case DELETE:
      newState = { ...state, ...action.spot };
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
