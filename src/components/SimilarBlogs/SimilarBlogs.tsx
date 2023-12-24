import React from "react";
import "./SimilarBlogs.scss";

export const SimilarBlogs = () => {
  return (
    <div className="similarBlogs-wrapper">
      <div className="similarBlogs">
        <div className="similarBlogs__headerArrows">
          <h2>მსგავსი სტატიები</h2>
          <div className="arrows">
            <img src="assets/svg/arrow-left.svg" alt="left" />
            <img src="assets/svg/arrow-left.svg" alt="right" />
            <span>skdo</span>
          </div>
        </div>
        <div className="similarBlogs__list">
          
        </div>
      </div>
    </div>
  );
};
