import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import "./Spots.css";

const SpotsPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);
  const spotsList = useSelector((state) => state.spots);
  const allSpots = Object.values(spotsList);

  return (
    <div>
      {allSpots.map((spot) => (
        <div id="spot" key={spot.id}>
          <img src={spot.previewImage} alt={spot.name}></img>
          <div>
            <i className="values"></i>
            {Number(spot.avgRating)}
          </div>
          <div>
            <Link to={`/spots/${spot.id}`}>{spot.name}</Link>
          </div>
          <span>{spot.address}</span>
          <span>{spot.city + ", " + spot.state}</span>
          <span>${spot.price} per night</span>
        </div>
      ))}
    </div>
  );
};

export default SpotsPage;
