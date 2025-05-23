import { createContext } from "react";

import { useState } from "react";

// services
import loginService from "../services/login";

// labels
import {
  DUPLICATE_RECORD,
  INVALID_CREDENTIALS,
  NOT_FOUND,
  INVALID_PASSWORD_LENGTH,
  MISSING_FIELDS_REQUIRED,
} from "../labels/labels";

// custom hooks
import { useMessageContext } from "../hooks/useMessageContext";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const { handleSetMessage, handleSetType, handleSetRecordType } =
    useMessageContext();

  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );

  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await loginService.login({ email, password });

      if (response.status === 200) {
        setUser(response.user);
        window.localStorage.setItem("user", JSON.stringify(response.user));

        window.localStorage.setItem(
          "isPaid",
          JSON.stringify({ isPaid: false })
        );

        let currencyType = window.localStorage.getItem("currencyType");

        if (currencyType) {
          window.localStorage.setItem("currencyType", currencyType);
        } else {
          window.localStorage.setItem("currencyType", "ARS");
        }

        setIsLoading(false);

        return response;
      }
    } catch (error) {
      setIsLoading(false);
      if (
        error.response.data.status === 404 &&
        error.response.data.message === "INVALID_CREDENTIALS"
      ) {
        handleSetMessage(INVALID_CREDENTIALS);
        handleSetType("danger");
        handleSetRecordType("user");
      } else if (
        error.response.data.status === 404 &&
        error.response.data.message === "NOT_FOUND"
      ) {
        handleSetMessage(NOT_FOUND);
        handleSetType("danger");
        handleSetRecordType("user");
      }
    }
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("isPaid");
    document.cookie = "jwt=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  };

  const loadUserFromStorage = () => {
    const userLogged = window.localStorage.getItem("user");
    if (userLogged !== null || userLogged !== undefined) {
      const user = JSON.parse(userLogged);
      setUser(user);
    }
    setIsLoading(false);
  };

  const register = async (newUser) => {
    try {
      const response = await loginService.register(newUser);

      return response;
    } catch (error) {
      if (
        error.response.data.status === 400 &&
        error.response.data.message === "DUPLICATE_RECORD"
      ) {
        handleSetMessage(DUPLICATE_RECORD);
        handleSetType("danger");
        handleSetRecordType("user");
      } else if (
        error.response.data.status === 400 &&
        error.response.data.message === "INVALID_PASSWORD_LENGTH"
      ) {
        handleSetMessage(INVALID_PASSWORD_LENGTH);
        handleSetType("danger");
        handleSetRecordType("user");
      } else if (
        error.response.data.status === 400 &&
        error.response.data.message === "MISSING_FIELDS_REQUIRED"
      ) {
        handleSetMessage(MISSING_FIELDS_REQUIRED);
        handleSetType("danger");
        handleSetRecordType("user");
      }
    }
  };

  const getOne = async (key) => {
    const id = key.queryKey[1].id;
    try {
      const { data: user } = await loginService.getUser({ id });
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserStorage = (user) => {
    setUser(user);
    window.localStorage.setItem("user", JSON.stringify(user));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        loadUserFromStorage,
        register,
        isLoading,
        getOne,
        updateUserStorage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
