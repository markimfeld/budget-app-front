import { useNavigate, useParams } from "react-router-dom";

// components
import DebtFormAdd from "./DebtFormAdd";
import DebtFormEdit from "./DebtFormEdit";

// services
import debtService from "../services/debt";

// custom hooks
import { useMessageContext } from "../hooks/useMessageContext";
import { useDebtContext } from "../hooks/useDebtContext";
import { useAuthContext } from "../hooks/useAuthContext";

// labels
import {
  MISSING_FIELDS_REQUIRED,
  RECORD_CREATED_MESSAGE,
  RECORD_UPDATED_MESSAGE,
} from "../labels/labels";
import { useQuery } from "react-query";

const DebtForm = () => {
  const { user, logout } = useAuthContext();
  const {
    handleSetMessage,
    handleSetType,
    handleSetRecordType,
    clearMessages,
  } = useMessageContext();

  const { getDebts } = useDebtContext();

  const navigate = useNavigate();

  const { debtId } = useParams();

  const { data: debts } = useQuery({
    queryKey: ["debts"],
    queryFn: getDebts,
  });

  const onSubmit = async ({
    name,
    installmentAmount,
    leftAmountInstallments,
    initialAmountInstallments,
    startDate,
    endDate,
  }) => {
    if (user !== null) {
      const newDebt = {
        name,
        installmentAmount,
        leftAmountInstallments,
        initialAmountInstallments,
        startDate,
        endDate,
      };

      if (!debtId) {
        try {
          await debtService.store(newDebt);
          handleSetMessage(RECORD_CREATED_MESSAGE);
          handleSetType("success");
          handleSetRecordType("debt");
          navigate("/debts");
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
            handleSetRecordType("debt");
          }
        }
      } else {
        let debtUpdated = { ...debts?.find((d) => d._id === debtId) };

        debtUpdated.installmentAmount = Number.parseFloat(installmentAmount);
        debtUpdated.name = name;
        debtUpdated.initialAmountInstallments = initialAmountInstallments;
        debtUpdated.leftAmountInstallments = leftAmountInstallments;
        debtUpdated.startDate = startDate;
        debtUpdated.endDate = endDate;

        try {
          await debtService.update(debtId, debtUpdated);

          handleSetMessage(RECORD_UPDATED_MESSAGE);
          handleSetType("success");
          handleSetRecordType("debt");
          navigate("/debts");
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
            handleSetRecordType("debt");
          }
        }
      }
    }
  };

  const onCancelOperation = (from) => {
    clearMessages();
    navigate("/debts");
  };

  return (
    <>
      {debtId && (
        <DebtFormEdit
          onSubmit={onSubmit}
          onCancelOperation={onCancelOperation}
          debtToUpdate={{ ...debts?.find((d) => d._id === debtId) }}
        />
      )}
      {!debtId && (
        <DebtFormAdd
          onSubmit={onSubmit}
          onCancelOperation={onCancelOperation}
        />
      )}
    </>
  );
};

export default DebtForm;
