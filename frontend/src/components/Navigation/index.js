import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormPage/SignupFormModal";
import ProfileImg from "../../images/profile.png";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [isOpen, setIsOpen] = useState(false);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <>
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
        <div className="collapsible">
          <button className="toggle" onClick={() => setIsOpen(!isOpen)}>
            <div className="toggle-container">
              <img src={ProfileImg} alt="profile-img" id="menu-toggle" />{" "}
            </div>
          </button>
          {isOpen &&
            ((<div className="toggle">{isLoaded}</div>),
            (<div className="toggle">{sessionLinks}</div>))}
        </div>
      </div>
      <div className="bottom-footer"></div>
    </>
  );
}

export default Navigation;
