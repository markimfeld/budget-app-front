import { createContext, useState } from "react";

import { useQueryClient } from "react-query";

// services
import debtService from "../services/debt";

// custom hooks
import { useAuthContext } from "../hooks/useAuthContext";
import { useMessageContext } from "../hooks/useMessageContext";

// labels
import { RECORD_DELETED_MESSAGE } from "../labels/labels";

export const DebtContext = createContext();

export const DebtContextProvider = ({ children }) => {
  const { user, logout } = useAuthContext();
  const [debts, setDebts] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [filters, setFilters] = useState({
    month: currentMonth,
    year: currentYear,
  });
  const [isPaid, setIsPaid] = useState(
    JSON.parse(window.localStorage.getItem("isPaid"))?.isPaid
  );

  // Get QueryClient from the context
  const queryClient = useQueryClient();

  const { handleSetMessage, handleSetType, handleSetRecordType } =
    useMessageContext();

  const getDebts = async (key) => {
    if (user !== null) {
      try {
        const debtId = key.queryKey[1]?.id;
        const filters = key.queryKey[1]?.filters;

        const { data } = await debtService.getAll({
          ...filters,
        });

        if (debtId) {
          setDebts(data.filter((d) => d._id === debtId));
          return data.filter((d) => d._id === debtId)[0];
        }
        if (!filters) {
          setDebts(data);
        }

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

  const getCurrentMonthDebts = () => {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    setCurrentMonth(currentMonth);
    setCurrentYear(currentYear);

    setFilters({ month: currentMonth, year: currentYear });
  };

  const getNextMonthDebts = () => {
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

  const getPreviuosMonthDebts = () => {
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

  const handleDeleteDebt = async (debt) => {
    if (user !== null) {
      try {
        await debtService.delete(debt._id);
        handleSetMessage(RECORD_DELETED_MESSAGE);
        handleSetType("success");
        handleSetRecordType("debt");

        queryClient.invalidateQueries({ queryKey: ["debts"] });
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

  const handleIsPaid = (isPaid) => {
    if (isPaid) {
      setIsPaid(true);
      window.localStorage.setItem("isPaid", JSON.stringify({ isPaid: true }));
    } else {
      setIsPaid(false);
      window.localStorage.setItem("isPaid", JSON.stringify({ isPaid: false }));
    }
  };

  return (
    <DebtContext.Provider
      value={{
        debts,
        filters,
        getCurrentMonthDebts,
        getNextMonthDebts,
        getPreviuosMonthDebts,
        getDebts,
        handleDeleteDebt,
        handleIsPaid,
        isPaid,
      }}
    >
      {children}
    </DebtContext.Provider>
  );
};
