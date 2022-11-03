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
    const spotsArr = async () => await dispatch(spotActions.getAllSpots());
    const myReviews = async () =>
      await dispatch(reviewActions.getAllReviews(spotId));
    const render = async () => dispatch(reviewActions.renderReviews());

    spotsArr();
    render();
    myReviews();
  }, [dispatch, spotId]);

  let spot = useSelector((state) => state.spots[spotId]);
  let currentUser = useSelector((state) => state.session.user);

  const reviewList = useSelector((state) => state.reviews);
  const reviewsArr = Object.values(reviewList);

  let options;
  if (currentUser !== null && spot) {
    options = (
      <>
        <div>
          <Link to={`/spot-edit/${spot?.id}`}>
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
            <Link to={`/`}>
              <button>Return to Listings</button>
            </Link>
          </div>
          <div>
            <h2 id="spot-name">{spot?.name}</h2>
          </div>
          <div>
            {spot && spot.spotImages.length > 0 ? (
              spot.spotImages.map((image, i) => (
                <div className="img-container" key={i}>
                  <img className="spot-img" src={image?.url} alt={spot?.name} />
                </div>
              ))
            ) : (
              <p>No Images Found</p>
            )}
          </div>

            <>
              <div>⭐ {spot.avgRating}</div>
              <div>{spot.address}</div>
              <div>
                {spot.city}, {spot.state}
              </div>
              <div id="description">{spot.description}</div>
              <div>${spot.price} per night</div>
            </>
          
        </div>
        {currentUser && spot?.ownerId === currentUser?.user?.id && (
          <div>{options}</div>
        )}
        {reviewsArr.length > 0 && (
          <div id="reviews">
            <SpotReviews locationId={spotId} />
          </div>
        )}
        <div>
          <Link to={`/spots/${spotId}/reviews`}>
            <button>Add a Review</button>
          </Link>
        </div>
      </>
    );
};

export default SpotDetail;
