import { Form, Button, Stack, Card, FloatingLabel } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

// formik
import { useFormik } from "formik";

// services
import budgetService from "../services/budget";

// custom hooks
import { useMessageContext } from "../hooks/useMessageContext";
import { useBudgetContext } from "../hooks/useBudgetContext";
import { useAuthContext } from "../hooks/useAuthContext";

import {
  MISSING_FIELDS_REQUIRED,
  RECORD_CREATED_MESSAGE,
  RECORD_UPDATED_MESSAGE,
} from "../labels/labels";

const BudgetForm = () => {
  const { user, logout } = useAuthContext();
  const {
    handleSetMessage,
    handleSetType,
    handleSetRecordType,
    clearMessages,
  } = useMessageContext();
  const { handleUpdateBudgets, budgetToUpdate, isEditing, handleIsEditing } =
    useBudgetContext();

  const navigate = useNavigate();

  const onSubmit = async ({ name, expectedAmount }) => {
    if (user !== null) {
      const config = {
        headers: {
          Authorization: `${user.accessToken}`,
        },
      };

      const newBudget = {
        name,
        expectedAmount,
      };

      if (!isEditing) {
        try {
          const data = await budgetService.store(newBudget, config);
          handleUpdateBudgets(data.data);
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
        let budgetUpdated = { ...budgetToUpdate };
        budgetUpdated.expectedAmount = Number.parseFloat(expectedAmount);
        budgetUpdated.name = name;
        budgetUpdated.leftAmount =
          Number.parseFloat(expectedAmount) - budgetUpdated.spentAmount;

        try {
          const data = await budgetService.update(
            budgetToUpdate._id,
            budgetUpdated,
            config
          );

          handleUpdateBudgets(data.data);
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

  const onCancelOperation = () => {
    handleIsEditing(false);
    clearMessages();
    navigate("/budgets");
  };

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      name: budgetToUpdate?.name ? budgetToUpdate?.name : "",
      expectedAmount: budgetToUpdate?.expectedAmount
        ? budgetToUpdate?.expectedAmount
        : "",
    },
    onSubmit,
  });

  return (
    <Card style={{ border: "none", backgroundColor: "hsl(0, 0%, 97%, 0.5)" }}>
      <Card.Header style={{ border: "none" }}>
        <Card.Title className="text-center fs-3">
          {!isEditing && "Nuevo presupuesto"}
          {isEditing && "Modificar presupuesto"}
        </Card.Title>
      </Card.Header>
      <Card.Body className="p-4">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <FloatingLabel
              controlId="floatingName"
              label="Nombre del presupuesto"
            >
              <Form.Control
                name="name"
                value={values.name}
                onChange={handleChange}
                type="text"
                placeholder="Comida"
                required
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicExpectedAmount">
            <FloatingLabel
              controlId="floatingExpectedAmount"
              label="Monto previsto"
            >
              <Form.Control
                name="expectedAmount"
                value={values.expectedAmount}
                onChange={handleChange}
                type="number"
                placeholder="15000"
                required
              />
            </FloatingLabel>
          </Form.Group>
          <div className="d-grid gap-2">
            <Stack direction="horizontal" gap={3}>
              {!isEditing && (
                <Button className="ms-auto" variant="success" type="submit">
                  Guardar
                </Button>
              )}
              {isEditing && (
                <Button className="ms-auto" variant="success" type="submit">
                  Modificar
                </Button>
              )}
              <Button
                variant="outline-secondary"
                onClick={() => onCancelOperation()}
              >
                Cancelar
              </Button>
            </Stack>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BudgetForm;
