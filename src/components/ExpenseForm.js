import React from "react";
import { useState, useContext } from "react";
import { Form, Button, Stack, Card } from "react-bootstrap";

import expenseService from "../services/expense";

import { ExpenseContext } from "../context/ExpenseContext";
import { UserContext } from "../context/UserContext";
import { BudgetContext } from "../context/BudgetContext";
import budgetService from "../services/budget";

const ExpenseForm = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  const {
    handleShowExpenseList,
    handleShowExpenseForm,
    selectedBudget,
    handleUpdateExpenses,
    handleSetMessageExpense,
    handleUpdateSelectedBudget,
  } = useContext(ExpenseContext);
  const { user } = useContext(UserContext);
  const { getBudgets } = useContext(BudgetContext);

  const onSubmitExpense = async (event) => {
    event.preventDefault();

    if (user !== null) {
      const config = {
        headers: {
          Authorization: `${user.accessToken}`,
        },
      };

      const newExpense = { name, amount, budget: selectedBudget };

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
        handleSetMessageExpense("Nuevo gasto creado exitosamente!");
        handleUpdateSelectedBudget(selectedBudget._id);
        getBudgets();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeAmount = (event) => {
    setAmount(event.target.value);
  };

  const onCancelOperation = (showList) => {
    handleShowExpenseForm(!showList);
    handleShowExpenseList(showList);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title className="text-center">Nuevo gasto</Card.Title>
        <Form onSubmit={onSubmitExpense}>
          <Form.Group className="mb-3" controlId="formBasicNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              onChange={onChangeName}
              name="name"
              type="text"
              placeholder="Ejemplo: Pollo"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicMontoLimite">
            <Form.Label>Monto límite</Form.Label>
            <Form.Control
              onChange={onChangeAmount}
              name="expectedAmount"
              type="number"
              placeholder="Ejemplo: $5333.00"
            />
          </Form.Group>

          <Stack direction="horizontal" gap={3}>
            <Button className="ms-auto" variant="primary" type="submit">
              Guardar
            </Button>
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
