import React from "react";
import { useState } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";

const ExpenseForm = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [budget, setBudget] = useState(null);

  const onSubmitExpense = () => {};

  const onChangeName = () => {};

  const onChangeAmount = () => {};

  const onCancelOperation = () => {};

  return (
    <Form onSubmit={onSubmitExpense}>
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
          onChange={onChangeAmount}
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

export default ExpenseForm;
