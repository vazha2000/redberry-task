import React, { useRef, useState } from "react";
import "./AddBlog.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TCategory } from "../../components/HeroCategories/HeroCategories";
import { useFetch } from "../../utils/useFetch";

export const AddBlog = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isCategoriesClicked, setIsCategoriesClicked] = useState(false);

  const handleTextClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const token =
    "503b1f485c12cc6d3b89177dfc9d0eb81b8d2279dc0c480dedc81a7451657268";
  const url = "https://api.blog.redberryinternship.ge/api/categories";

  const initialCategoriesData: TCategory = {
    data: [
      {
        id: 0,
        title: "",
        text_color: "",
        background_color: "",
      },
    ],
  };

  const [categoriesData, loading] = useFetch<TCategory>(
    url,
    token,
    initialCategoriesData
  );

  return (
    <div className="addBlog-wrapper">
      <div className="addBlog">
        <h1>ბლოგის დამატება</h1>
        <form className="addBlog__form">
          <div className="upload-container">
            <label>ატვირთეთ ფოტო</label>
            <div className="upload">
              <div style={{ display: "flex" }}>
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
              <div className="calendar">
                <div className="calendar__icon">
                  <img src="assets/svg/calendar.svg" alt="calendar" />
                </div>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date: Date) => setSelectedDate(date)}
                />
              </div>
            </div>
            <div
              className="category-container"
              onClick={() => setIsCategoriesClicked(!isCategoriesClicked)}
            >
              <label>კატეგორია</label>
              <div className="category-list-container">
                {isCategoriesClicked && (
                  <ul className="category-list">
                    {categoriesData.data.map((item) => (
                      <li
                        key={item.id}
                        className="category-list__item"
                        style={{
                          color: item.text_color,
                          background: item.background_color,
                        }}
                      >
                        {item.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className="email-container">
            <label>ელ-ფოსტა *</label>
            <input type="text" />
          </div>
          <div className="submit-button">
            <button>გამოქვეყნება</button>
          </div>
        </form>
      </div>
    </div>
  );
};
