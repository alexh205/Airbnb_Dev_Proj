import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className="header">
      <div className="header-left">
        <Link to="/">
          <img
            src="https://hospitalitydesign.com/wp-content/uploads/Airbnb-logo.png"
            alt="airbnb-logo"
            id="logo-img"
          />
        </Link>
      </div>

      <div className="home-container">
        
        <div className="logIn-signUp">{isLoaded && sessionLinks}</div>
      </div>
    </div>
  );
}

export default Navigation;
