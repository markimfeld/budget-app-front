import { createContext, useContext, useEffect } from "react";

import { useState } from "react";

import budgetService from "../services/budget";

import { UserContext } from "./UserContext";

export const BudgetContext = createContext();

export const BudgetContextProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [filters, setFilters] = useState({
    month: currentMonth,
    year: currentYear,
  });
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [showBudgetList, setShowBudgetList] = useState(true);
  const [messageBudget, setMessageBudget] = useState(null);

  const { user } = useContext(UserContext);

  const getBudgets = async () => {
    if (user !== null) {
      const config = {
        headers: {
          Authorization: `${user.accessToken}`,
        },
      };
      try {
        const response = await budgetService.getAll(config, filters);
        setBudgets(response.data);
      } catch (err) {
        if (err.response.data.status === 400) {
          window.localStorage.clear();
          window.location.reload();
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
    setBudgets([...budgets, newBudget]);
  };

  const handleSetMessageBudget = (message) => {
    setMessageBudget(message);
    setTimeout(() => {
      setMessageBudget(null);
    }, 5000);
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
        handleSetMessageBudget,
        messageBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
