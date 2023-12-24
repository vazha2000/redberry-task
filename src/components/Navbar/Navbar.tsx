import React, { useState } from "react";
import "./Navbar.scss";
import { Login } from "../Modals/Login";
import { Overlay } from "../Overlay";
import { SuccessAuth } from "../Modals/SuccessAuth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [isLoginClicked, setIsLoginClicked] = useState(false);

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        <div className="navbar__logo">
          <img src="assets/images/logo.png" alt="logo" />
        </div>
        <div className="navbar__buttons">
          {/* {!isLoggedIn && (
          )} */}
          {isLoggedIn ? (
            <button onClick={() => navigate("/add-blog")}>დაამატე ბლოგი</button>
          ) : (
            <button onClick={() => setIsLoginClicked(true)}>შესვლა</button>
          )}
        </div>
      </nav>
      {isLoginClicked && (
        <>
          <Overlay setIsLoginClicked={setIsLoginClicked} />
          {!isLoggedIn && (
            <Login
              isLoginClicked={isLoginClicked}
              setIsLoginClicked={setIsLoginClicked}
            />
          )}

          {isLoggedIn && <SuccessAuth setIsLoginClicked={setIsLoginClicked} />}
        </>
      )}
    </div>
  );
};
