import React from 'react'
import "./SuccessPost.scss"

export const SuccessPost = () => {
  return (
    <div className="successPost-wrapper">
      <div className="successPost">
        <div className="success-icon" style={{ display: "flex" }}>
          <img src="assets/svg/success.svg" alt="success" />
        </div>
        <h3>ჩანაწერი წარმატებით დაემატა</h3>
        <button>მთავარ გვერდზე დაბრუნება</button>
      </div>
      <img
        src="assets/svg/close.svg"
        alt="close"
        className="close-button"
      />
    </div>
  )
}
