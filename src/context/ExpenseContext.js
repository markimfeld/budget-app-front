import { createContext, useState } from "react";

import { useQueryClient } from "react-query";

// services
import expenseService from "../services/expense";
import budgetService from "../services/budget";

// custom hooks
import { useAuthContext } from "../hooks/useAuthContext";
import { useMessageContext } from "../hooks/useMessageContext";

// labels
import { RECORD_DELETED_MESSAGE } from "../labels/labels";

export const ExpenseContext = createContext();

export const ExpenseContextProvider = ({ children }) => {
  const [allExpenses, setAllExpenses] = useState([]);
  const [messageExpense, setMessageExpense] = useState(null);

  const { user, logout } = useAuthContext();

  // Get QueryClient from the context
  const queryClient = useQueryClient();

  const { handleSetMessage, handleSetType, handleSetRecordType } =
    useMessageContext();

  const getAllExpenses = async (key) => {
    if (user !== null) {
      try {
        const budgetId = key.queryKey[1]?.budget;

        const { data } = await expenseService.getAll();

        if (budgetId) {
          setAllExpenses(data.filter((e) => e.budget._id === budgetId));
          return data.filter((e) => e.budget._id === budgetId);
        }
        return data;
      } catch (error) {
        if (
          error.response.data?.status === 400 &&
          error.response.data?.message === "INVALID_TOKEN"
        ) {
          logout();
        }
      }
    }
  };

  const handleSetMessageExpense = (message) => {
    setMessageExpense(message);

    setTimeout(() => {
      setMessageExpense(null);
    }, 2500);
  };

  const handleDeleteExpense = async (expense, budget) => {
    if (user !== null) {
      try {
        await expenseService.del(expense._id);

        let updatedBudget = { ...budget };

        updatedBudget.spentAmount = (
          Number.parseFloat(updatedBudget.spentAmount) -
          Number.parseFloat(expense.amount)
        ).toFixed(2);
        updatedBudget.leftAmount = (
          Number.parseFloat(updatedBudget.expectedAmount) -
          Number.parseFloat(updatedBudget.spentAmount)
        ).toFixed(2);

        await budgetService.update(budget._id, updatedBudget);

        queryClient.invalidateQueries({ queryKey: ["allExpenses"] });
        queryClient.invalidateQueries({ queryKey: ["budgets"] });

        handleSetMessage(RECORD_DELETED_MESSAGE);
        handleSetType("success");
        handleSetRecordType("expense");
      } catch (error) {
        if (
          error?.response?.data?.status === 400 &&
          error?.response?.data?.message === "INVALID_TOKEN"
        ) {
          logout();
        }
      }
    }
  };

  return (
    <ExpenseContext.Provider
      value={{
        handleSetMessageExpense,
        messageExpense,
        handleDeleteExpense,
        getAllExpenses,
        allExpenses,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
