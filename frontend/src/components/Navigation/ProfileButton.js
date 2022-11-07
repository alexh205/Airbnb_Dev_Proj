import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";

import "./ProfileButton.css";
import ProfileImg from "../../images/profile.png";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  let Listings = (
    <>
      <div>
        <div>
          <Link to={`/userSpots`}>My Listings</Link>
        </div>
      </div>
    </>
  );

  let Reviews = (
    <>
      <div>
        <div>
          <Link to={`/reviews/user`}>My Reviews</Link>
        </div>
      </div>
    </>
  );

  let NewListing = (
    <>
      <div>
        <div>
          <Link to={`/spots`}>Host your Property</Link>
        </div>
      </div>
    </>
  );

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  if (user)
    return (
      <>
        <div
          className="dropdown"
          id="border-container"
          style={{ borderRadius: "6px" }}
        >
          <button
            style={{ borderRadius: "6px" }}
            onClick={openMenu}
            className="dropbtn"
            id="dropdown-content"
          >
            <img style={{ borderRadius: "6px" }} src={ProfileImg}></img>
          </button>
          {showMenu && (
            <div className="profile-dropdown">
              <div>
                <label style={{ borderBottom: "1px solid black" }}>
                  Current User:
                  <p
                    className="text"
                    style={{ fontWeight: "bold", color: "blue" }}
                  >
                    {user.username}
                  </p>
                </label>
              </div>
              <div>
                <div className="inner-components">{Listings}</div>
                <div className="inner-components">{Reviews}</div>
                <div className="inner-components">{NewListing}</div>
              </div>

              <div>
                <button
                  style={{
                    backgroundColor: "darkslategray",
                    borderRadius: "6px",
                    color: "white",
                  }}
                  onClick={(e) => {
                    logout(e);
                    history.push("/");
                  }}
                  id="logout-button"
                >
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </>
    );
}

export default ProfileButton;
