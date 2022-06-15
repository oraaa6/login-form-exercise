import React, { useState } from "react";
import LoginRequest from "../LoginRequest/LoginRequest";
import { mockedUser } from "../LoginRequest/LoginRequest";
import Message from "../Message/Message";
import Tiles from "../Tiles/Tiles";
import "./loginForm.scss";
import LoadingIcon from "../LoadingIcon/LoadingIcon";

const LoginForm = () => {
  type InitialStateValue = {
    user: string;
    password: string;
  };

  const initialStateValue: InitialStateValue = {
    user: "",
    password: "",
  };

  const [isSubmited, SetIsSubmited] = useState<boolean>(false);
  const [inputsValue, SetInputsValue] = useState(initialStateValue);
  const [message, setMessage] = useState<string>("");
  const [isLoggedIn, SetIsLoggedIn] = useState<boolean>(false);
  const [isLoading, SetIsLoading] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    async function asyncFunctionRequest(): Promise<void> {
      try {
        const result = await LoginRequest(
          inputsValue.user,
          inputsValue.password,
          SetIsLoading
        );
        if (result.status === "success") {
          SetIsSubmited(true);
          SetIsLoading(false);
        }
      } catch (err) {
        SetIsSubmited(false);
        SetIsLoading(false);
        if (
          mockedUser.password !== inputsValue.password ||
          mockedUser.username !== inputsValue.user
        ) {
          setMessage("invalid password or username");
        }
      }
    }
    asyncFunctionRequest();
  };

  const handleLogout = () => {
    const logIn = !isLoggedIn;
    SetIsLoggedIn(logIn);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMessage("");
    SetInputsValue({
      ...inputsValue,
      [event.target.name]: value,
    });
  };

  return (
    <>
      {isSubmited === false ? (
        <>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form__container">
              <input
                className="form__input"
                type="text"
                value={inputsValue.user}
                name="user"
                onChange={handleChange}
                placeholder="Username"
              />
              <input
                className="form__input"
                type="password"
                value={inputsValue.password}
                name="password"
                onChange={handleChange}
                placeholder="Password"
              />
              <button className="form__button button">Login</button>
            </div>
          </form>
          <Message message={message} />
          {isLoading && <LoadingIcon />}
        </>
      ) : (
        <>
          <button className="form__button button" onClick={handleLogout}>
            Logout
          </button>
          <Tiles />
        </>
      )}
    </>
  );
};

export default LoginForm;
