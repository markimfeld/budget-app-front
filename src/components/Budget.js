import React from "react";
import { useContext } from "react";
import { Card, Button, Stack } from "react-bootstrap";

import { BudgetContext } from "../context/BudgetContext";
import { ExpenseContext } from "../context/ExpenseContext";

const Budget = ({ budget }) => {
  const { getExpenses } = useContext(ExpenseContext);
  const {
    handleDeleteBudget,
    handleBudgetToUpdate,
    handleShowBudgetForm,
    handleShowBudgetList,
    handleIsEditing,
  } = useContext(BudgetContext);

  const handleGetExpenses = (budget) => {
    getExpenses(budget);
  };

  const handleEdit = (budget) => {
    handleBudgetToUpdate(budget);
    handleShowBudgetForm(true);
    handleShowBudgetList(false);
    handleIsEditing(true);
  };

  return (
    <>
      <Card className="mb-4" style={{ border: "none" }}>
        <Card.Header style={{ border: "none" }}>
          <Stack direction="horizontal" gap={3}>
            <span>{budget.name}</span>

            <Button
              className="ms-auto"
              size="sm"
              variant="outline-secondary"
              onClick={() => handleGetExpenses(budget)}
            >
              <i className="fa-solid fa-list"></i>
            </Button>
            <Button
              size="sm"
              variant="outline-secondary"
              onClick={() => handleEdit(budget)}
            >
              <i className="fa-solid fa-pen"></i>
            </Button>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => handleDeleteBudget(budget)}
            >
              <i className="fa-solid fa-trash"></i>
            </Button>
          </Stack>
        </Card.Header>
        <Card.Body style={{ backgroundColor: "hsl(0, 0%, 97%, 0.5)" }}>
          <Card.Title>${budget.spentAmount} </Card.Title>
          <Card.Text className="text-muted m-0 p-0">
            Monto disponible ${budget.leftAmount}
          </Card.Text>
          <Card.Text className="text-muted">
            Monto límite ${budget.expectedAmount}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Budget;
