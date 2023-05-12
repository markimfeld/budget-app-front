import { Form, Button, Stack, Card, FloatingLabel } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";

// formik
import { useFormik } from "formik";

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
import { useEffect } from "react";

const ExpenseForm = () => {
  const {
    handleShowExpenseList,
    handleShowExpenseForm,
    selectedBudget,
    handleUpdateExpenses,
    handleUpdateSelectedBudget,
    isExpenseEditing,
    handleIsExpenseEditing,
    expenses,
    handleGetOneExpense,
    expenseToUpdate,
  } = useExpenseContext();

  const { budgetId, expenseId } = useParams();

  let expense = expenses.filter((expense) => expense._id === expenseId)[0];

  useEffect(() => {
    handleGetOneExpense(expenseId);
  }, [expenseId]);

  console.log(expenseToUpdate);

  const onSubmit = async (data) => {
    console.log(data);
    if (user !== null) {
      const config = {
        headers: {
          Authorization: `${user.accessToken}`,
        },
      };

      const newExpense = {
        name: values.name,
        amount: values.amount,
        description: values.description,
        budget: selectedBudget,
      };

      if (!isExpenseEditing) {
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

          await budgetService.update(selectedBudget._id, updatedBudget, config);

          handleUpdateExpenses(data);
          handleSetMessage(RECORD_UPDATED_MESSAGE);
          handleSetType("success");
          handleSetRecordType("expense");
          handleUpdateSelectedBudget(selectedBudget._id);
          getBudgets();

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
    handleShowExpenseForm(!showList);
    handleShowExpenseList(showList);
    handleIsExpenseEditing(false);
    clearMessages();
    navigate(`/budgets/${budgetId}/expenses`);
  };

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      name: expense?.name || expenseToUpdate?.name,
      description: expense?.description || expenseToUpdate?.description,
      amount: expense?.amount || expenseToUpdate?.amount,
    },
    onSubmit,
  });

  return (
    <Card style={{ border: "none", backgroundColor: "hsl(0, 0%, 97%, 0.5)" }}>
      <Card.Header style={{ border: "none" }}>
        <Card.Title className="text-center fs-3">
          {!isExpenseEditing && "Nuevo gasto"}
          {isExpenseEditing && "Modificar gasto"}
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <FloatingLabel controlId="floatingName" label="Nombre del gasto">
              <Form.Control
                name="name"
                value={values.name}
                onChange={handleChange}
                type="text"
                placeholder="Horeb"
                required
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDescripcion">
            <FloatingLabel controlId="floatingDescription" label="Descripción">
              <Form.Control
                name="description"
                value={values.description}
                onChange={handleChange}
                type="text"
                placeholder="Alfajor"
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicMonto">
            <FloatingLabel controlId="floatingAmount" label="Monto">
              <Form.Control
                name="amount"
                value={values.amount}
                onChange={handleChange}
                type="number"
                placeholder="15000"
                required
              />
            </FloatingLabel>
          </Form.Group>

          <Stack direction="horizontal" gap={3}>
            {!isExpenseEditing && (
              <Button className="ms-auto" variant="success" type="submit">
                Guardar
              </Button>
            )}
            {isExpenseEditing && (
              <Button className="ms-auto" variant="success" type="submit">
                Modificar
              </Button>
            )}
            <Button
              variant="outline-secondary"
              onClick={() => onCancelOperation(true)}
            >
              Cancelar
            </Button>
          </Stack>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ExpenseForm;
