import React from "react";
import { Card, Button } from "react-bootstrap";
import { format } from "date-fns";

const ExpensesList = ({ expenses }) => {
  const expensesList = expenses.map((expense) => {
    return (
      <Card key={expense._id} className="text-center mb-4">
        <Card.Header>{expense.name}</Card.Header>
        <Card.Body>
          <Card.Title>${expense.amount}</Card.Title>
        </Card.Body>
        <Card.Footer className="text-muted">
          Realizado el{" "}
          {format(new Date(expense.createdAt), "dd/MM/yyyy kk:mm:ss")}
        </Card.Footer>
      </Card>
    );
  });

  return <div>{expenses.length > 0 && expensesList}</div>;
};

export default ExpensesList;
