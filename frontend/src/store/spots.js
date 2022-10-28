import { csrfFetch } from "./csrf";

const GET = "spots/GET";
const GETBYID = "spots/GETBYID";
const ADD = "spots/ADD";
const EDIT = "spots/EDIT";
const USERSPOTS = "spots/USERSPOTS";
const DELETE = "spots/DELETE";

const getSpots = (spots) => {
  return {
    type: GET,
    spots: spots,
  };
};
const getSpotId = (spot) => {
  return {
    type: GETBYID,
    spot: spot,
  };
};

const addSpot = (spot) => {
  return {
    type: ADD,
    spot: spot,
  };
};

const editSpot = (spot) => {
  return {
    type: EDIT,
    spot: spot,
  };
};

const getMySpots = (spot) => {
  return {
    type: USERSPOTS,
    spot: spot,
  };
};

const deleteSpot = (spot) => {
  return {
    type: DELETE,
    spot: spot,
  };
};

export const getAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");

  if (response.ok) {
    const { Spots } = await response.json();
    const objArr = {};
    Spots.forEach((spot) => (objArr[spot.id] = spot));
    dispatch(getSpots(objArr));
  }
};

export const getSpotById = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const spotData = await response.json();

    dispatch(getSpotId(spotData));
  }
};

export const addNewSpot = (spot) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify(spot),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(addSpot(data));
  }
};

export const modifySpot = (spot) => async (dispatch) => {
  const { id } = spot;
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: "PUT",
    body: JSON.stringify(spot),
  });

  if (response.ok) {
    const editData = await response.json();
    dispatch(editSpot(editData));
  }
};

const initialState = {};

const spotsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET:
      newState = { ...action.spots };
      return newState;
    case GETBYID:
      newState = { ...state };
      newState[action.spot.id] = action.spot;
      return newState;
    case ADD:
      newState = { ...state, [action.spot.id]: action.spot };
      return newState;
    case USERSPOTS:
      newState = { ...action.spot };
      return newState;
    case EDIT:
      newState = { ...state, [action.spot.id]: action.spot };
      return newState;
    case DELETE:
      delete newState[action.spot.id];
      return newState;
    default:
      return state;
  }
};

export default spotsReducer;
