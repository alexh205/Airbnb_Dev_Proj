import React, { useEffect, useState } from "react";
import * as spotActions from "../../store/spots";
import * as reviewActions from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import "./UserSpots.css";

const UserSpots = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);

  useEffect(() => {}, [dispatch]);

  let currentUser = useSelector((state) => state.session.user);

  let allSpots = useSelector((state) => state.spots);
  allSpots = Object.values(allSpots);

  let listings = [];
  if (allSpots)
    allSpots.forEach((spot) => {
      if (spot.ownerId === currentUser.user.id) listings.push(spot);
    });

  return (
    <>
      <div>
        <Link to={"/spots"}>
          <button>Host your Property</button>
        </Link>
      </div>
      <div>
        <div>
          <Link to={`/reviews/user`}>
            <button>My Reviews</button>
          </Link>
        </div>
      </div>
      <div>
        <Link to={"/"}>
          <button>Return to Listing</button>
        </Link>
      </div>
      {listings && (
        <div>
          <div>
            <h1>My Listings</h1>
          </div>

          {listings.map((spot, i) => (
            <div key={i}>
              <div>
                <h2 id="spot-name">{spot?.name}</h2>
              </div>
              <div id="img-container">
                <img src={spot.previewImage} />
              </div>
              <div>⭐ {spot?.avgRating}</div>
              <div>{spot?.address}</div>
              <div>
                {spot?.city}, {spot?.state}
              </div>
              <div id="description">{spot?.description}</div>
              <div>${spot?.price} per night</div>
              <div>
                <Link to={`/spot-edit/${spot.id}`}>
                  <button>Edit Listing</button>
                </Link>
              </div>
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    try {
                      dispatch(spotActions.deleteSpotById(spot.id));
                      history.push("/userSpots");
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
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserSpots;
