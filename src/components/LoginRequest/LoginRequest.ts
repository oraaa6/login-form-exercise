import React from "react";

type UserData = {
  username: string;
  password: string;
};

export const mockedUser: UserData = {
  username: "admin",
  password: "123",
};

export function LoginRequest(
  userName: string,
  userPass: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<{ status: string }> {
  return new Promise((resolve, reject) => {
    setLoading(true);
    setTimeout(() => {
      if (
        mockedUser.username === userName &&
        mockedUser.password === userPass
      ) {
        resolve({ status: "success" });
      } else if (
        mockedUser.username !== userName ||
        mockedUser.password !== userPass
      ) {
        reject({ status: "error" });
      }
    }, 2000);
  });
}

export default LoginRequest;
