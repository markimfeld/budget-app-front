import React, { useContext } from "react";
import { Alert } from "react-bootstrap";

import { BudgetContext } from "../context/BudgetContext";
import { ExpenseContext } from "../context/ExpenseContext";

const Success = () => {
  const { messageBudget } = useContext(BudgetContext);
  const { messageExpense } = useContext(ExpenseContext);

  return (
    <>
      {messageBudget !== null && (
        <Alert key="success" variant="success">
          {messageBudget}
        </Alert>
      )}
      {messageExpense !== null && (
        <Alert key="success" variant="success">
          {messageExpense}
        </Alert>
      )}
    </>
  );
};

export default Success;
