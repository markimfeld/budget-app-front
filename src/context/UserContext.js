import { createContext } from "react";

import { useState } from "react";

// services
import loginService from "../services/login";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await loginService.login({ email, password });

      if (response.status === 200) {
        setUser(response.user);
        window.localStorage.setItem("user", JSON.stringify(response.user));
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
  };

  const loadUserFromStorage = () => {
    const userLogged = window.localStorage.getItem("user");
    if (userLogged) {
      const user = JSON.parse(userLogged);
      setUser(user);
    }
  };

  const register = async () => {
    let firstName = "joel";
    let lastName = "gomez";
    let username = "jgomez";
    let password = "jgomez";
    let email = "jgomez@gmail.com";

    try {
      const response = await loginService.register({
        firstName,
        lastName,
        username,
        email,
        password,
      });

      console.log(response);
    } catch (err) {}
  };

  return (
    <UserContext.Provider
      value={{ user, login, logout, error, loadUserFromStorage, register }}
    >
      {children}
    </UserContext.Provider>
  );
};
