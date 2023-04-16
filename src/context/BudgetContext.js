import { createContext, useContext, useEffect } from "react";

import { useState } from "react";

import budgetService from "../services/budget";

import { UserContext } from "./UserContext";
import { MessageContext } from "./MessageContext";

import { RECORD_DELETED_MESSAGE } from "../labels/labels";

export const BudgetContext = createContext();

export const BudgetContextProvider = ({ children }) => {
  const { user, logout } = useContext(UserContext);
  const [budgets, setBudgets] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [filters, setFilters] = useState({
    month: currentMonth,
    year: currentYear,
  });
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [showBudgetList, setShowBudgetList] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [budgetToUpdate, setBudgetToUpdate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const { handleSetMessage, handleSetType } = useContext(MessageContext);

  const getBudgets = async () => {
    if (user !== null) {
      const config = {
        headers: {
          Authorization: `${user.accessToken}`,
        },
      };
      try {
        const response = await budgetService.getAll(config, {
          ...filters,
          createdBy: user.id,
        });
        setBudgets(response.data);
        setIsLoading(false);
      } catch (err) {
        if (
          err.response.data.status === 400 &&
          err.response.data.message === "Token no válido"
        ) {
          logout();
        }
      }
    }
  };

  useEffect(() => {
    getBudgets();
    // eslint-disable-next-line
  }, [user, filters]);

  const getCurrentMonthBudgets = () => {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    setCurrentMonth(currentMonth);
    setCurrentYear(currentYear);

    setFilters({ month: currentMonth, year: currentYear });
  };

  const getNextMonthBudgets = () => {
    let nextMonth = currentMonth + 1;
    let nextYear = currentYear;

    if (currentMonth === 12) {
      nextYear++;
      nextMonth = 1;
    }
    setCurrentMonth(nextMonth);
    setCurrentYear(nextYear);

    setFilters({ month: nextMonth, year: nextYear });
  };

  const getPreviuosMonthBudgets = () => {
    let prevMonth = currentMonth;
    let prevYear = currentYear;

    if (currentMonth === 1) {
      prevMonth = 12;
      prevYear--;
    } else {
      prevMonth--;
    }
    setCurrentMonth(prevMonth);
    setCurrentYear(prevYear);

    setFilters({ month: prevMonth, year: prevYear });
  };

  const handleShowBudgetForm = (showForm) => {
    if (showForm) {
      setShowBudgetForm(true);
    } else {
      setShowBudgetForm(false);
    }
  };

  const handleShowBudgetList = (showList) => {
    if (showList) {
      setShowBudgetList(true);
    } else {
      setShowBudgetList(false);
    }
  };

  const handleUpdateBudgets = (newBudget) => {
    const updatedBudgets = budgets.filter(
      (budget) => newBudget._id !== budget._id
    );

    setBudgets([...updatedBudgets, newBudget]);
  };

  const handleBudgetToUpdate = (budget) => {
    setBudgetToUpdate(budget);
  };

  const handleIsEditing = (isEditing) => {
    setIsEditing(isEditing);

    // setIsEditing(prevState ==> !prevState)
  };

  const handleDeleteBudget = async (budget) => {
    if (user !== null) {
      const config = {
        headers: {
          Authorization: `${user.accessToken}`,
        },
      };
      try {
        await budgetService.delete(budget._id, config);
        setBudgets(budgets.filter((b) => b._id !== budget._id));
        handleSetMessage(RECORD_DELETED_MESSAGE);
        handleSetType("success");
      } catch (error) {
        if (
          error.response.data.status === 400 &&
          error.response.data.message === "Token no válido"
        ) {
          logout();
        }
      }
    }
  };

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        filters,
        getCurrentMonthBudgets,
        getNextMonthBudgets,
        getPreviuosMonthBudgets,
        handleShowBudgetForm,
        showBudgetForm,
        showBudgetList,
        handleUpdateBudgets,
        handleShowBudgetList,
        getBudgets,
        handleDeleteBudget,
        isLoading,
        handleIsEditing,
        isEditing,
        handleBudgetToUpdate,
        budgetToUpdate,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
