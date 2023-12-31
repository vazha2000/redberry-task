import React, { useState } from "react";
import "./Navbar.scss";
import { Login } from "../Modals/Login";
import { Overlay } from "../Overlay";
import { SuccessAuth } from "../Modals/SuccessAuth";
import { useAuth } from "../../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [isLoginClicked, setIsLoginClicked] = useState(false);

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="navbar-wrapper">
      {location.pathname === "/add-blog" ? (
        <nav className={`navbar ${location.pathname === "/add-blog" && "blog"}`}>
          <div className="navbar__logo">
            <Link to="/">
              <img src="assets/images/logo.png" alt="logo" />
            </Link>
          </div>
        </nav>
      ) : (
        <>
          <nav className="navbar">
            <div className="navbar__logo">
              <Link to="/">
                <img src="assets/images/logo.png" alt="logo" />
              </Link>
            </div>
            <div className="navbar__buttons">
              {/* {!isLoggedIn && (
          )} */}
              {isLoggedIn ? (
                <button onClick={() => navigate("/add-blog")}>
                  დაამატე ბლოგი
                </button>
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

              {isLoggedIn && (
                <SuccessAuth setIsLoginClicked={setIsLoginClicked} />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
