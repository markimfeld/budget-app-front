import React, { useContext } from "react";
import { useState } from "react";
import { Form, Button, Stack, Card } from "react-bootstrap";

import budgetService from "../services/budget";

import { BudgetContext } from "../context/BudgetContext";
import { UserContext } from "../context/UserContext";

const BudgetForm = () => {
  const { user } = useContext(UserContext);
  const {
    handleUpdateBudgets,
    handleShowBudgetForm,
    handleShowBudgetList,
    handleSetMessageBudget,
    budgetToUpdate,
    isEditing,
    handleIsEditing,
  } = useContext(BudgetContext);

  const [name, setName] = useState(
    isEditing && budgetToUpdate.name ? budgetToUpdate.name : ""
  );
  const [expectedAmount, setExpectedAmount] = useState(
    isEditing && budgetToUpdate.expectedAmount
      ? budgetToUpdate.expectedAmount
      : null
  );

  const handleAddBudget = async (event) => {
    event.preventDefault();
    if (user !== null) {
      const config = {
        headers: {
          Authorization: `${user.accessToken}`,
        },
      };

      const newBudget = { name, expectedAmount };

      if (!isEditing) {
        const data = await budgetService.store(newBudget, config);

        handleUpdateBudgets(data.data);
        handleShowBudgetForm(false);
        handleShowBudgetList(true);
        handleSetMessageBudget("Nuevo presupuesto creado exitosamente!");
      } else {
        let budgetUpdated = { ...budgetToUpdate };
        budgetUpdated.expectedAmount = Number.parseFloat(expectedAmount);
        budgetUpdated.name = name;
        budgetUpdated.leftAmount =
          Number.parseFloat(expectedAmount) - budgetUpdated.spentAmount;

        const data = await budgetService.update(
          budgetToUpdate._id,
          budgetUpdated,
          config
        );

        handleUpdateBudgets(data.data);
        handleShowBudgetForm(false);
        handleShowBudgetList(true);
        handleSetMessageBudget("Presupuesto editado exitosamente!");
      }
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
    handleShowBudgetList(true);
    handleIsEditing(false);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title className="text-center">
          {!isEditing && "Nuevo presupuesto"}
          {isEditing && "Modificar presupuesto"}
        </Card.Title>
        <Form onSubmit={handleAddBudget}>
          <Form.Group className="mb-3" controlId="formBasicNombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              onChange={onChangeName}
              name="name"
              type="text"
              placeholder="Ejemplo: Comida"
              value={name}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicMontoLimite">
            <Form.Label>Monto límite</Form.Label>
            <Form.Control
              onChange={onChangeExpectedAmount}
              name="expectedAmount"
              type="number"
              placeholder="Ejemplo: $15000.00"
              value={expectedAmount}
            />
          </Form.Group>
          <div className="d-grid gap-2">
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
