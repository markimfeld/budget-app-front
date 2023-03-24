import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Form, Button, Stack, Card } from "react-bootstrap";

import budgetService from "../services/budget";

import { BudgetContext } from "../context/BudgetContext";

const BudgetForm = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [expectedAmount, setExpectedAmount] = useState(0);

  const { handleUpdateBudgets, handleShowBudgetForm } =
    useContext(BudgetContext);

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

      handleUpdateBudgets(data.data);
      handleShowBudgetForm(false);
    }
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeExpectedAmount = (e) => {
    setExpectedAmount(e.target.value);
  };

  const onCancelOperation = () => {
    handleShowBudgetForm(false);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title className="text-center">Nuevo presupuesto</Card.Title>
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
              placeholder="Ejemplo: $15000.00"
            />
          </Form.Group>
          <div className="d-grid gap-2">
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
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BudgetForm;
