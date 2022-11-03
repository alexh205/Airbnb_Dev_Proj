import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink, Link } from "react-router-dom";
import * as sessionActions from "../../store/session";

import "./ProfileButton.css";
import ProfileImg from "../../images/profile.png";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const sessionUser = async () => {
      await dispatch(sessionActions.restoreUser());

      sessionUser();
    };
  }, [dispatch]);

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
    setShowMenu(false);
  };

  const currUser = useSelector((state) => state.session);
  let userInfo = currUser.user.user;

  if (currUser && currUser.user) userInfo = currUser.user.user;
  return (
    <>
      <div>
        <button onClick={openMenu}>
          <img src={ProfileImg} alt="profile-img" id="profile-toggle" />

          <i className="fas fa-user-circle" />
          <p>{userInfo?.username}</p>
        </button>

        {showMenu && (
          <div className="profile-dropdown">
            <div>
              <label>
                Username:
                <b>
                  <i> {userInfo?.username}</i>
                </b>
              </label>
            </div>
            <div>
              <label>
                Email:
                <b>
                  <i> {userInfo?.email}</i>
                </b>
              </label>
            </div>
            <div>
              <div>{Listings}</div>
              <div>{NewListing}</div>
              <div>{Reviews}</div>
            </div>

            <div>
              <button onClick={logout}>Log Out</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
