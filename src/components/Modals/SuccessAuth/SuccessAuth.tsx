import React from "react";
import "./SuccessAuth.scss";

type TSuccessAuthProps = {
  setIsLoginClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SuccessAuth = ({ setIsLoginClicked }: TSuccessAuthProps) => {
  return (
    <div className="successAuth-wrapper">
      <div className="successAuth">
        <div className="success-icon" style={{ display: "flex" }}>
          <img src="assets/svg/success.svg" alt="success" />
        </div>
        <h3>წარმატებული ავტორიზაცია</h3>
        <button>კარგი</button>
      </div>
      <img
        src="assets/svg/close.svg"
        alt="close"
        className="close-button"
        onClick={() => setIsLoginClicked(false)}
      />
    </div>
  );
};
