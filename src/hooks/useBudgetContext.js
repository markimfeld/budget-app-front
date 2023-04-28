import { useContext } from "react";

import { BudgetContext } from "../context/BudgetContext";

export function useBudgetContext() {
  return useContext(BudgetContext);
}
