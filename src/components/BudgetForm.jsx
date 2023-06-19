import { useNavigate, useParams } from "react-router-dom";

// components
import BudgetFormAdd from "./BudgetFormAdd";

// services
import budgetService from "../services/budget";

// custom hooks
import { useMessageContext } from "../hooks/useMessageContext";
import { useBudgetContext } from "../hooks/useBudgetContext";
import { useAuthContext } from "../hooks/useAuthContext";

// labels
import {
  MISSING_FIELDS_REQUIRED,
  RECORD_CREATED_MESSAGE,
  RECORD_UPDATED_MESSAGE,
} from "../labels/labels";
import { useEffect } from "react";
import BudgetFormEdit from "./BudgetFormEdit";

const BudgetForm = () => {
  const { user, logout } = useAuthContext();
  const {
    handleSetMessage,
    handleSetType,
    handleSetRecordType,
    clearMessages,
  } = useMessageContext();
  const {
    handleUpdateBudgets,
    budgetToUpdate,
    handleIsEditing,
    handleGetOneBudget,
    handleBudgetToUpdate,
  } = useBudgetContext();

  const navigate = useNavigate();

  const { budgetId } = useParams();

  useEffect(() => {
    if (budgetId) {
      handleGetOneBudget(budgetId);
    }
    // eslint-disable-next-line
  }, [budgetId]);

  const onSubmit = async ({ name, expectedAmount }) => {
    if (user !== null) {
      const newBudget = {
        name,
        expectedAmount,
      };

      if (!budgetId) {
        try {
          const data = await budgetService.store(newBudget);
          handleUpdateBudgets(data.data);
          handleSetMessage(RECORD_CREATED_MESSAGE);
          handleSetType("success");
          handleSetRecordType("budget");
          handleBudgetToUpdate(null);
          navigate("/budgets");
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
            handleSetRecordType("budget");
          }
        }
      } else {
        let budgetUpdated = { ...budgetToUpdate };
        budgetUpdated.expectedAmount = Number.parseFloat(expectedAmount);
        budgetUpdated.name = name;
        budgetUpdated.leftAmount =
          Number.parseFloat(expectedAmount) - budgetUpdated.spentAmount;

        try {
          const data = await budgetService.update(
            budgetToUpdate._id,
            budgetUpdated
          );

          handleUpdateBudgets(data.data);
          handleSetMessage(RECORD_UPDATED_MESSAGE);
          handleSetType("success");
          handleSetRecordType("budget");
          handleBudgetToUpdate(null);
          navigate("/budgets");
        } catch (error) {
          if (
            error.response.data.status === 400 &&
            error.response.data.message === "INVALID_TOKEN"
          ) {
            logout();
          } else if (
            error.response.data.status === 400 &&
            error.response.data.message === "MISSING_FIELDS_REQUIRED"
          ) {
            handleSetMessage(MISSING_FIELDS_REQUIRED);
            handleSetType("danger");
            handleSetRecordType("budget");
          }
        }
      }
    }
  };

  const onCancelOperation = () => {
    handleIsEditing(false);
    clearMessages();
    handleBudgetToUpdate(null);
    navigate("/budgets");
  };

  return (
    <>
      {budgetToUpdate && budgetId && (
        <BudgetFormEdit
          onSubmit={onSubmit}
          onCancelOperation={onCancelOperation}
          budgetToUpdate={budgetToUpdate}
        />
      )}
      {!budgetId && (
        <BudgetFormAdd
          onSubmit={onSubmit}
          onCancelOperation={onCancelOperation}
        />
      )}
    </>
  );
};

export default BudgetForm;
