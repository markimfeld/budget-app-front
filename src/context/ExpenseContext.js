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

  const { user } = useContext(UserContext);

  const { handleShowBudgetList } = useContext(BudgetContext);

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
    setExpenses([newExpense, ...expenses]);
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

  const handleDeleteExpense = async (expense) => {
    if (user !== null) {
      const config = {
        headers: {
          Authorization: `${user.accessToken}`,
        },
      };
      try {
        // REVISAR PORQUE CUANDO SE ELIMINA NO ESTA ARREGLANDO LOS NUMEROS

        const { expenseDeleted } = await expenseService.del(
          expense._id,
          config
        );
        setExpenses(expenses.filter((e) => e._id !== expense._id));
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
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
