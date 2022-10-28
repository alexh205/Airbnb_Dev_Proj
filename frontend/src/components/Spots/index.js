import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as spotActions from "../../store/spots";
import "./Spots.css";

const SpotsPage = () => {
  const dispatch = useDispatch();
  let spots;
  useEffect(() => {
    dispatch(spotActions.getAllSpots());
  }, [dispatch]);
  
  const spotsList = useSelector((state) => state.spots);
  if (spotsList) spots = Object.values(spotsList);

  // const allSpots = Object.values(spotsList);
  // console.log(spotsList)

  if (spots)
    return (
      <div>
        {spots.map((spot) => (
          <div key={spot.id} className="listings">
            <div className="listings_item">
              <div className="listings_image">
                <Link to={`/spots/${spot.id}`}>
                  <img
                    id="images"
                    src={spot.previewImage.url}
                    alt={spot.name}
                  />
                </Link>
              </div>
              <div className="listings_content">
                <div className="listings_name">
                  <div className="listings_icon_text">
                    <span>{spot.name}</span>
                  </div>
                </div>
              </div>
              <div className="spacer"></div>
              <div>{spot.city + ", " + spot.state}</div>
              <div id="avgRating">★ {spot.avgRating}</div>
              <div id="listingPrice">${spot.price} night</div>
            </div>
          </div>
        ))}
      </div>
    );
};

export default SpotsPage;
