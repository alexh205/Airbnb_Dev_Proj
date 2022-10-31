import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";

import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormPage/SignupFormModal";
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

  const openSpots = () => {
    history.push("/userSpots");
  };
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    setShowMenu(false);
    history.push("/");
  };

  // let sessionLinks;

  // if (user) {
  //   sessionLinks = (
  //     <div className="user-links" onClick={(e) => e.stopPropagation()}>
  //       <div className="user-links--container">
  //         <NavLink id="user-nav-link" to="/profile">
  //           Profile
  //         </NavLink>
  //       </div>
  //       <div className="user-links--container">
  //         <NavLink id="user-nav-link" to="/profile/spots">
  //           Listings
  //         </NavLink>
  //       </div>
  //       <div className="user-links--container">
  //         <NavLink id="user-nav-link" to="#" onClick={logout}>
  //           Log Out
  //         </NavLink>
  //       </div>
  //     </div>
  //   );
  // } else {
  //   sessionLinks = (
  //     <div className="guest-links" onClick={(e) => e.stopPropagation()}>
  //       <div>
  //         <LoginFormModal />
  //       </div>
  //       <div>
  //         <SignupFormModal />
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      <button onClick={openMenu}>
        <img src={ProfileImg} alt="profile-img" id="profile-toggle" />

        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
            <div className="user-spots--container">
              <button id="user-spot-link" to="#" onClick={openSpots}>
                Spots
              </button>
            </div>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
