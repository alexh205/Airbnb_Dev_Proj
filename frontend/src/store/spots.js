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

export const getAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("/apr/spots");

  if (response.ok) {
    const objArr = {};
    const { Spots } = await response.json();
    Spots.forEach((spot) => (objArr[spot.id] = spot));
    dispatch(getSpot(objArr));
  }
};
export const addNewSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch("/apr/spots", {
    method: "POST",
    body: JSON.stringify({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(editSpot(add));
  }
};
export const modifySpot = (spot) => async (dispatch) => {
  const { id } = spot;
  const response = await csrfFetch(`/apr/spots/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    }),
  });

  if (response.ok) {
    const editData = await response.json();
    dispatch(addSpot(add));
  }
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
