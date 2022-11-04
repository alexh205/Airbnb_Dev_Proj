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
    // const spotsArr = async () => await dispatch(spotActions.getAllSpots());
    // const myReviews = async () =>
    //   await dispatch(reviewActions.getAllReviews(spotId));
    // const render = async () => dispatch(reviewActions.renderReviews());

    dispatch(reviewActions.renderReviews());
    dispatch(reviewActions.getAllReviews(spotId));

    // spotsArr();
    // render();
    // myReviews();
  }, [dispatch]);

  let spot = useSelector((state) => state.spots[spotId]);
  // console.log(spot);
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
              try {
                dispatch(spotActions.deleteSpotById(spotId));
                history.push("/");
                // dispatch(spotActions.getAllSpots());
              } catch (res) {
                setErrors([]);
                const data = res.json();
                if (data && data.message) setErrors(data.errors);
              }
            }}
          >
            Delete Listing
          </button>
        </div>
      </>
    );
  }

  if (spot)
    return (
      <>
        <div>

          <div>
            <h2 id="spot-name">{spot?.name}</h2>
          </div>
          <div id="img-holder">
            <div id="previewImage-container">
              <img id="previewImage" src={spot.previewImage} />
            </div>
            <div className="spotImages-div">
              {spot && spot.spotImages.length > 0 ? (
                spot.spotImages.map((image, i) => (
                  <div className="img-container" key={i}>
                    <img
                      className="spot-img"
                      src={image?.url}
                      alt={spot?.name}
                    />
                  </div>
                ))
              ) : (
                <p>No Images Found</p>
              )}
            </div>
          </div>
          <div>{spot.address}</div>
          <div>
            ⭐ {spot.avgRating} · {reviewsArr.length} reviews</div>

          <div>
            {spot.city}, {spot.state}
          </div>
          <div id="description">{spot.description}</div>
          <div>${spot.price} per night</div>
        </div>
        {currentUser && spot?.ownerId === currentUser?.id && (
          <div>{options}</div>
        )}

        {reviewsArr.length > 0 && (
          <div id="reviews">
            <SpotReviews locationId={spotId} />
          </div>
        )}
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
