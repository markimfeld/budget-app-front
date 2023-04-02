import React from "react";
import { useContext } from "react";
import { Card, Button, Stack } from "react-bootstrap";

import { BudgetContext } from "../context/BudgetContext";
import { ExpenseContext } from "../context/ExpenseContext";

const Budget = ({ budget }) => {
  const { getExpenses } = useContext(ExpenseContext);
  const { handleDeleteBudget } = useContext(BudgetContext);

  const handleGetExpenses = (budget) => {
    getExpenses(budget);
  };

  return (
    <>
      <Card className="mb-4">
        <Card.Header>
          <Stack direction="horizontal" gap={3}>
            <span>{budget.name}</span>

            <Button
              className="ms-auto"
              variant="outline-secondary"
              onClick={() => handleGetExpenses(budget)}
            >
              <i className="fa-solid fa-list"></i>
            </Button>
            <Button
              className=""
              variant="outline-danger"
              onClick={() => handleDeleteBudget(budget)}
            >
              <i className="fa-solid fa-trash"></i>
            </Button>
          </Stack>
        </Card.Header>
        <Card.Body>
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
