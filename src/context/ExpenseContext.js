import { createContext, useState } from "react";

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
  const [showExpensesList, setShowExpensesList] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [messageExpense, setMessageExpense] = useState(null);
  const [expenseToUpdate, setExpenseToUpdate] = useState(null);
  const [isExpenseEditing, setIsExpenseEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { user, logout } = useAuthContext();

  const { getBudgets } = useBudgetContext();

  const { handleSetMessage, handleSetType, handleSetRecordType } =
    useMessageContext();

  const getExpenses = async (budgetId) => {
    if (user !== null) {
      const config = {
        headers: {
          Authorization: `${user.accessToken}`,
        },
      };
      try {
        const { data } = await expenseService.getAll(config);
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

  const handleSetIsLoading = (loading) => {
    if (loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  };

  const handleShowExpenseList = (showList) => {
    if (showList) {
      setShowExpensesList(true);
    } else {
      setShowExpensesList(false);
    }
  };

  const handleShowExpenseForm = (showForm) => {
    if (showForm) {
      setShowExpenseForm(true);
    } else {
      setShowExpenseForm(false);
    }
  };

  const handleSelectedBudget = async (budgetId) => {
    if (user !== null) {
      const config = {
        headers: {
          Authorization: `${user.accessToken}`,
        },
      };
      try {
        const response = await budgetService.getOne(config, budgetId);
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
      const config = {
        headers: {
          Authorization: `${user.accessToken}`,
        },
      };
      try {
        const response = await budgetService.getOne(config, budgetId);
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
      const config = {
        headers: {
          Authorization: `${user.accessToken}`,
        },
      };
      try {
        const response = await expenseService.getOne(config, expenseId);
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

  const handleDeleteExpense = async (expense) => {
    if (user !== null) {
      const config = {
        headers: {
          Authorization: `${user.accessToken}`,
        },
      };
      try {
        await expenseService.del(expense._id, config);

        let updatedBudget = { ...selectedBudget };

        updatedBudget.spentAmount = (
          Number.parseFloat(updatedBudget.spentAmount) -
          Number.parseFloat(expense.amount)
        ).toFixed(2);
        updatedBudget.leftAmount = (
          Number.parseFloat(updatedBudget.expectedAmount) -
          Number.parseFloat(updatedBudget.spentAmount)
        ).toFixed(2);

        await budgetService.update(selectedBudget._id, updatedBudget, config);

        setExpenses(expenses.filter((e) => e._id !== expense._id));

        handleUpdateSelectedBudget(selectedBudget._id);
        handleSetMessage(RECORD_DELETED_MESSAGE);
        handleSetType("success");
        handleSetRecordType("expense");

        getBudgets();
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

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        getExpenses,
        showExpensesList,
        handleShowExpenseList,
        selectedBudget,
        showExpenseForm,
        handleShowExpenseForm,
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
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
