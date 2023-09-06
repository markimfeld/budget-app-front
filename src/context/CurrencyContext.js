import { createContext, useState } from "react";
// services
import currencyService from "../services/currency";

// custom hooks
import { useAuthContext } from "../hooks/useAuthContext";

export const CurrencyContext = createContext();

export const CurrencyContextProvider = ({ children }) => {
  const { user, logout } = useAuthContext();
  const [dollarPrice, setDollarPrice] = useState(null);
  const [currencyType, setCurrencyType] = useState(
    window.localStorage.getItem("currencyType")
  );

  const handleSetCurrency = (currency) => {
    setCurrencyType(currency);
    window.localStorage.setItem("currencyType", currency);
  };

  const getCurrencyPrice = async (key) => {
    if (user !== null) {
      try {
        const dollarType = key.queryKey[1].type || "blue";
        const dolarPrice = await currencyService.getDolarPrice(dollarType);

        if (dolarPrice) {
          setDollarPrice(dolarPrice);
        }
        return dolarPrice;
      } catch (err) {
        if (err) {
          logout();
        }
      }
    }
  };

  return (
    <CurrencyContext.Provider
      value={{
        dollarPrice,
        getCurrencyPrice,
        handleSetCurrency,
        currencyType,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
