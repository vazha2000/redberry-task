import React from "react";
import "./Login.scss";
import { useForm } from "react-hook-form";

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

  const validateEmail = (value: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@redberry\.ge$/;

    return (
      emailPattern.test(value) || "მეილი უნდა მთავრდებოდეს @redberry.ge-ით"
    );
  };
  return (
    <div className="login-wrapper">
      <div className="login">
        <h2>შესვლა</h2>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
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
