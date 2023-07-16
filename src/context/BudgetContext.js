import { createContext, useState } from "react";

import { useQueryClient } from "react-query";

// services
import budgetService from "../services/budget";

// custom hooks
import { useAuthContext } from "../hooks/useAuthContext";
import { useMessageContext } from "../hooks/useMessageContext";

// labels
import { RECORD_DELETED_MESSAGE } from "../labels/labels";

export const BudgetContext = createContext();

export const BudgetContextProvider = ({ children }) => {
  const { user, logout } = useAuthContext();
  const [budgets, setBudgets] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [filters, setFilters] = useState({
    month: currentMonth,
    year: currentYear,
  });

  // Get QueryClient from the context
  const queryClient = useQueryClient();

  const { handleSetMessage, handleSetType, handleSetRecordType } =
    useMessageContext();

  const getBudgets = async (key) => {
    if (user !== null) {
      try {
        const budgetId = key.queryKey[1]?.id;

        const { data } = await budgetService.getAll({
          ...filters,
        });
        if (budgetId) {
          setBudgets(data.filter((b) => b._id === budgetId));
          return data.filter((b) => b._id === budgetId)[0];
        }
        setBudgets(data);

        return data;
      } catch (err) {
        if (
          err.response.data.status === 400 &&
          err.response.data.message === "INVALID_TOKEN"
        ) {
          logout();
        }
      }
    }
  };

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

  const handleDeleteBudget = async (budget) => {
    if (user !== null) {
      try {
        await budgetService.delete(budget._id);
        handleSetMessage(RECORD_DELETED_MESSAGE);
        handleSetType("success");
        handleSetRecordType("budget");

        queryClient.invalidateQueries({ queryKey: ["budgets"] });
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
    <BudgetContext.Provider
      value={{
        budgets,
        filters,
        getCurrentMonthBudgets,
        getNextMonthBudgets,
        getPreviuosMonthBudgets,
        getBudgets,
        handleDeleteBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
