import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormPage/SignupFormModal";
import logo from "../../images/Airbnb-Logo.png";

import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <div id="menu-container">
          <div id="menu-toggle">
            <ProfileButton user={sessionUser} />
          </div>
        </div>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <div className="modal-container">
          <div className="modal-inner-div">
            <LoginFormModal />
          </div>
          <div className="modal-inner-div">
            <SignupFormModal />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="header">
        <div>
          <Link to="/" className="home-container">
            <div id="img-container">
              <img src={logo} alt="profile-img" id="logo-img" />
            </div>
          </Link>
        </div>
        <div className="header-right">
          <div id="menu-container">
            <div>{isLoaded && sessionLinks}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;
