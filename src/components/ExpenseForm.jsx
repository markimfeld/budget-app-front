import { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

// components
import ExpenseFormAdd from "./ExpenseFormAdd";
import ExpenseFormEdit from "./ExpenseFormEdit";

// services
import expenseService from "../services/expense";
import budgetService from "../services/budget";

// custom hooks
import { useAuthContext } from "../hooks/useAuthContext";
import { useExpenseContext } from "../hooks/useExpenseContext";
import { useBudgetContext } from "../hooks/useBudgetContext";
import { useMessageContext } from "../hooks/useMessageContext";

// custom labels
import {
  MISSING_FIELDS_REQUIRED,
  RECORD_CREATED_MESSAGE,
  RECORD_UPDATED_MESSAGE,
} from "../labels/labels";

const ExpenseForm = () => {
  const {
    handleShowExpenseList,
    selectedBudget,
    handleUpdateExpenses,
    handleUpdateSelectedBudget,
    handleIsExpenseEditing,
    handleGetOneExpense,
    expenseToUpdate,
    handleSelectedBudget,
    handleExpenseToUpdate,
  } = useExpenseContext();

  const { budgetId, expenseId } = useParams();

  useEffect(() => {
    if (expenseId) {
      handleGetOneExpense(expenseId);
      handleSelectedBudget(budgetId);
    }
    // eslint-disable-next-line
  }, [expenseId]);

  const onSubmit = async ({ name, amount, description }) => {
    if (user !== null) {
      const config = {
        headers: {
          Authorization: `${user.accessToken}`,
        },
      };

      const newExpense = {
        name,
        amount,
        description,
        budget: selectedBudget._id,
      };

      console.log(newExpense);

      if (!expenseId) {
        let updatedBudget = { ...selectedBudget };

        updatedBudget.spentAmount = (
          Number.parseFloat(updatedBudget.spentAmount) +
          Number.parseFloat(newExpense.amount)
        ).toFixed(2);
        updatedBudget.leftAmount = (
          Number.parseFloat(updatedBudget.expectedAmount) -
          Number.parseFloat(updatedBudget.spentAmount)
        ).toFixed(2);

        try {
          const { data } = await expenseService.store(newExpense, config);

          await budgetService.update(selectedBudget._id, updatedBudget, config);

          handleUpdateExpenses(data);
          handleSetMessage(RECORD_CREATED_MESSAGE);
          handleSetType("success");
          handleSetRecordType("expense");
          handleUpdateSelectedBudget(selectedBudget._id);
          getBudgets();
          handleExpenseToUpdate(null);
          navigate(`/budgets/${budgetId}/expenses`);
        } catch (error) {
          if (
            error.response.data.status === 400 &&
            error.response.data.message === "INVALID_TOKEN"
          ) {
            logout();
          }
          if (
            error.response.data.status === 400 &&
            error.response.data.message === "MISSING_FIELDS_REQUIRED"
          ) {
            handleSetMessage(MISSING_FIELDS_REQUIRED);
            handleSetType("danger");
            handleSetRecordType("expense");
          }
        }
      } else {
        let updatedBudget = { ...selectedBudget };

        updatedBudget.spentAmount = (
          Number.parseFloat(updatedBudget.spentAmount) -
          Number.parseFloat(expenseToUpdate.amount)
        ).toFixed(2);

        updatedBudget.spentAmount = (
          Number.parseFloat(updatedBudget.spentAmount) +
          Number.parseFloat(newExpense.amount)
        ).toFixed(2);

        updatedBudget.leftAmount = (
          Number.parseFloat(updatedBudget.expectedAmount) -
          Number.parseFloat(updatedBudget.spentAmount)
        ).toFixed(2);

        try {
          const { data } = await expenseService.edit(
            expenseToUpdate._id,
            newExpense,
            config
          );

          await budgetService.update(budgetId, updatedBudget, config);

          handleUpdateExpenses(data);
          handleSetMessage(RECORD_UPDATED_MESSAGE);
          handleSetType("success");
          handleSetRecordType("expense");
          handleUpdateSelectedBudget(selectedBudget._id);
          handleExpenseToUpdate(null);
          getBudgets();

          navigate(`/budgets/${selectedBudget._id}/expenses`);
        } catch (error) {
          if (
            error.response.data.status === 400 &&
            error.response.data.message === "INVALID_TOKEN"
          ) {
            logout();
          }
          if (
            error.response.data.status === 400 &&
            error.response.data.message === "MISSING_FIELDS_REQUIRED"
          ) {
            handleSetMessage(MISSING_FIELDS_REQUIRED);
            handleSetType("danger");
            handleSetRecordType("expense");
          }
        }
      }
    }
  };

  const { user, logout } = useAuthContext();
  const { getBudgets } = useBudgetContext();
  const {
    handleSetMessage,
    handleSetType,
    handleSetRecordType,
    clearMessages,
  } = useMessageContext();

  const navigate = useNavigate();

  const onCancelOperation = (showList) => {
    handleShowExpenseList(showList);
    handleIsExpenseEditing(false);
    clearMessages();
    handleExpenseToUpdate(null);
    navigate(`/budgets/${budgetId}/expenses`);
  };

  return (
    <>
      {!expenseId && (
        <ExpenseFormAdd
          onSubmit={onSubmit}
          onCancelOperation={onCancelOperation}
        />
      )}
      {expenseId && expenseToUpdate && (
        <ExpenseFormEdit
          onSubmit={onSubmit}
          onCancelOperation={onCancelOperation}
          expenseToUpdate={expenseToUpdate}
        />
      )}
    </>
  );
};

export default ExpenseForm;
