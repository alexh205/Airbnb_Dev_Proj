import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as spotActions from "../../store/spots";
import * as sessionActions from "../../store/session";
import * as reviewActions from "../../store/reviews";
import "./Spots.css";

const SpotsPage = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  let spots;
  let reLoad;
  useEffect(() => {
    reLoad = async () => await dispatch(spotActions.getAllSpots());
    reLoad();
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(reviewActions.renderReviews());
  }, [dispatch]);

  const spotsList = useSelector((state) => state.spots);
  if (spotsList) spots = Object.values(spotsList);

  if (spots)
    return (
      <>
        <div className="main-container">
          {spots.map((spot) => (

            <div key={spot.id} className="listings_item">
              <Link to={`/spots/${spot.id}`}>
                {spot.previewImage && spot.previewImage !== null ? (
                  <img id="images" src={spot.previewImage} alt={spot.name} />
                ) : (
                  <p>
                    <b>No Image Available</b>
                  </p>
                )}
              </Link>
              <span>
                <div className="inner-div">
                  <Link
                    to={`/spots/${spot.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <p className="details" id="address-para">
                      {spot.city + ", " + spot.state + ", " + spot.country}
                    </p>
                  </Link>
                  <p className="details" id="rating-para">
                    
                    ⭐ {spot.avgRating}
                  </p>
                </div>
                <p className="details" id="price">
                  <b>${spot.price}</b> night
                </p>
              </span>
            </div>

          ))}
        </div>
      </>
    );
};

export default SpotsPage;
