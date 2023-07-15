import { useNavigate, useParams } from "react-router-dom";

// components
import IncomeFormAdd from "./IncomeFormAdd";

// services
import incomeService from "../services/income";

// custom hooks
import { useMessageContext } from "../hooks/useMessageContext";
import { useIncomeContext } from "../hooks/useIncomeContext";
import { useAuthContext } from "../hooks/useAuthContext";

// labels
import {
  MISSING_FIELDS_REQUIRED,
  RECORD_CREATED_MESSAGE,
  RECORD_UPDATED_MESSAGE,
} from "../labels/labels";
import { useQuery } from "react-query";
import IncomeFormEdit from "./IncomeFormEdit";

const IncomeForm = () => {
  const { user, logout } = useAuthContext();
  const {
    handleSetMessage,
    handleSetType,
    handleSetRecordType,
    clearMessages,
  } = useMessageContext();

  const { getIncomes } = useIncomeContext();

  const navigate = useNavigate();

  const { incomeId } = useParams();

  const { data: incomes } = useQuery({
    queryKey: ["incomes"],
    queryFn: getIncomes,
  });

  const onSubmit = async ({ name, amount }) => {
    if (user !== null) {
      const newIncome = {
        name,
        amount,
      };

      if (!incomeId) {
        try {
          await incomeService.store(newIncome);
          handleSetMessage(RECORD_CREATED_MESSAGE);
          handleSetType("success");
          handleSetRecordType("income");
          navigate("/incomes");
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
            handleSetRecordType("income");
          }
        }
      } else {
        let incomeUpdated = {
          ...incomes?.find((income) => income._id === incomeId),
        };

        incomeUpdated.amount = Number.parseFloat(amount);
        incomeUpdated.name = name;

        try {
          await incomeService.update(incomeId, incomeUpdated);

          handleSetMessage(RECORD_UPDATED_MESSAGE);
          handleSetType("success");
          handleSetRecordType("income");
          navigate("/incomes");
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
            handleSetRecordType("income");
          }
        }
      }
    }
  };

  const onCancelOperation = () => {
    clearMessages();
    navigate("/incomes");
  };

  return (
    <>
      {incomeId && (
        <IncomeFormEdit
          onSubmit={onSubmit}
          onCancelOperation={onCancelOperation}
          incomeToUpdate={{
            ...incomes?.find((income) => income._id === incomeId),
          }}
        />
      )}
      {!incomeId && (
        <IncomeFormAdd
          onSubmit={onSubmit}
          onCancelOperation={onCancelOperation}
        />
      )}
    </>
  );
};

export default IncomeForm;
