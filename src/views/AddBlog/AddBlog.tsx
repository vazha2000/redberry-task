import React, { useRef, useState } from "react";
import "./AddBlog.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TCategory } from "../../components/HeroCategories/HeroCategories";
import { useFetch } from "../../utils/useFetch";
import { useForm, Controller } from "react-hook-form";

export type TBlogForm = {
  author: string;
  title: string;
  description: string;
  publishDate: Date;
  categories: string[];
  email: string;
};
export const AddBlog = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isCategoriesClicked, setIsCategoriesClicked] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    setValue,
  } = useForm<TBlogForm>({
    defaultValues: {
      author: "",
      title: "",
      description: "",
      publishDate: new Date(),
      categories: [],
      email: "",
    },
  });

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

  const [pickedCategories, setPickedCategories] = useState<string[]>([]);

  const handleCategoryClick = (categoryTitle: string) => {
    const currentCategories = watch("categories");
    const isCategorySelected = currentCategories.includes(categoryTitle);

    if (isCategorySelected) {
      setValue(
        "categories",
        currentCategories.filter((category) => category !== categoryTitle)
      );
      setPickedCategories(
        pickedCategories.filter((category) => category !== categoryTitle)
      );
    } else {
      setValue("categories", [...currentCategories, categoryTitle]);
      setPickedCategories([...pickedCategories, categoryTitle]);
    }
  };

  const getColorStyles = (categoryTitle: string) => {
    const category = categoriesData.data.find(
      (cat) => cat.title === categoryTitle
    );
    return {
      color: category?.text_color,
      background: category?.background_color,
    };
  };
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
              <input
                {...register("author")}
                type="text"
                placeholder="შეიყვანეთ ავტორი"
              />
              <ul className="author__list">
                <li>მინიმუმ 4 სიმბოლო</li>
                <li>მინიმუმ ორი სიტყვა</li>
                <li>მხოლოდ ქართული სიმბოლოები</li>
              </ul>
            </div>
            <div className="title">
              <label>სათაური *</label>
              <input
                {...register("title")}
                type="text"
                placeholder="შეიყვანეთ სათაური"
              />
              <ul>
                <li>მინიმუმ ორი სიმბოლო</li>
              </ul>
            </div>
          </div>
          <div className="description-container">
            <label>აღწერა *</label>
            <textarea
              {...register("description")}
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
                <Controller
                  name="publishDate"
                  control={control}
                  defaultValue={new Date()}
                  render={({ field }) => (
                    <DatePicker
                      dateFormat="dd-MM-yyyy"
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                    />
                  )}
                />
              </div>
            </div>
            <div className="category-container">
              <label>კატეგორია</label>
              <div className="category-list-container">
                <ul className="picked-category-list">
                  {pickedCategories.map((picked, index) => (
                    <div key={index} style={getColorStyles(picked)}>
                      <li key={index} className="picked-category-list__item">
                        {picked}
                      </li>
                      <img
                        onClick={() =>
                          setPickedCategories(
                            pickedCategories.filter((item) => item !== picked)
                          )
                        }
                        src="assets/svg/close2.svg"
                        alt="close icon"
                      />
                    </div>
                  ))}
                </ul>
                <div
                  className="arrow-down"
                  style={{ display: "flex", cursor: "pointer" }}
                >
                  <img
                    onClick={() => setIsCategoriesClicked(!isCategoriesClicked)}
                    src="assets/svg/arrow-down.svg"
                    alt="arrow down"
                  />
                </div>
                {isCategoriesClicked && (
                  <ul className="category-list">
                    {categoriesData.data.map((item) => (
                      <li
                        onClick={() => handleCategoryClick(item.title)}
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
            <input {...register("email")} type="text" />
          </div>
          <div className="submit-button">
            <button>გამოქვეყნება</button>
          </div>
        </form>
      </div>
    </div>
  );
};
