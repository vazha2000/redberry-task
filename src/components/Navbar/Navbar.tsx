import React, { useState } from "react";
import "./Navbar.scss";
import { Login } from "../Modals/Login";

export const Navbar = () => {
  const [isLoginClicked, setIsLoginClicked] = useState(false);

  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        <div className="navbar__logo">
          <img src="assets/images/logo.png" alt="logo" />
        </div>
        <div className="navbar__buttons">
          <button onClick={() => setIsLoginClicked(true)}>შესვლა</button>
        </div>
      </nav>
      {isLoginClicked && (
        <Login
          isLoginClicked={isLoginClicked}
          setIsLoginClicked={setIsLoginClicked}
        />
      )}
    </div>
  );
};
