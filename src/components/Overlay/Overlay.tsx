import React from "react";
import "./Overlay.scss";

type TOverlayProps = {
  setIsLoginClicked?: React.Dispatch<React.SetStateAction<boolean>>;
};
export const Overlay = ({ setIsLoginClicked }: TOverlayProps) => {
  return (
    <div className="overlay" onClick={() => setIsLoginClicked?.(false)}>
      
    </div>
  );
};
