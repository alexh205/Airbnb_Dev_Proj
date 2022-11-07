import React, { useEffect, useState } from "react";
import * as spotActions from "../../store/spots";
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
  if (allSpots && currentUser)
    allSpots.forEach((spot) => {
      if (spot.ownerId === currentUser.id) listings.push(spot);
    });

  if (!listings.length)
    return (
      <>
        <div className="user-wrapper">
          <div>
            <Link to={`/reviews/user`}>
              <button>My Reviews</button>
            </Link>
          </div>
          <div>
            <Link to={"/spots"}>
              <button>Host your Property</button>
            </Link>
          </div>
        </div>
        <p>No Listings Found for the Current User</p>
      </>
    );
  if (currentUser) {
    return (
      <>
        <div className="button-holder ">
          <Link to={`/`}>
            <button className="button-spots">Home Page</button>
          </Link>
          <Link to={`/reviews/user`}>
            <button className="button-spots">My Reviews</button>
          </Link>
          <Link to={"/spots"}>
            <button className="button-spots">Host your Property</button>
          </Link>
        </div>

        {listings && (
          <div>
            <div
              id="header-text"
              style={{
                fontSize: "23px",
                display: "flex",
                borderBottom: "1px solid black",
                marginLeft: "300px",
                marginRight: "300px",
              }}
            >
              <h1
                style={{
                  marginLeft: "23vw",
                  paddingBottom: "3px",
                  color: "blue",
                }}
              >
                My Listings
              </h1>
            </div>
            <div className="spots-container">
              {listings.map((spot, i) => (
                <div key={i} className="image-container">
                  <div>
                    <h2
                      id="spot-name"
                      style={{ fontSize: "18px", marginLeft: "30px" }}
                    >
                      Name:{" "}
                      <i style={{ color: "green", fontSize: "20px" }}>
                        '{spot?.name}'
                      </i>{" "}
                    </h2>
                  </div>
                  <div id="img-div">
                    <img className="item-img" src={spot.previewImage} />
                  </div>
                  <div className="para-userSpots">⭐ {spot?.avgRating}</div>
                  <div className="para-userSpots">
                    {spot?.city}, {spot?.state}, {spot.country}
                  </div>
                  {/* <div
                    className="para-userSpots"
                    style={{
                      whiteSpace: "nowrap",
                      width: "100px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      border: "1px solid #000000",
                    }}
                  >
                    {spot?.description}
                  </div> */}
                  <div className="para-userSpots">${spot?.price} night</div>
                  <div className="spot_buttons">
                    <Link to={`/spot-edit/${spot.id}`}>
                      <button
                        style={{
                          backgroundColor: "rgb(208, 46, 31)",
                          color: "white",
                          fontWeight: "bold",
                          marginRight: "3px",
                        }}
                      >
                        Edit Listing
                      </button>
                    </Link>

                    <button
                      style={{
                        backgroundColor: "rgb(208, 46, 31)",
                        color: "white",
                        fontWeight: "bold",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        try {
                          dispatch(spotActions.deleteSpotById(spot.id));
                          dispatch(spotActions.getAllSpots());
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
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    );
  } else {
    history.push("/");
  }
};

export default UserSpots;
