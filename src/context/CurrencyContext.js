import { createContext, useState, useEffect } from "react";
// services
import currencyService from "../services/currency";

// custom hooks
import { useAuthContext } from "../hooks/useAuthContext";

export const CurrencyContext = createContext();

export const CurrencyContextProvider = ({ children }) => {
  const { user, logout } = useAuthContext();
  const [dollarPrice, setDollarPrice] = useState(null);
  const [currency, setCurrency] = useState(
    window.localStorage.getItem("currency") || "ARS"
  );

  useEffect(() => {
    const selectedCurrency = window.localStorage.getItem("currency");

    if (selectedCurrency === "ARS") {
      setCurrency("USD");
    } else {
      setCurrency("ARS");
    }
  }, [currency]);

  const handleSetCurrency = (currency) => {
    setCurrency(currency);
    window.localStorage.setItem("currency", currency);
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
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
