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

  useEffect(() => {
    dispatch(spotActions.getAllSpots());

    dispatch(reviewActions.renderReviews());
  }, [dispatch]);

  const spotsList = useSelector((state) => state.spots);
  if (spotsList) spots = Object.values(spotsList);

  if (spots)
    return (
      <>
        <div className="wrapper">
          <div className="content">
            {spots.map((spot) => (
              <div key={spot.id} className="panel">
                <Link to={`/spots/${spot.id}`}>
                  {spot.previewImage && spot.previewImage !== null ? (
                    <img
                      className="panel-img"
                      src={spot.previewImage}
                      alt={spot.name}
                    />
                  ) : (
                    <p>
                      <b>No Image Available</b>
                    </p>
                  )}
                </Link>
                <span className="panel-title">
                  <Link to={`/spots/${spot.id}`}
                    style={{ textDecoration: "none" }}>
                    <p className="details" id="address-para">
                      {spot.city + ", " + spot.state + ", " + spot.country}
                    </p>
                  </Link>
                  <p className="details" id="rating-para">
                    ⭐ {spot.avgRating}
                  </p>
                  <p className="details" id="price">
                    ${spot.price} night
                  </p>
                </span>
              </div>
            ))}
          </div>
        </div>
      </>
    );
};

export default SpotsPage;
