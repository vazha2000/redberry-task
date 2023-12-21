import React from "react";
import "./Login.scss";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../context/AuthContext";

type TLoginProps = {
  isLoginClicked: boolean;
  setIsLoginClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

type TFormData = {
  Email: string;
};
export const Login = ({ setIsLoginClicked }: TLoginProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TFormData>();

  const { setLoggedIn } = useAuth();
  const token =
    "503b1f485c12cc6d3b89177dfc9d0eb81b8d2279dc0c480dedc81a7451657268";

  const validateEmail = (value: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@redberry\.ge$/;

    return (
      emailPattern.test(value) || "მეილი უნდა მთავრდებოდეს @redberry.ge-ით"
    );
  };

  const onSubmit = async (data: TFormData) => {
    try {
      const response = await fetch(
        "https://api.blog.redberryinternship.ge/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email: data.Email }),
        }
      );
      if (response.status === 204) {
        console.log("user exists!!!");
        setLoggedIn(true);
      } else {
        console.log("does not exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login">
        <h2>შესვლა</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="login__email-container">
            <label>ელ-ფოსტა</label>
            <input
              className={`email-input ${errors.Email ? "error" : ""}`}
              {...register("Email", {
                required: true,
                validate: validateEmail,
              })}
              type="text"
              placeholder="Example@redberry.ge"
            />
            {errors.Email && errors.Email.type !== "required" && (
              <div className="email-input__error">
                <img src="assets/svg/error-circle.svg" alt="error-circle" />
                <span>{errors.Email.message}</span>
              </div>
            )}
          </div>
          <button type="submit">შესვლა</button>
        </form>
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
