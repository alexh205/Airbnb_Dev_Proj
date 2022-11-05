import { csrfFetch } from "./csrf";

const GET = "reviews/GET";
const ADD = "reviews/ADD";
const EDIT = "reviews/EDIT";
const DELETE = "reviews/DELETE";
const USERREVIEWS = "reviews/USERREVIEWS";

// const ADDREVIMAGE = "images/ADDREVIMAGE";

const getReviews = (data) => ({
  type: GET,
  reviews: data,
});
const addReview = (data) => ({
  type: ADD,
  reviews: data,
});

const editReview = (data) => ({
  type: EDIT,
  reviews: data,
});

const userReviews = (data) => ({
  type: USERREVIEWS,
  reviews: data,
});

const deleteReview = (data) => ({
  type: DELETE,
  reviews: data,
});

// const addReviewImages = (url, reviewId, userId) => {
//   return {
//     type: ADDREVIMAGE,
//     payload1: url,
//     payload2: reviewId,
//     payload3: userId,
//   };
// };

export const renderReviews = () => {
  return {
    type: "RENDERREVIEWS",
  };
};

export const getAllReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

  if (response.ok) {
    const { Reviews } = await response.json();
    const obj = {};
    Reviews.forEach((review) => (obj[review.id] = review));
    dispatch(getReviews(obj));
  }
};

export const addNewReview = (data) => async (dispatch) => {
  const { spotId } = data;
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    const newReview = await response.json();
    dispatch(addReview(newReview));
  } else {
    return response;
  }
};

export const getUserReviews = () => async (dispatch) => {
  const response = await csrfFetch("/api/reviews/current");

  if (response.ok) {
    const { Reviews } = await response.json();
    const obj = {};
    Reviews.forEach((review) => (obj[review.id] = review));

    dispatch(userReviews(obj));
  }
};

export const reviewEdit = (review) => async (dispatch) => {
  const { id } = review;
  const response = await csrfFetch(`/api/reviews/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });
  const editedreview = await response.json();
  if (response.ok) {
    dispatch(editReview(editedreview));
  } else {
    throw response;
  }
};

export const reviewDelete = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteReview(id));
  }
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET:
      newState = { ...action.reviews };
      return newState;
    case ADD:
      newState = { ...state, [action.reviews.id]: action.reviews };
      return newState;
    case USERREVIEWS:
      newState = { ...action.reviews };
      return newState;
    case EDIT:
      newState = { ...state, [action.reviews.id]: action.reviews };
      return newState;
    case DELETE:
      delete newState[action.reviews.id];
      return newState;
    // case createReviewImage:
    //   const imagesArr = newState[action.payload2];
    //   imagesArr[imagesArr.length] = {
    //     url: action.payload1,
    //     userId: action.payload3,
    //   };
    //   return newState;
    case "RENDERREVIEWS":
      return initialState;

    default:
      return state;
  }
};

export default reviewsReducer;
