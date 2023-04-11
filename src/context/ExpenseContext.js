import { createContext, useContext, useState } from "react";

// context
import { UserContext } from "./UserContext";
import { BudgetContext } from "./BudgetContext";

// services
import expenseService from "../services/expense";
import budgetService from "../services/budget";

export const ExpenseContext = createContext();

export const ExpenseContextProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [showExpensesList, setShowExpensesList] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [messageExpense, setMessageExpense] = useState(null);
  const [expenseToUpdate, setExpenseToUpdate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const { user } = useContext(UserContext);

  const { handleShowBudgetList, getBudgets } = useContext(BudgetContext);

  const getExpenses = async (budget) => {
    if (user !== null) {
      const config = {
        headers: {
          Authorization: `${user.accessToken}`,
        },
      };
      try {
        const { data } = await expenseService.getAll(config);
        const expensesByBudgetId = data.filter(
          (expense) => expense.budget._id === budget._id
        );
        setExpenses(expensesByBudgetId);

        handleShowExpenseList(true);
        setSelectedBudget(budget);
        handleShowBudgetList(false);
      } catch (error) {
        console.log(error);
      }
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

  const handleSelectedBudget = (budget) => {
    setSelectedBudget(budget);
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
      } catch (err) {
        if (err.response.data.status === 400) {
          window.localStorage.clear();
          window.location.reload();
        }
      }
    }
  };

  const handleIsEditing = (isEditing) => {
    setIsEditing(isEditing);
  };

  const handleExpenseToUpdate = (expense) => {
    setExpenseToUpdate(expense);
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

        updatedBudget.spentAmount =
          Number.parseFloat(updatedBudget.spentAmount) -
          Number.parseFloat(expense.amount);
        updatedBudget.leftAmount =
          updatedBudget.expectedAmount - updatedBudget.spentAmount;

        await budgetService.update(selectedBudget._id, updatedBudget, config);

        setExpenses(expenses.filter((e) => e._id !== expense._id));

        handleUpdateSelectedBudget(selectedBudget._id);

        getBudgets();
      } catch (err) {
        if (err.response.data.status === 400) {
          window.localStorage.clear();
          window.location.reload();
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
        isEditing,
        handleIsEditing,
        handleExpenseToUpdate,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
