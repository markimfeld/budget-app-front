import React from "react";
import { useState, useContext } from "react";
import { Form, Button, Stack, Card, FloatingLabel } from "react-bootstrap";

import expenseService from "../services/expense";

import { ExpenseContext } from "../context/ExpenseContext";
import { UserContext } from "../context/UserContext";
import { BudgetContext } from "../context/BudgetContext";
import budgetService from "../services/budget";
import { MessageContext } from "../context/MessageContext";
import {
  MISSING_FIELDS_REQUIRED,
  RECORD_CREATED_MESSAGE,
  RECORD_UPDATED_MESSAGE,
} from "../labels/labels";

const ExpenseForm = () => {
  const {
    handleShowExpenseList,
    handleShowExpenseForm,
    selectedBudget,
    handleUpdateExpenses,
    handleUpdateSelectedBudget,
    isExpenseEditing,
    handleIsExpenseEditing,
    expenseToUpdate,
  } = useContext(ExpenseContext);
  const { user, logout } = useContext(UserContext);
  const { getBudgets } = useContext(BudgetContext);
  const {
    handleSetMessage,
    handleSetType,
    handleSetRecordType,
    clearMessages,
  } = useContext(MessageContext);

  const [name, setName] = useState(
    isExpenseEditing && expenseToUpdate.name ? expenseToUpdate.name : ""
  );
  const [description, setDescription] = useState(
    isExpenseEditing && expenseToUpdate.description
      ? expenseToUpdate.description
      : ""
  );
  const [amount, setAmount] = useState(
    isExpenseEditing && expenseToUpdate.amount ? expenseToUpdate.amount : ""
  );

  const onSubmitExpense = async (event) => {
    event.preventDefault();

    if (user !== null) {
      const config = {
        headers: {
          Authorization: `${user.accessToken}`,
        },
      };

      const newExpense = { name, amount, description, budget: selectedBudget };

      if (!isExpenseEditing) {
        let updatedBudget = { ...selectedBudget };

        updatedBudget.spentAmount =
          Number.parseFloat(updatedBudget.spentAmount) +
          Number.parseFloat(newExpense.amount);
        updatedBudget.leftAmount =
          updatedBudget.expectedAmount - updatedBudget.spentAmount;

        try {
          const { data } = await expenseService.store(newExpense, config);

          await budgetService.update(selectedBudget._id, updatedBudget, config);

          handleShowExpenseList(true);
          handleShowExpenseForm(false);
          handleUpdateExpenses(data);
          handleSetMessage(RECORD_CREATED_MESSAGE);
          handleSetType("success");
          handleSetRecordType("expense");
          handleUpdateSelectedBudget(selectedBudget._id);
          getBudgets();
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

        // TODO: revisar los calculos porque se marea con decimales

        updatedBudget.spentAmount =
          Number.parseFloat(updatedBudget.spentAmount) -
          Number.parseFloat(expenseToUpdate.amount);

        updatedBudget.spentAmount =
          Number.parseFloat(updatedBudget.spentAmount) +
          Number.parseFloat(newExpense.amount);

        updatedBudget.leftAmount =
          updatedBudget.expectedAmount - updatedBudget.spentAmount;

        try {
          const { data } = await expenseService.edit(
            expenseToUpdate._id,
            newExpense,
            config
          );

          await budgetService.update(selectedBudget._id, updatedBudget, config);

          handleShowExpenseList(true);
          handleShowExpenseForm(false);
          handleUpdateExpenses(data);
          handleSetMessage(RECORD_UPDATED_MESSAGE);
          handleSetType("success");
          handleSetRecordType("expense");
          handleUpdateSelectedBudget(selectedBudget._id);
          getBudgets();
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

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const onChangeAmount = (event) => {
    setAmount(event.target.value);
  };

  const onCancelOperation = (showList) => {
    handleShowExpenseForm(!showList);
    handleShowExpenseList(showList);
    handleIsExpenseEditing(false);
    clearMessages();
  };

  return (
    <Card style={{ border: "none", backgroundColor: "hsl(0, 0%, 97%, 0.5)" }}>
      <Card.Header style={{ border: "none" }}>
        <Card.Title className="text-center fs-3">
          {!isExpenseEditing && "Nuevo gasto"}
          {isExpenseEditing && "Modificar gasto"}
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={onSubmitExpense}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <FloatingLabel controlId="floatingName" label="Nombre del gasto">
              <Form.Control
                name="name"
                value={name}
                onChange={onChangeName}
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
                value={description}
                onChange={onChangeDescription}
                type="text"
                placeholder="Alfajor"
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicMonto">
            <FloatingLabel controlId="floatingAmount" label="Monto">
              <Form.Control
                name="amount"
                value={amount}
                onChange={onChangeAmount}
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
