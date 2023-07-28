import { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    window.localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const selectedTheme = window.localStorage.getItem("theme");

    if (selectedTheme === "dark") {
      document.querySelector("body").setAttribute("data-theme", "dark");
    } else {
      document.querySelector("body").setAttribute("data-theme", "light");
    }
  }, [theme]);

  const handleSetTheme = (theme) => {
    setTheme(theme);
    window.localStorage.setItem("theme", theme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        handleSetTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
