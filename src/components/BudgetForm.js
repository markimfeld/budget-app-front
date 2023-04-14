import React, { useContext } from "react";
import { useState } from "react";
import { Form, Button, Stack, Card, FloatingLabel } from "react-bootstrap";

import Error from "./Error";

import budgetService from "../services/budget";

import { BudgetContext } from "../context/BudgetContext";
import { UserContext } from "../context/UserContext";

const BudgetForm = () => {
  const { user, logout, error, handleSetError } = useContext(UserContext);
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
      : ""
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
        try {
          const data = await budgetService.store(newBudget, config);
          handleUpdateBudgets(data.data);
          handleShowBudgetForm(false);
          handleShowBudgetList(true);
          handleSetMessageBudget("Nuevo presupuesto creado exitosamente!");
        } catch (error) {
          if (
            error.response.data.status === 400 &&
            error.response.data.message === "Token no válido"
          ) {
            logout();
          }
          if (
            error.response.data.status === 400 &&
            error.response.data.message ===
              "The name and expectedAmount are required"
          ) {
            console.log("Hay campos requeridos");
            handleSetError(error.response.data);
            setTimeout(() => {
              handleSetError(null);
            }, 2500);
          }
        }
      } else {
        let budgetUpdated = { ...budgetToUpdate };
        budgetUpdated.expectedAmount = Number.parseFloat(expectedAmount);
        budgetUpdated.name = name;
        budgetUpdated.leftAmount =
          Number.parseFloat(expectedAmount) - budgetUpdated.spentAmount;

        try {
          const data = await budgetService.update(
            budgetToUpdate._id,
            budgetUpdated,
            config
          );

          handleUpdateBudgets(data.data);
          handleShowBudgetForm(false);
          handleShowBudgetList(true);
          handleSetMessageBudget("Presupuesto editado exitosamente!");
        } catch (error) {
          if (error.response.data.message === "Token no válido") {
            logout();
          }
        }
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
    <Card style={{ border: "none", backgroundColor: "hsl(0, 0%, 97%, 0.5)" }}>
      {error !== null && <Error />}
      <Card.Header style={{ border: "none" }}>
        <Card.Title className="text-center fs-3">
          {!isEditing && "Nuevo presupuesto"}
          {isEditing && "Modificar presupuesto"}
        </Card.Title>
      </Card.Header>
      <Card.Body className="p-4">
        <Form onSubmit={handleAddBudget}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <FloatingLabel
              controlId="floatingName"
              label="Nombre del presupuesto"
            >
              <Form.Control
                name="name"
                value={name}
                onChange={onChangeName}
                type="text"
                placeholder="Comida"
                // required
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicExpectedAmount">
            <FloatingLabel
              controlId="floatingExpectedAmount"
              label="Monto previsto"
            >
              <Form.Control
                name="expectedAmount"
                value={expectedAmount}
                onChange={onChangeExpectedAmount}
                type="number"
                placeholder="15000"
                // required
              />
            </FloatingLabel>
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
