import { useContext } from "react";

import { IncomeContext } from "../context/IncomeContext";

export function useIncomeContext() {
  return useContext(IncomeContext);
}
