import React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Stack } from "react-bootstrap";

import budgetService from "../services/budget";

const BudgetForm = ({ onShowBudgetForm, handleBudgetUpdate }) => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [expectedAmount, setExpectedAmount] = useState(0);

  useEffect(() => {
    const userLogged = window.localStorage.getItem("user");
    if (userLogged) {
      const user = JSON.parse(userLogged);
      setUser(user);
    }
  }, []);

  const handleAddBudget = async (event) => {
    event.preventDefault();
    if (user !== null) {
      const config = {
        headers: {
          Authorization: `${user.accessToken}`,
        },
      };

      const newBudget = { name, expectedAmount };

      const data = await budgetService.store(newBudget, config);

      handleBudgetUpdate(data.data);
      onShowBudgetForm(false);
    }
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeExpectedAmount = (e) => {
    setExpectedAmount(e.target.value);
  };

  const onCancelOperation = () => {
    onShowBudgetForm(false);
  };

  return (
    <Form onSubmit={handleAddBudget}>
      <Form.Group className="mb-3" controlId="formBasicNombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          onChange={onChangeName}
          name="name"
          type="text"
          placeholder="Ejemplo: Comida"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicMontoLimite">
        <Form.Label>Monto límite</Form.Label>
        <Form.Control
          onChange={onChangeExpectedAmount}
          name="expectedAmount"
          type="number"
          placeholder="Ejemplo: 15000"
        />
      </Form.Group>
      <div className="d-grid gap-2">
        <Stack gap={2} className="col-md-5 mx-auto">
          <Button variant="primary" type="submit">
            Guardar
          </Button>
          <Button variant="danger" onClick={() => onCancelOperation()}>
            Cancelar
          </Button>
        </Stack>
      </div>
    </Form>
  );
};

export default BudgetForm;
