import { useNavigate, useParams } from "react-router-dom";

// components
import InvestmentFormAdd from "./InvestmentFormAdd";
import InvestmentFormEdit from "./InvestmentFormEdit";

// services
import investmentService from "../services/investment";

// custom hooks
import { useMessageContext } from "../hooks/useMessageContext";
import { useInvestmentContext } from "../hooks/useInvestmentContext";
import { useAuthContext } from "../hooks/useAuthContext";

// labels
import {
  MISSING_FIELDS_REQUIRED,
  RECORD_CREATED_MESSAGE,
  RECORD_UPDATED_MESSAGE,
} from "../labels/labels";
import { useQuery } from "react-query";

const IncomeForm = () => {
  const { user, logout } = useAuthContext();
  const {
    handleSetMessage,
    handleSetType,
    handleSetRecordType,
    clearMessages,
  } = useMessageContext();

  const { getInvestments } = useInvestmentContext();

  const navigate = useNavigate();

  const { investmentId } = useParams();

  const { data: investments } = useQuery({
    queryKey: ["investments"],
    queryFn: getInvestments,
  });

  const onSubmit = async ({ name, amount }) => {
    if (user !== null) {
      const newInvestment = {
        name,
        amount,
      };

      if (!investmentId) {
        try {
          await investmentService.store(newInvestment);
          handleSetMessage(RECORD_CREATED_MESSAGE);
          handleSetType("success");
          handleSetRecordType("investment");
          navigate("/investments");
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
            handleSetRecordType("investment");
          }
        }
      } else {
        let investmentUpdated = {
          ...investments?.find((investment) => investment._id === investmentId),
        };

        investmentUpdated.amount = Number.parseFloat(amount);
        investmentUpdated.name = name;

        try {
          await investmentService.update(investmentId, investmentUpdated);

          handleSetMessage(RECORD_UPDATED_MESSAGE);
          handleSetType("success");
          handleSetRecordType("investment");
          navigate("/investments");
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
            handleSetRecordType("investment");
          }
        }
      }
    }
  };

  const onCancelOperation = () => {
    clearMessages();
    navigate("/investments");
  };

  return (
    <>
      {investmentId && (
        <InvestmentFormEdit
          onSubmit={onSubmit}
          onCancelOperation={onCancelOperation}
          incomeToUpdate={{
            ...investments?.find(
              (investment) => investment._id === investmentId
            ),
          }}
        />
      )}
      {!investmentId && (
        <InvestmentFormAdd
          onSubmit={onSubmit}
          onCancelOperation={onCancelOperation}
        />
      )}
    </>
  );
};

export default IncomeForm;
