import { createContext, useState, useEffect } from "react";

import { useQueryClient } from "react-query";

// services
import expenseService from "../services/expense";
import budgetService from "../services/budget";

// custom hooks
import { useAuthContext } from "../hooks/useAuthContext";
import { useMessageContext } from "../hooks/useMessageContext";
import { useBudgetContext } from "../hooks/useBudgetContext";

// labels
import { RECORD_DELETED_MESSAGE } from "../labels/labels";

export const ExpenseContext = createContext();

export const ExpenseContextProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [messageExpense, setMessageExpense] = useState(null);
  const [expenseToUpdate, setExpenseToUpdate] = useState(null);
  const [isExpenseEditing, setIsExpenseEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { user, logout } = useAuthContext();

  // Get QueryClient from the context
  const queryClient = useQueryClient();

  const { getBudgets } = useBudgetContext();

  const { handleSetMessage, handleSetType, handleSetRecordType } =
    useMessageContext();

  const getExpenses = async (budgetId) => {
    if (user !== null) {
      try {
        const { data } = await expenseService.getAll();
        const expensesByBudgetId = data.filter(
          (expense) => expense.budget._id === budgetId
        );
        setExpenses(expensesByBudgetId);
        handleSetIsLoading(false);
      } catch (error) {
        if (
          error.response.data.status === 400 &&
          error.response.data.message === "INVALID_TOKEN"
        ) {
          logout();
        }
      }
    }
  };

  const getAllExpenses = async () => {
    if (user !== null) {
      try {
        const { data } = await expenseService.getAll();

        setAllExpenses(data);
        return data;
        // handleSetIsLoading(false);
      } catch (error) {
        if (
          error.response.data.status === 400 &&
          error.response.data.message === "INVALID_TOKEN"
        ) {
          logout();
        }
      }
    }
  };

  // useEffect(() => {
  //   getAllExpenses();
  //   // eslint-disable-next-line
  // }, [user]);

  const handleSetIsLoading = (loading) => {
    if (loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  };

  const handleSelectedBudget = async (budgetId) => {
    if (user !== null) {
      try {
        const response = await budgetService.getOne(budgetId);
        setSelectedBudget(response.data);
      } catch (error) {
        if (
          error.response.data.status === 400 &&
          error.response.data.message === "INVALID_TOKEN"
        ) {
          logout();
        }
      }
    }
  };

  const handleUpdateExpenses = (newExpense) => {
    const updatedExpenses = expenses.filter(
      (expense) => newExpense._id !== expense._id
    );
    setExpenses([newExpense, ...updatedExpenses]);
  };

  const handleSetMessageExpense = (message) => {
    setMessageExpense(message);

    setTimeout(() => {
      setMessageExpense(null);
    }, 2500);
  };

  const handleUpdateSelectedBudget = async (budgetId) => {
    if (user !== null) {
      try {
        const response = await budgetService.getOne(budgetId);
        setSelectedBudget(response.data);
      } catch (error) {
        if (
          error.response.data.status === 400 &&
          error.response.data.message === "INVALID_TOKEN"
        ) {
          logout();
        }
      }
    }
  };

  const handleIsExpenseEditing = (isEditing) => {
    setIsExpenseEditing(isEditing);
  };

  const handleExpenseToUpdate = (expense) => {
    setExpenseToUpdate(expense);
  };

  const handleGetOneExpense = async (expenseId) => {
    if (user !== null) {
      try {
        const response = await expenseService.getOne(expenseId);
        if (response.status === 200) {
          setExpenseToUpdate(response.data);
          return response.data;
        }
      } catch (error) {
        if (
          error.response.data.status === 400 &&
          error.response.data.message === "INVALID_TOKEN"
        ) {
          logout();
        }
      }
    }
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

        // setExpenses(expenses.filter((e) => e._id !== expense._id));

        // handleUpdateSelectedBudget(selectedBudget._id);

        queryClient.invalidateQueries({ queryKey: ["allExpenses"] });
        queryClient.invalidateQueries({ queryKey: ["budgets"] });

        handleSetMessage(RECORD_DELETED_MESSAGE);
        handleSetType("success");
        handleSetRecordType("expense");

        // getBudgets();
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
        expenses,
        getExpenses,
        selectedBudget,
        handleSelectedBudget,
        handleUpdateExpenses,
        handleSetMessageExpense,
        messageExpense,
        handleUpdateSelectedBudget,
        handleDeleteExpense,
        expenseToUpdate,
        isExpenseEditing,
        handleIsExpenseEditing,
        handleExpenseToUpdate,
        handleSetIsLoading,
        isLoading,
        handleGetOneExpense,
        getAllExpenses,
        allExpenses,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
