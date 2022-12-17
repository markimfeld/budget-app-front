import React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Stack } from "react-bootstrap";

import expenseService from "../services/expense";

const ExpenseForm = ({
  selectedBudget,
  handleShowExpenseFormChange,
  handleUpdateExpenses,
}) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userLogged = window.localStorage.getItem("user");
    if (userLogged) {
      const user = JSON.parse(userLogged);
      setUser(user);
    }
  }, []);

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
        handleUpdateExpenses(data);
        handleShowExpenseFormChange(true);
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

  const onCancelOperation = () => {};

  return (
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
          placeholder="Ejemplo: 15000"
        />
      </Form.Group>

      <Stack gap={2} className="col-md-5 mx-auto">
        <Button variant="primary" type="submit">
          Guardar
        </Button>
        <Button variant="danger" onClick={() => onCancelOperation()}>
          Cancelar
        </Button>
      </Stack>
    </Form>
  );
};

export default ExpenseForm;
