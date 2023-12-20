import React from "react";
import "./Login.scss";

export const Login = () => {
  return (
    <div className="login-wrapper">
      <div className="login">
        <h2>შესვლა</h2>
        <form>
          <div className="login__email-container">
            <label>ელ-ფოსტა</label>
            <input type="text" placeholder="Example@redberry.ge" />
          </div>
          <button>შესვლა</button>
        </form>
      </div>
      <img src="assets/svg/close.svg" alt="close" className="close-button" />
    </div>
  );
};