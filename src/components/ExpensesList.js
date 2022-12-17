import React from "react";
import { useState } from "react";
import { Card, Button, Stack } from "react-bootstrap";
import { format } from "date-fns";

import ExpenseForm from "./ExpenseForm";

const ExpensesList = ({ expenses, selectedBudget, handleChangeExpenses }) => {
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showExpenseList, setShowExpenseList] = useState(true);

  const expensesList = expenses.map((expense) => {
    return (
      <Card key={expense._id} className="text-center mb-4">
        <Card.Header>{expense.name}</Card.Header>
        <Card.Body>
          <Card.Title>${expense.amount}</Card.Title>
        </Card.Body>
        <Card.Footer className="text-muted">
          Realizado el
          {format(new Date(expense.createdAt), "dd/MM/yyyy kk:mm:ss")}
        </Card.Footer>
      </Card>
    );
  });

  const handleNewExpense = () => {
    console.log("New expense");
    setShowExpenseForm(true);
    setShowExpenseList(false);
  };

  const handleShowExpenseFormChange = (shouldShowExpenseList) => {
    setShowExpenseList(shouldShowExpenseList);
    setShowExpenseForm(!shouldShowExpenseList);
  };

  const handleUpdateExpenses = (newExpense) => {
    handleChangeExpenses(newExpense);
  };

  return (
    <div>
      {showExpenseForm && (
        <ExpenseForm
          selectedBudget={selectedBudget}
          handleShowExpenseFormChange={handleShowExpenseFormChange}
          handleUpdateExpenses={handleUpdateExpenses}
        />
      )}
      {showExpenseList && (
        <Stack direction="horizontal" gap={3}>
          <h3 className="ms-auto">{selectedBudget.name}</h3>
          <Button
            className="ms-auto"
            variant="primary"
            onClick={handleNewExpense}
          >
            Nuevo gasto
          </Button>
        </Stack>
      )}
      <div className="mt-3">
        {expenses.length > 0 && showExpenseList && expensesList}
      </div>
    </div>
  );
};

export default ExpensesList;
