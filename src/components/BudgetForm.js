import axios from "axios";
import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const BudgetForm = ({ onCancel }) => {
  const [name, setName] = useState("");
  const [expectedAmount, setExpectedAmount] = useState(0);

  const addBudget = async () => {
    if (window.localStorage.getItem("auth-token") !== null) {
      axios.defaults.headers.common["auth-token"] =
        window.localStorage.getItem("auth-token");

      const endpoint = "http://localhost:3001/api/v1/budgets";
      const newBudget = { name, expectedAmount };

      const { data } = await axios.post(
        "http://localhost:3001/api/v1/budgets",
        newBudget
      );

      console.log(data);
    }
  };

  const onChangeName = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const onChangeExpectedAmount = (e) => {
    console.log(e.target.value);
    setExpectedAmount(e.target.value);
  };

  const onSubmitBudget = (e) => {
    e.preventDefault();
    console.log("Submitted");
    console.log(name);
    console.log(expectedAmount);
    addBudget();
    window.location.reload();
  };

  const onCancelOperation = () => {
    onCancel(true);
  };

  return (
    <Form onSubmit={onSubmitBudget}>
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
        <Button variant="primary" type="submit">
          Guardar
        </Button>
        <Button variant="danger" onClick={() => onCancelOperation()}>
          Cancelar
        </Button>
      </div>
    </Form>
  );
};

export default BudgetForm;
