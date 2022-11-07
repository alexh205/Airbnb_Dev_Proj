import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import * as reviewActions from "../../store/reviews";
import * as spotActions from "../../store/spots";
import SpotReviews from "../Reviews/SpotReviews";
import SpotTitle from "./SpotTitle";
import SingleSpotImages from "./SpotImages";

import "./SpotDetail.css";

const SpotDetail = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(reviewActions.renderReviews());
    dispatch(reviewActions.getAllReviews(spotId));
  }, [dispatch]);

  let spot = useSelector((state) => state.spots[spotId]);

  let currentUser = useSelector((state) => state.session.user);

  const reviewsObj = useSelector((state) => state.reviews);
  const reviewsArr = Object.values(reviewsObj);

  let userReviews = [];
  if (currentUser !== null) {
    reviewsArr.map((review) => {
      if (review.userId === currentUser.id) {
        userReviews.push(review);
      }
    });
  }

  let options;
  if (currentUser !== null && spot && currentUser.id === spot.ownerId) {
    options = (
      <>
        <div className="userEdit-button">
          <div>
            <Link to={`/spot-edit/${spotId}`}>
              <button
                style={{
                  "background-color": "rgb(43, 226, 208)",
                  "font-weight": "bold",
                  color: "black",
                  marginRight: "4px",
                  padding: "4px",
                }}
              >
                Edit Listing
              </button>
            </Link>
          </div>
          <div>
            <button
              style={{
                "background-color": "rgb(165, 2, 2)",
                "font-weight": "bold",
                color: "white",
                padding: "4px",
              }}
              onClick={(e) => {
                e.preventDefault();

                dispatch(spotActions.deleteSpotById(spotId));
                history.push("/");
                dispatch(spotActions.getAllSpots());
              }}
            >
              Delete Listing
            </button>
          </div>
        </div>
      </>
    );
  }

  if (!spot) return <p>...No Listing Found!</p>;

  if (spot)
    return (
      <>
        <div className="spot-container">
          <div className="singleSpot-container">
            <div className="spot-name-container">
              <SpotTitle spot={spot} reviewsArr={reviewsArr} />
            </div>
            <div className="owner-button">{options}</div>
            <div className="images-container">
              <SingleSpotImages spot={spot} />
            </div>
          </div>
        </div>
        <h2
          style={{
            display: "flex",
            marginLeft: "28vw",
            fontSize: "28px",
          }}
        >
          Reviews
        </h2>
        <div className="spot-reviews">
          <SpotReviews
            spotId={spotId}
            reviewsArr={reviewsArr}
            currentUser={currentUser}
          />
        </div>
        <div className="review-button">
          {currentUser &&
            currentUser !== null &&
            currentUser.id !== spot.ownerId &&
            userReviews.length < 1 && (
              <div>
                <Link to={`/spots/${spotId}/reviews`}>
                  <button
                    style={{
                      backgroundColor: "rgb(35, 58, 135)",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    Add a Review
                  </button>
                </Link>
              </div>
            )}
        </div>
      </>
    );
};

export default SpotDetail;
