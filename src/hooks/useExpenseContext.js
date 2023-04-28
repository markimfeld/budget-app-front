import { useContext } from "react";

import { ExpenseContext } from "../context/ExpenseContext";

export function useExpenseContext() {
  return useContext(ExpenseContext);
}
