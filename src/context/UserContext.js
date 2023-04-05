import { createContext } from "react";

import { useState } from "react";

// services
import loginService from "../services/login";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showLoginForm, setshowLoginForm] = useState(true);

  const [isLoading, setIsLoading] = useState(true);

  const login = async (email, password) => {
    try {
      const response = await loginService.login({ email, password });

      if (response.status === 200) {
        setUser(response.user);
        window.localStorage.setItem("user", JSON.stringify(response.user));
        handleShowLoginForm(false);
        setIsLoading(false);
      }
    } catch (err) {
      setError(err.response.data);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const logout = () => {
    setUser(null);
    window.localStorage.clear();
    handleShowLoginForm(true);
  };

  const loadUserFromStorage = () => {
    const userLogged = window.localStorage.getItem("user");
    if (userLogged) {
      const user = JSON.parse(userLogged);
      setUser(user);
    }
    setIsLoading(false);
  };

  const register = async (newUser) => {
    try {
      const response = await loginService.register(newUser);

      if (response.isStored) {
        login(newUser.email, newUser.password);

        handleShowRegisterForm(false);
        handleShowLoginForm(false);
        setIsLoading(false);
      }
    } catch (err) {
      setError(err.response.data);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const handleShowLoginForm = (showLogin) => {
    if (showLogin) {
      setshowLoginForm(true);
    } else {
      setshowLoginForm(false);
    }
  };

  const handleShowRegisterForm = (showRegister) => {
    if (showRegister) {
      setShowRegisterForm(true);
    } else {
      setShowRegisterForm(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        error,
        loadUserFromStorage,
        register,
        showRegisterForm,
        showLoginForm,
        handleShowLoginForm,
        handleShowRegisterForm,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
