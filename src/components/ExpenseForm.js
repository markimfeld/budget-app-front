import React from "react";
import { useState, useContext } from "react";
import { Form, Button, Stack, Card } from "react-bootstrap";

import expenseService from "../services/expense";

import { ExpenseContext } from "../context/ExpenseContext";
import { BudgetContext } from "../context/BudgetContext";
import { UserContext } from "../context/UserContext";

const ExpenseForm = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  const { handleShowExpenseList, handleShowExpenseForm } =
    useContext(ExpenseContext);
  const { selectedBudget } = useContext(BudgetContext);
  const { user } = useContext(UserContext);

  const onSubmitExpense = async (event) => {
    event.preventDefault();

    if (user !== null) {
      const config = {
        headers: {
          Authorization: `${user.accessToken}`,
        },
      };

      const newExpense = { name, amount, budget: selectedBudget };

      try {
        const { data } = await expenseService.store(newExpense, config);
        console.log(data);
        // handleUpdateExpenses(data);
        // handleShowExpenseFormChange(true);
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };

  const onChangeName = (event) => {
    setName(event.target.value);
    console.log(name);
  };

  const onChangeAmount = (event) => {
    setAmount(event.target.value);
    console.log(amount);
  };

  const onCancelOperation = () => {
    // handleVolver();
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
              onClick={() => onCancelOperation()}
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
