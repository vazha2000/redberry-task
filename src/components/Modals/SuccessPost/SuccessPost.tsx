import React from 'react'
import "./SuccessPost.scss"
import { useNavigate } from 'react-router-dom'

type TSuccessPostProps = {
  setPostSuccess: React.Dispatch<React.SetStateAction<boolean>>;
};
export const SuccessPost = ({setPostSuccess}: TSuccessPostProps) => {
  const navigate = useNavigate();
  return (
    <div className="successPost-wrapper">
      <div className="successPost">
        <div className="success-icon" style={{ display: "flex" }}>
          <img src="assets/svg/success.svg" alt="success" />
        </div>
        <h3>ჩანაწერი წარმატებით დაემატა</h3>
        <button onClick={() => {navigate("/"); setPostSuccess(false)}}>მთავარ გვერდზე დაბრუნება</button>
      </div>
      <img
        src="assets/svg/close.svg"
        alt="close"
        className="close-button"
        onClick={() => {navigate("/"); setPostSuccess(false)}}
      />
    </div>
  )
}
