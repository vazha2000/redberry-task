import React from "react";
import "./Navbar.scss";

export const Navbar = () => {
  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        <div className="navbar__logo">
          <img src="assets/images/logo.png" alt="logo" />
        </div>
        <div className="navbar__buttons">
          <button>შესვლა</button>
        </div>
      </nav>
    </div>
  );
};
