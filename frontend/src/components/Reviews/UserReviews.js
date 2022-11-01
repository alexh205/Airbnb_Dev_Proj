import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as reviewActions from "../../store/reviews";

const UserReviews = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const myReviews = async () =>
      await dispatch(reviewActions.getUserReviews());

    myReviews();
  }, [dispatch]);

  const reviewList = useSelector((state) => state.reviews);
  const reviewsArr = Object.values(reviewList);
  console.log(reviewsArr);

  return (
    <>
      <div id="wrapper">
        <div id="my-reviews-header">
          <h1>My Reviews</h1>
        </div>
        <div id="my-reviews-container">
          <div id="myReviews" key="myreviews">
            {reviewsArr.map((review) => (
              <div id="review" key={review.id}>
                <div id="spot-name">
                  <Link to={`/spots/${review.Spot.id}`}>
                    {review.Spot.name}
                  </Link>
                </div>
                <div id="spot-address">{review.Spot.address}</div>

                <div>
                  <i className="fa-regular fa-star"> </i>
                  {review.stars}
                </div>

                <div>{review.review}</div>
                <div id="updated-at">
                  Updated At: {review.updatedAt.slice(0, 10)}
                </div>

                <div id="edit-delete-container">
                  <Link to={`/user/review/edit/${review.id}`}>
                    <button>Edit</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserReviews;
