import { createContext, useState } from "react";

import { useQueryClient } from "react-query";

// services
import incomeService from "../services/income";

// custom hooks
import { useAuthContext } from "../hooks/useAuthContext";
import { useMessageContext } from "../hooks/useMessageContext";

// labels
import { RECORD_DELETED_MESSAGE } from "../labels/labels";

export const IncomeContext = createContext();

export const IncomeContextProvider = ({ children }) => {
  const { user, logout } = useAuthContext();
  const [incomes, setIncomes] = useState([]);

  // Get QueryClient from the context
  const queryClient = useQueryClient();

  const { handleSetMessage, handleSetType, handleSetRecordType } =
    useMessageContext();

  const getIncomes = async (key) => {
    if (user !== null) {
      try {
        const filters = key.queryKey[1]?.filters;

        const { data } = await incomeService.getAll({ ...filters });

        if (!filters) {
          setIncomes(data);
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

  const handleDeleteIncome = async (income) => {
    if (user !== null) {
      try {
        await incomeService.delete(income._id);
        handleSetMessage(RECORD_DELETED_MESSAGE);
        handleSetType("success");
        handleSetRecordType("income");

        queryClient.invalidateQueries({ queryKey: ["incomes"] });
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
    <IncomeContext.Provider
      value={{
        incomes,
        getIncomes,
        handleDeleteIncome,
      }}
    >
      {children}
    </IncomeContext.Provider>
  );
};
