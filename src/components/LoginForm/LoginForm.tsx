import React, { useState } from "react";
import LoginRequest from "../LoginRequest/LoginRequest";
import { mockedUser } from "../LoginRequest/LoginRequest";
import Message from "../Message/Message";
import Tiles from "../Tiles/Tiles";
import "./loginForm.scss";

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    async function asyncFunctionRequest(): Promise<void> {
      try {
        const result = await LoginRequest(
          inputsValue.user,
          inputsValue.password
        );
        if (result.status === "success") {
          SetIsSubmited(true);
        }
      } catch (err) {
        SetIsSubmited(false);
      }
    }
    asyncFunctionRequest();

    if (mockedUser.password && mockedUser.username) {
      setMessage("");
      if (
        mockedUser.password !== inputsValue.password ||
        mockedUser.username !== inputsValue.user
      ) {
        setMessage("invalid password or username");
      }
    }
  };

  const handleLogout = () => {
    const logIn = !isLoggedIn;
    SetIsLoggedIn(logIn);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
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
