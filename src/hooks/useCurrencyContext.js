import { useContext } from "react";

import { CurrencyContext } from "../context/CurrencyContext";

export function useCurrencyContext() {
  return useContext(CurrencyContext);
}
