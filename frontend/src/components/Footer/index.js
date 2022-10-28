import "./Footer.css";
import React from "react";

const Footer = () => {
  return (
    <div className="footer_container">
      <a className="footer_link" href="https://github.com/alexh205">
        <i className="github"></i>
        About
      </a>
      <a
        className="footer--links"
        href="https://github.com/alexh205/Airbnb_clone_Project"
      >
        <i className="footer_about"></i>
        GitHub
      </a>
    </div>
  );
};

export default Footer;
