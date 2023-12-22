import React, { useRef, useState } from "react";
import "./AddBlog.scss";

export const AddBlog = () => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const calendarRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const handleTextClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCalendarClick = () => {
    if (calendarRef.current) {
      calendarRef.current.click();
    }
  };
  return (
    <div className="addBlog-wrapper">
      <div className="addBlog">
        <h1>ბლოგის დამატება</h1>
        <form className="addBlog__form">
          <div className="upload-container">
            <label>ატვირთეთ ფოტო</label>
            <div className="upload">
              <div style={{display: "flex"}}>
                <img src="assets/svg/folder-add.svg" alt="add file" />
              </div>
              <div>
                <p>
                  ჩააგდეთ ფაილი აქ ან{" "}
                  <span
                    style={{ textDecoration: "underline" }}
                    onClick={handleTextClick}
                  >
                    აირჩიეთ ფაილი
                  </span>
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </div>
          <div className="titleAuthor-container">
            <div className="author">
              <label>ავტორი *</label>
              <input type="text" placeholder="შეიყვანეთ ავტორი" />
              <ul className="author__list">
                <li>მინიმუმ 4 სიმბოლო</li>
                <li>მინიმუმ ორი სიტყვა</li>
                <li>მხოლოდ ქართული სიმბოლოები</li>
              </ul>
            </div>
            <div className="title">
              <label>სათაური *</label>
              <input type="text" placeholder="შეიყვანეთ სათაური" />
              <ul>
                <li>მინიმუმ ორი სიმბოლო</li>
              </ul>
            </div>
          </div>
          <div className="description-container">
            <label>აღწერა *</label>
            <textarea
              placeholder="შეიყვანეთ აღწერა"
              className="description-content"
            ></textarea>
            <p>მინიმუმ 4 სიმბოლო</p>
          </div>
          <div className="calendarCategory">
            <div className="calendar-container">
              <label>გამოქვეყნების თარიღი *</label>
              <div className="calendar" onClick={handleCalendarClick}>
                <div className="calendar__icon">
                  <img src="assets/svg/calendar.svg" alt="calendar" />
                </div>
                <span>12/22/2023</span>
                <input
                  ref={calendarRef}
                  type="date"
                  id="calendar"
                  name="calendar"
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <div className="category-container">
              <label>კატეგორია</label>
              <div className="category-list-container">
                <ul className="category-list"></ul>
              </div>
            </div>
          </div>
          <div className="email-container">
            <label>ელ-ფოსტა *</label>
            <input type="text" />
          </div>
        </form>
      </div>
    </div>
  );
};
