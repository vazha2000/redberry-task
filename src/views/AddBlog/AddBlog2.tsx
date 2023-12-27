import React, { useEffect, useRef, useState } from "react";
import "./AddBlog2.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TCategory } from "../../components/HeroCategories/HeroCategories";
import { useFetch } from "../../utils/useFetch";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { Navbar } from "../../components/Navbar";
import { SuccessPost } from "../../components/Modals/SuccessPost";
import { Overlay } from "../../components/Overlay";

export type TBlogForm = {
  author: string;
  title: string;
  description: string;
  publish_date: Date;
  categories: { id: number; title: string }[];
  email: string;
  image: Blob | null;
};
export const AddBlog2 = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isCategoriesClicked, setIsCategoriesClicked] = useState(false);
  const storedFormData = JSON.parse(
    localStorage.getItem("blogFormData") || "{}"
  );

  let imageBlob;
  if (storedFormData.image) {
    imageBlob = dataURLtoBlob(storedFormData.image);
  }
  let parsedDate;
  if(JSON.parse(localStorage.getItem("blogFormData")!)?.publish_date !== undefined) {
    parsedDate = new Date(JSON.parse(localStorage.getItem("blogFormData")!).publish_date)
  }
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
    setError,
    clearErrors,
    trigger,
    control,
    reset,
    getValues,
  } = useForm<TBlogForm>({
    defaultValues: {
      author: JSON.parse(localStorage.getItem("blogFormData")!)?.author,
      title: JSON.parse(localStorage.getItem("blogFormData")!)?.title,
      description: JSON.parse(localStorage.getItem("blogFormData")!)?.description,
      categories: JSON.parse(localStorage.getItem("blogFormData")!)?.categories,
      email: JSON.parse(localStorage.getItem("blogFormData")!)?.email,
      image: imageBlob,
      publish_date: parsedDate
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
    { id: number; title: string }[]
  >([]);

  const handleCategoryClick = (categoryTitle: string, categoryId: number) => {
    const currentCategories = getValues().categories as {
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
        { id: categoryId, title: categoryTitle },
      ]);
    }
    trigger("categories");
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
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [imageName, setImageName] = useState("");
  const watchedValues = watch();

  // useEffect(() => {
  //   const formDataToSave = {
  //     ...watchedValues,
  //     image: watchedValues.image ? URL.createObjectURL(watchedValues.image) : null,
  //     // publish_date: watchedValues.publish_date.toISOString().split("T")[0]
  //     // publish_date: watchedValues.publish_date ? watchedValues.publish_date.toISOString().split("T")[0] : ""
  //   };
  //   localStorage.setItem("blogFormData", JSON.stringify(formDataToSave));
  // }, [watchedValues]);

  function dataURLtoBlob(dataURL: string) {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  useEffect(() => {
    const formDataToSave = { ...watchedValues };

    if (watchedValues.image) {
      const reader = new FileReader();
      reader.onloadend = function () {
        formDataToSave.image = reader.result;
        localStorage.setItem("blogFormData", JSON.stringify(formDataToSave));
      };
      reader.readAsDataURL(watchedValues.image);
    } else {
      localStorage.setItem("blogFormData", JSON.stringify(formDataToSave));
    }
  }, [watchedValues]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("image", selectedFile || storedFormData.image);
        setIsImageUploaded(true);
        setImageName(selectedFile.name);
        // trigger();
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  useEffect(() => {
    register("categories", { required: true });
    if(storedFormData.categories === undefined) {
      setValue("categories", []);
    }
  }, [register, setValue]);


  const [authorErrors, setAuthorErrors] = useState<boolean[]>([]);
  const [isAuthorFocused, setIsAuthorFocused] = useState(false);
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);

  const validateAuthor = (value: string) => {
    const words = value.trim().split(/\s+/);
    const hasMinimumWords = words.length >= 2;
    const hasMinimumFourChars = value.trim().length >= 4;
    const georgianSymbols = /^[ა-ჰ\s]*$/.test(value) && value.length > 0;

    setAuthorErrors([hasMinimumFourChars, hasMinimumWords, georgianSymbols]);

    if (!hasMinimumWords || !hasMinimumFourChars || !georgianSymbols) {
      return "";
    } else {
      return true;
    }
  };
  const validateEmail = (value: string) => {
    const isValidEmail = /^[a-zA-Z0-9._-]+@redberry\.ge$/.test(value);
    return isValidEmail || "მეილი უნდა მთავრდებოდეს @redberry.ge-ით";
  };

  const authorValue = watch("author");
  useEffect(() => {
    if (isAuthorFocused) {
      trigger("author");
    }
  }, [authorValue, isAuthorFocused, trigger]);
  const titleValue = watch("title");
  useEffect(() => {
    if (isTitleFocused) {
      trigger("title");
    }
  }, [titleValue, isTitleFocused, trigger]);

  const emailValue = watch("email");
  useEffect(() => {
    if (isEmailFocused) {
      trigger("email");
    }
  }, [emailValue, isEmailFocused, trigger]);
  const descriptionValue = watch("description");
  useEffect(() => {
    if (isDescriptionFocused) {
      trigger("description");
    }
  }, [descriptionValue, isDescriptionFocused, trigger]);

  const [postSuccess, setPostSuccess] = useState(false);

  const handleDataSubmit = async (data: TBlogForm) => {
    const categoryIdsAsString = data.categories.map((category) => category.id);
    // const formattedDate = data.publish_date.toISOString().split("T")[0];

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    // formData.append("publish_date", formattedDate);
    formData.append("categories", `[${categoryIdsAsString}]`);
    formData.append("description", data.description);
    formData.append("email", data.email);
    formData.append("image", data.image!);
    // console.log(data)
    // console.log(storedFormData)

    try {
      await axios.post(
        "https://api.blog.redberryinternship.ge/api/blogs",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPostSuccess(true);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveImage = () => {
    setValue("image", null);
    setIsImageUploaded(false);
    setImageName("");
  };

  return (
    <>
      <Navbar />
      <div className="addBlog-wrapper">
        <div className="addBlog">
          <h1>ბლოგის დამატება</h1>
          <img src={storedFormData.image} alt="" />
          <form
            onSubmit={handleSubmit(handleDataSubmit)}
            className="addBlog__form"
          >
            <div className="upload-container">
              <label>ატვირთეთ ფოტო</label>
              {isImageUploaded ? (
                <div className="uploaded">
                  <div className="galleryImageName">
                    <img src="assets/svg/gallery.svg" />
                    <span>{imageName}</span>
                  </div>
                  <div className="remove" onClick={handleRemoveImage}>
                    <img src="assets/svg/add.svg" alt="" />
                  </div>
                </div>
              ) : (
                <div className={`upload ${errors.image ? "error" : ""}`}>
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
                      {...register("image", { required: true })}
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="titleAuthor-container">
              <div className="author">
                <label>ავტორი *</label>
                <input
                  {...register("author", { validate: validateAuthor })}
                  type="text"
                  placeholder="შეიყვანეთ ავტორი"
                  className={`${errors.author && "error"} ${
                    !authorErrors.includes(false) &&
                    authorErrors.length !== 0 &&
                    "success"
                  }`}
                  onFocus={() => {
                    setIsAuthorFocused(true);
                  }}
                />
                <ul className="author__list">
                  <li
                    className={`author__list__item ${
                      authorErrors[0] === false && "error"
                    } ${authorErrors[0] === true && "success"}`}
                  >
                    მინიმუმ 4 სიმბოლო
                  </li>
                  <li
                    className={`author__list__item ${
                      authorErrors[1] === false && "error"
                    } ${authorErrors[1] === true && "success"}`}
                  >
                    მინიმუმ ორი სიტყვა
                  </li>
                  <li
                    className={`author__list__item ${
                      authorErrors[2] === false && "error"
                    } ${authorErrors[2] === true && "success"}`}
                  >
                    მხოლოდ ქართული სიმბოლოები
                  </li>
                </ul>
              </div>
              <div className="title">
                <label>სათაური *</label>
                <input
                  {...register("title", { required: true, minLength: 2 })}
                  type="text"
                  placeholder="შეიყვანეთ სათაური"
                  className={`${errors.title && "error"} ${
                    isTitleFocused && !errors.title && "success"
                  }`}
                  onFocus={() => setIsTitleFocused(true)}
                />
                <ul className="title__list">
                  <li
                    className={`title__list__item ${
                      isTitleFocused ? (errors.title ? "error" : "success") : ""
                    }`}
                  >
                    მინიმუმ ორი სიმბოლო
                  </li>
                </ul>
              </div>
            </div>
            <div className="description-container">
              <label>აღწერა *</label>
              <textarea
                placeholder="შეიყვანეთ აღწერა"
                className={`description-content ${
                  errors.description && "error"
                } ${isDescriptionFocused && !errors.description && "success"}`}
                {...register("description", { required: true, minLength: 4 })}
                onFocus={() => setIsDescriptionFocused(true)}
              ></textarea>
              <p
                className={`description-validation ${
                  isDescriptionFocused
                    ? errors.description
                      ? "error"
                      : "success"
                    : ""
                }`}
              >
                მინიმუმ 4 სიმბოლო
              </p>
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
                        autoComplete="off"
                        // onChange={(date: Date) => field.onChange(date)}
                        onChange={(date: Date) => {
                          setValue("publish_date", date);
                          // trigger();
                        }}
                        className={errors.publish_date ? "error" : ""}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="category-container">
                <label>კატეგორია</label>
                <div
                  id="categoryField"
                  className={`category-list-container ${
                    errors.categories ? "error" : ""
                  }`}
                >
                  {getValues().categories === undefined ? (
                    <div></div>
                  ) : (
                    getValues().categories.length === 0 && (
                      <span>აირჩიეთ კატეგორია</span>
                    )
                  )}

                  <ul className="picked-category-list">
                    {getValues().categories === undefined ? (
                      <div>s</div>
                    ) : (
                      getValues().categories.map((picked, index) => (
                        <div key={index} style={getColorStyles(picked.title)}>
                          <li
                            key={index}
                            className="picked-category-list__item"
                          >
                            {picked.title}
                          </li>
                          <img src="assets/svg/close2.svg" alt="close icon" />
                        </div>
                      ))
                    )}
                  </ul>
                  <div
                    className="arrow-down"
                    style={{ display: "flex", cursor: "pointer" }}
                  >
                    <img
                      onClick={() =>
                        setIsCategoriesClicked(!isCategoriesClicked)
                      }
                      src="assets/svg/arrow-down.svg"
                      alt="arrow down"
                    />
                  </div>
                  {isCategoriesClicked && (
                    <ul className="category-list">
                      {categoriesData.data.map((item) => (
                        <li
                          onClick={() =>
                            handleCategoryClick(item.title, item.id)
                          }
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
                type="text"
                placeholder="Example@redberry.ge"
                {...register("email", {
                  required: true,
                  validate: validateEmail,
                })}
                className={`${errors.email && "error"} ${
                  isEmailFocused && !errors.email && "success"
                }`}
                onFocus={() => setIsEmailFocused(true)}
              />
              {errors.email?.message && (
                <div className="email-error">
                  <img src="assets/svg/error-circle.svg" alt="" />
                  <p>{errors.email?.message}</p>
                </div>
              )}
            </div>
            <div className="submit-button">
              <button type="submit">გამოქვეყნება</button>
            </div>
          </form>
        </div>
      </div>
      <div className="arrow-container">
        <img src="assets/svg/arrow-left2.svg" alt="" />
      </div>
      {postSuccess && (
        <>
          <Overlay />
          <SuccessPost setPostSuccess={setPostSuccess} />
        </>
      )}
    </>
  );
};
