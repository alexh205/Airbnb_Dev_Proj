import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as reviewActions from "../../store/reviews";
import "./UserReviews.css";

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
          <div className="wrapper">
            <div className="myReviews-header">
              <Link to={`/`}>
                <button className="button-reviews">Home Page</button>
              </Link>
              <Link to={`/userSpots`}>
                <button className="button-reviews">My Listings</button>
              </Link>
              <Link to={`/spots`}>
                <button className="button-reviews">Host your Property</button>
              </Link>
            </div>
            <div id="my-spots-header">
              <div
                id="my-reviews-header"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: '200px'
                }}
              >
                <h1>My Reviews</h1>
              </div>
            </div>

            <div className="myReviews-container">
              {reviewList &&
                reviewsArr.map((review) => (
                  <div className="review-spots" key={review.id}>
                    <div className="spot-name">
                      {review && review.Spot?.name && (
                        <Link to={`/spots/${review.spotId}`}>
                          <p style={{ fontSize: "20px", overflow: "auto" }}>
                            Spot - {review.Spot.name}
                          </p>
                        </Link>
                      )}
                    </div>

                    <div style={{ overflow: "auto", paddingBottom: "4px" }}>
                      <i> </i>⭐ {review.stars}
                    </div>

                    <div style={{ overflow: "auto", paddingBottom: "4px" }}>
                      <i style={{ fontWeight: "bold", fontSize: "20px" , color: 'blue'}}>
                        Review:{" "}
                      </i>{" "}
                      "{review.review}"
                    </div>
                    <div style={{ overflow: "auto", padding: "4px" }}>
                      Updated At: {review.updatedAt.slice(0, 10)}
                    </div>
                    <div style={{ overflow: "auto", padding: "4px" }}>
                      Created on: {review.createdAt.slice(0, 10)}
                    </div>

                    <div id="edit-container">
                      <Link to={`/review-edit/${review.id}`}>
                        <button
                          style={{
                            backgroundColor: "rgb(15, 174, 31)",
                            color: "white",
                            fontWeight: "bold",
                          }}
                        >
                          Edit
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </>
    );
};

export default UserReviews;
