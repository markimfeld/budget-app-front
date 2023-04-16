import React from "react";
import { useState, useContext } from "react";
import { Form, Button, Stack, Card } from "react-bootstrap";

import expenseService from "../services/expense";

import { ExpenseContext } from "../context/ExpenseContext";
import { UserContext } from "../context/UserContext";
import { BudgetContext } from "../context/BudgetContext";
import budgetService from "../services/budget";
import { MessageContext } from "../context/MessageContext";
import {
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
    isEditing,
    handleIsEditing,
    expenseToUpdate,
  } = useContext(ExpenseContext);
  const { user } = useContext(UserContext);
  const { getBudgets } = useContext(BudgetContext);
  const { handleSetMessage, handleSetType } = useContext(MessageContext);

  const [name, setName] = useState(
    isEditing && expenseToUpdate.name ? expenseToUpdate.name : ""
  );
  const [description, setDescription] = useState(
    isEditing && expenseToUpdate.description ? expenseToUpdate.description : ""
  );
  const [amount, setAmount] = useState(
    isEditing && expenseToUpdate.amount ? expenseToUpdate.amount : ""
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

      if (!isEditing) {
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
          handleSetType("sucess");
          handleUpdateSelectedBudget(selectedBudget._id);
          getBudgets();
        } catch (error) {
          console.log(error);
        }
      } else {
        let updatedBudget = { ...selectedBudget };

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
          handleUpdateSelectedBudget(selectedBudget._id);
          getBudgets();
        } catch (error) {
          console.log(error);
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
    handleIsEditing(false);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title className="text-center">
          {!isEditing && "Nuevo gasto"}
          {isEditing && "Modificar gasto"}
        </Card.Title>
        <Form onSubmit={onSubmitExpense}>
          <Form.Group className="mb-3" controlId="formBasicNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              onChange={onChangeName}
              name="name"
              type="text"
              placeholder="Ejemplo: Horeb"
              value={name}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDescripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              onChange={onChangeDescription}
              name="description"
              type="text"
              placeholder="Ejemplo: Alfajor"
              value={description}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicMontoLimite">
            <Form.Label>Monto límite</Form.Label>
            <Form.Control
              onChange={onChangeAmount}
              name="amount"
              type="number"
              placeholder="Ejemplo: $5333.00"
              value={amount}
            />
          </Form.Group>

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
