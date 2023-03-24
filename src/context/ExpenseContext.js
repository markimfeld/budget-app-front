import { createContext, useContext, useEffect, useState } from "react";

// context
import { UserContext } from "./UserContext";

// services
import expenseService from "../services/expense";

export const ExpenseContext = createContext();

export const ExpenseContextProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [showExpensesList, setShowExpensesList] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);

  const { user } = useContext(UserContext);

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

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        getExpenses,
        showExpensesList,
        handleShowExpenseList,
        selectedBudget,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
