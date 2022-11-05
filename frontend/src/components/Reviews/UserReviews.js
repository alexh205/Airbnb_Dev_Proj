import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as reviewActions from "../../store/reviews";

const UserReviews = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reviewActions.getUserReviews());
    dispatch(reviewActions.renderReviews());
  }, [dispatch]);

  const reviewList = useSelector((state) => state.reviews);

  const reviewsArr = Object.values(reviewList);

  if (reviewList && reviewsArr)
    return (
      <>
        {reviewList && (
          <div id="wrapper">
            <div id="my-spots-header">
              <div>
                <Link to={`/userSpots`}>
                  <button>My Listings</button>
                </Link>
              </div>
            </div>
            <div id="my-newSpots-header">
              <div>
                <Link to={`/spots`}>
                  <button>Host your Property</button>
                </Link>
              </div>
            </div>
            <div id="my-reviews-header">
              <h1>My Reviews</h1>
            </div>
            <div id="my-reviews-container">
              <div id="myReviews" key="myreviews">
                {reviewList &&
                  reviewsArr.map((review) => (
                    <div id="review" key={review.id}>
                      <div id="spot-name">
                        <Link to={`/spots/${review.spotId}`}>
                          <p>Review ID# {review.id}</p>
                        </Link>
                      </div>

                      <div>
                        <i className="fa-regular fa-star"> </i>
                        {review.stars}
                      </div>

                      <div>{review.review}</div>
                      <div id="updated-at">
                        Updated At: {review.updatedAt.slice(0, 10)}
                      </div>
                      <div id="created-at">
                        Updated At: {review.createdAt.slice(0, 10)}
                      </div>

                      <div id="edit-container">
                        <Link to={`/review-edit/${review.id}`}>
                          <button>Edit</button>
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </>
    );
};

export default UserReviews;
