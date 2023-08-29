import { createContext, useState } from "react";

import { useQueryClient } from "react-query";

// services
import investmentService from "../services/investment";

// custom hooks
import { useAuthContext } from "../hooks/useAuthContext";
import { useMessageContext } from "../hooks/useMessageContext";

// labels
import { RECORD_DELETED_MESSAGE } from "../labels/labels";

export const InvestmentContext = createContext();

export const InvestmentContextProvider = ({ children }) => {
  const { user, logout } = useAuthContext();
  const [investments, setInvestments] = useState([]);

  // Get QueryClient from the context
  const queryClient = useQueryClient();

  const { handleSetMessage, handleSetType, handleSetRecordType } =
    useMessageContext();

  const getInvestments = async (key) => {
    if (user !== null) {
      try {
        const investmentId = key.queryKey[1]?.id;

        const { data } = await investmentService.getAll();

        if (investmentId) {
          setInvestments(data.filter((d) => d._id === investmentId));
          return data.filter((d) => d._id === investmentId)[0];
        }
        setInvestments(data);

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

  const handleDeleteInvestment = async (investment) => {
    if (user !== null) {
      try {
        await investmentService.delete(investment._id);
        handleSetMessage(RECORD_DELETED_MESSAGE);
        handleSetType("success");
        handleSetRecordType("investment");

        queryClient.invalidateQueries({ queryKey: ["investments"] });
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
    <InvestmentContext.Provider
      value={{
        investments,
        getInvestments,
        handleDeleteInvestment,
      }}
    >
      {children}
    </InvestmentContext.Provider>
  );
};
