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

import { useQuery } from "react-query";

const ExpenseForm = () => {
  const { getAllExpenses } = useExpenseContext();

  const { getBudgets } = useBudgetContext();

  const { expenseId } = useParams();

  const { user, logout } = useAuthContext();
  const {
    handleSetMessage,
    handleSetType,
    handleSetRecordType,
    clearMessages,
  } = useMessageContext();

  const navigate = useNavigate();

  const { data: budgets } = useQuery({
    queryKey: ["budgets"],
    queryFn: getBudgets,
  });

  const { data: expenses } = useQuery({
    queryKey: ["expenses"],
    queryFn: getAllExpenses,
  });

  const onSubmit = async ({ name, amount, description, budget }) => {
    if (user !== null) {
      const newExpense = {
        name,
        amount,
        description,
        budget,
      };

      if (expenseId === undefined) {
        let updatedBudget = { ...budgets.find((b) => b._id === budget) };

        updatedBudget.spentAmount = Number.parseFloat(
          (
            Number.parseFloat(updatedBudget.spentAmount) +
            Number.parseFloat(newExpense.amount)
          ).toFixed(2)
        );
        updatedBudget.leftAmount = Number.parseFloat(
          (
            Number.parseFloat(updatedBudget.expectedAmount) -
            Number.parseFloat(updatedBudget.spentAmount)
          ).toFixed(2)
        );

        try {
          await expenseService.store(newExpense);

          await budgetService.update(budget, updatedBudget);

          handleSetMessage(RECORD_CREATED_MESSAGE);
          handleSetType("success");
          handleSetRecordType("expense");
          navigate(`/`);
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
        let updatedBudget = { ...budgets.find((b) => b._id === budget) };

        updatedBudget.spentAmount = Number.parseFloat(
          (
            Number.parseFloat(updatedBudget.spentAmount) -
            Number.parseFloat(expenses?.find((e) => e._id === expenseId).amount)
          ).toFixed(2)
        );

        updatedBudget.spentAmount = Number.parseFloat(
          (
            Number.parseFloat(updatedBudget.spentAmount) +
            Number.parseFloat(newExpense.amount)
          ).toFixed(2)
        );

        updatedBudget.leftAmount = Number.parseFloat(
          (
            Number.parseFloat(updatedBudget.expectedAmount) -
            Number.parseFloat(updatedBudget.spentAmount)
          ).toFixed(2)
        );

        try {
          await expenseService.edit(expenseId, newExpense);

          await budgetService.update(budget, updatedBudget);

          handleSetMessage(RECORD_UPDATED_MESSAGE);
          handleSetType("success");
          handleSetRecordType("expense");
          navigate("/");
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

  const onCancelOperation = () => {
    clearMessages();
    navigate(`/`);
  };

  return (
    <>
      {!expenseId && (
        <ExpenseFormAdd
          onSubmit={onSubmit}
          onCancelOperation={onCancelOperation}
          budgets={budgets}
        />
      )}
      {expenseId && expenses?.find((e) => e._id === expenseId) && (
        <ExpenseFormEdit
          onSubmit={onSubmit}
          onCancelOperation={onCancelOperation}
          expenseToUpdate={expenses?.find((e) => e._id === expenseId)}
          budgets={budgets}
        />
      )}
    </>
  );
};

export default ExpenseForm;
