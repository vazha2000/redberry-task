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
  publish_date: Date;
  categories: { id: number; title: string }[];
  email: string;
  image: string;
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
      publish_date: new Date(),
      categories: [],
      email: "",
      image: ""
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

  const [pickedCategories, setPickedCategories] = useState<
    { id: string; title: string }[]
  >([]);

  const handleCategoryClick = (categoryTitle: string, categoryId: number) => {
    const currentCategories = watch("categories") as {
      id: number;
      title: string;
    }[];
    const isCategorySelected = currentCategories.some(
      (category) => category.title === categoryTitle
    );

    if (isCategorySelected) {
      setValue(
        "categories",
        currentCategories.filter((category) => category.title !== categoryTitle)
      );
      setPickedCategories(
        pickedCategories.filter((category) => category.title !== categoryTitle)
      );
    } else {
      setValue("categories", [
        ...currentCategories,
        { id: categoryId, title: categoryTitle },
      ]);
      setPickedCategories([
        ...pickedCategories,
        { id: categoryId.toString(), title: categoryTitle },
      ]);
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("image", reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleFormSubmit = async (data: TBlogForm) => {
    const categoryIdsAsString = pickedCategories.map((category) => category.id.toString());
    try {
      const response = await fetch("https://api.blog.redberryinternship.ge/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({...data, categories: categoryIdsAsString}),
      });
  
      if (response.status === 204) {
        console.log("Blog added successfully!");
      } else {
        throw new Error(`Failed to add blog. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };
  return (
    <div className="addBlog-wrapper">
      <div className="addBlog">
        <h1>ბლოგის დამატება</h1>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="addBlog__form"
        >
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
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
          <div className="titleAuthor-container">
            <div className="author">
              <label>ავტორი *</label>
              <input
                {...register("author", { required: true })}
                type="text"
                placeholder="შეიყვანეთ ავტორი"
                className={errors.author ? "error" : ""}
              />
              <ul className="author__list">
                <li className="author__list__item">მინიმუმ 4 სიმბოლო</li>
                <li className="author__list__item">მინიმუმ ორი სიტყვა</li>
                <li className="author__list__item">
                  მხოლოდ ქართული სიმბოლოები
                </li>
              </ul>
            </div>
            <div className="title">
              <label>სათაური *</label>
              <input
                {...register("title", { required: true })}
                type="text"
                placeholder="შეიყვანეთ სათაური"
                className={errors.title ? "error" : ""}
              />
              <ul>
                <li>მინიმუმ ორი სიმბოლო</li>
              </ul>
            </div>
          </div>
          <div className="description-container">
            <label>აღწერა *</label>
            <textarea
              {...register("description", { required: true })}
              placeholder="შეიყვანეთ აღწერა"
              className={`description-content ${errors.description && "error"}`}
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
                  name="publish_date"
                  control={control}
                  defaultValue={new Date()}
                  render={({ field }) => (
                    <DatePicker
                      {...register("publish_date", { required: true })}
                      dateFormat="dd-MM-yyyy"
                      selected={field.value}
                      // onChange={(date: Date) => field.onChange(date)}
                      onChange={(date: Date) => setValue("publish_date", date)}
                      className={errors.publish_date && "error"}
                    />
                  )}
                />
              </div>
            </div>
            <div className="category-container">
              <label>კატეგორია</label>
              <div className="category-list-container">
                {pickedCategories.length === 0 && (
                  <span>აირჩიეთ კატეგორია</span>
                )}
                <ul className="picked-category-list">
                  {pickedCategories.map((picked, index) => (
                    <div key={index} style={getColorStyles(picked.title)}>
                      <li key={index} className="picked-category-list__item">
                        {picked.title}
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
                        onClick={() => handleCategoryClick(item.title, item.id)}
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
            <input
              {...register("email", { required: true })}
              type="text"
              className={errors.email && "error"}
              placeholder="Example@redberry.ge"
            />
          </div>
          <div className="submit-button">
            <button type="submit">გამოქვეყნება</button>
          </div>
        </form>
      </div>
    </div>
  );
};
