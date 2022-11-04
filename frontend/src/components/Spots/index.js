import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as spotActions from "../../store/spots";
import * as sessionActions from "../../store/session";
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
  }, [dispatch]);

  const spotsList = useSelector((state) => state.spots);
  if (spotsList) spots = Object.values(spotsList);

  if (spots)
    return (
      <>
        <div id="main-container">
          {spots.map((spot) => (
            <div key={spot.id} className="listings">
              <div className="listings_item">
                <div
                  className="listings_image"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Link to={`/spots/${spot.id}`}>
                    {spot.previewImage && spot.previewImage !== null ? (
                      <img
                        id="images"
                        src={spot.previewImage}
                        alt={spot.name}
                      />
                    ) : (
                      <p>
                        <b>No Image Available</b>
                      </p>
                    )}
                  </Link>
                </div>
                <div
                  className="listings_content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Link to={`/spots/${spot.id}`}>
                    <p className="details">{spot.name}</p>
                  </Link>
                </div>
                <div>
                  <p className="details">{spot.city + ", " + spot.state}</p>
                  <p className="details"> ⭐ {spot.avgRating}</p>
                  <p className="details"> ${spot.price} night</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
};

export default SpotsPage;
