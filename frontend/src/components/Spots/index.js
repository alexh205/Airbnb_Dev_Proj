import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as spotActions from "../../store/spots";
import "./Spots.css";

const SpotsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(spotActions.getAllSpots());
  }, [dispatch]);
  const spotsList = useSelector((state) => state.spots);
  const allSpots = Object.values(spotsList);


  return (
    <div>
      {allSpots.map((spot) => (
        <div id="spot" key={spot.id}>
          <img src={spot.previewImage} alt={spot.name}></img>
          <div>
            <Link to={`/spots/${spot.id}`}>{spot.name}</Link>
          </div>
          <div>{spot.address}</div>
          <div>{spot.city + ", " + spot.state}</div>
          <div>${spot.price} per night</div>
          <div>{spot.avgRating}</div>
        </div>
      ))}
    </div>
  );
};

export default SpotsPage;
