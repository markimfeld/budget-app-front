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
import BudgetFormEdit from "./BudgetFormEdit";
import { useQuery } from "react-query";

const BudgetForm = () => {
  const { user, logout } = useAuthContext();
  const {
    handleSetMessage,
    handleSetType,
    handleSetRecordType,
    clearMessages,
  } = useMessageContext();

  const { getBudgets } = useBudgetContext();

  const navigate = useNavigate();

  const { budgetId } = useParams();

  const { data: budgets } = useQuery({
    queryKey: ["budgets"],
    queryFn: getBudgets,
  });

  const onSubmit = async ({ name, expectedAmount }) => {
    if (user !== null) {
      const newBudget = {
        name,
        expectedAmount,
      };

      if (!budgetId) {
        try {
          await budgetService.store(newBudget);
          handleSetMessage(RECORD_CREATED_MESSAGE);
          handleSetType("success");
          handleSetRecordType("budget");
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
        // let budgetUpdated = { ...budgetToUpdate };

        let budgetUpdated = { ...budgets?.find((b) => b._id === budgetId) };

        budgetUpdated.expectedAmount = Number.parseFloat(expectedAmount);
        budgetUpdated.name = name;
        budgetUpdated.leftAmount = Number.parseFloat(
          Number.parseFloat(expectedAmount) - budgetUpdated.spentAmount
        );

        try {
          await budgetService.update(budgetId, budgetUpdated);

          handleSetMessage(RECORD_UPDATED_MESSAGE);
          handleSetType("success");
          handleSetRecordType("budget");
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

  const onCancelOperation = (from) => {
    clearMessages();
    navigate("/budgets");
  };

  return (
    <>
      {budgetId && (
        <BudgetFormEdit
          onSubmit={onSubmit}
          onCancelOperation={onCancelOperation}
          budgetToUpdate={{ ...budgets?.find((b) => b._id === budgetId) }}
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
