import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import * as reviewActions from "../../store/reviews";
import * as spotActions from "../../store/spots";
import SpotReviews from "../Reviews/SpotReviews";

import "./SpotDetail.css";

const SpotDetail = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(reviewActions.renderReviews());
    dispatch(reviewActions.getAllReviews(spotId));
  }, [dispatch]);

  let spot = useSelector((state) => state.spots[spotId]);

  let currentUser = useSelector((state) => state.session.user);

  const reviewList = useSelector((state) => state.reviews);
  const reviewsArr = Object.values(reviewList);

  let options;
  if (currentUser !== null && spot) {
    options = (
      <>
        <div>
          <Link target="_blank" to={`/spot-edit/${spotId}`}>
            <button>Edit Listing</button>
          </Link>
        </div>
        <div>
          <button
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
      </>
    );
  }

  if (!spot) return <p>...No Listing Found!</p>;

  if (spot)
    return (
      <>
        <div>
          <div></div>
          <b></b>
          <h2 id="spot-name">{spot.name}</h2>
          <div className="inner-div">
            <b>
              <p id="description">
                ⭐ {spot.avgRating} · {reviewsArr.length} reviews
              </p>
            </b>
            <b>
              <p id="description">
                {spot.city}, {spot.state}, {spot.country}
              </p>
            </b>
          </div>
          <div id="img-holder">
            <div id="previewImage-container">
              <img id="previewImage" src={spot.previewImage} />
            </div>
            {spot && spot.spotImages.length > 0 ? (
              spot.spotImages.map((image, i) => (
                <div className="img-container" key={i}>
                  <img className="spot-img" src={image.url} alt={spot.name} />
                </div>
              ))
            ) : (
              <p>No Images Found</p>
            )}
          </div>
          <div className="spot-details-container">
            <p id="description">{spot.description}</p>
            <h3 id="description">
              <b>${spot.price}</b> night
            </h3>
          </div>
        </div>
        {currentUser && spot.ownerId === currentUser.id && <div>{options}</div>}
        <div className="userReviews-container">
          {reviewsArr && reviewsArr.length > 0 ? (
            <div id="reviews">
              <SpotReviews locationId={spotId} />
            </div>
          ) : (
            <p>No Reviews Found</p>
          )}
        </div>
        {currentUser &&
          currentUser !== null &&
          currentUser.id !== spot.ownerId && (
            <div>
              <Link to={`/spots/${spotId}/reviews`}>
                <button>Add a Review</button>
              </Link>
            </div>
          )}
      </>
    );
};

export default SpotDetail;
