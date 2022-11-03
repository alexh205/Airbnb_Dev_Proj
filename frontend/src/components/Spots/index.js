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

  const currnUser = useSelector((state) => state.session.user);
  const spotsList = useSelector((state) => state.spots);
  if (spotsList) spots = Object.values(spotsList);

  if (spots)
    return (
      <>
        <div>
          <div>
            {currnUser !== null && (
              <div>
                <Link to={"/spots"}>
                  <button>Host your Property</button>
                </Link>
              </div>
            )}
          </div>
          {spots.map((spot) => (
            <div key={spot.id} className="listings">
              <div className="listings_item">
                <div className="listings_image">
                  <Link to={`/spots/${spot.id}`}>
                    <img id="images" src={spot.previewImage} alt={spot.name} />
                  </Link>
                </div>
                <div className="listings_content">
                  <div className="listings_name">
                    <div className="listings_icon_text">
                      <span>{spot.name}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div>{spot.city + ", " + spot.state}</div>
                  <div id="avgRating">⭐ {spot.avgRating}</div>
                  <div id="listingPrice">${spot.price} night</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
};

export default SpotsPage;
