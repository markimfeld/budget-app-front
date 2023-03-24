import React from "react";
import { useState } from "react";
import { Card, Button, Stack } from "react-bootstrap";
import { format } from "date-fns";

import ExpenseForm from "./ExpenseForm";

const ExpensesList = ({
  expenses,
  selectedBudget,
  handleChangeExpenses,
  onVolver,
}) => {
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showExpenseList, setShowExpenseList] = useState(true);

  const expensesList = expenses.map((expense) => {
    return (
      <Card key={expense._id} className="mb-4">
        <Card.Body>
          <Stack direction="horizontal" gap={3}>
            <span>
              <Card.Title>{expense.name}</Card.Title>
              <Card.Text className="m-0 p-0">{expense.description}</Card.Text>
              <Card.Text className="text-muted">
                {format(new Date(expense.createdAt), "dd/MM/yyyy kk:mm")}
              </Card.Text>
            </span>
            <Card.Title className="ms-auto">${expense.amount}</Card.Title>
          </Stack>
        </Card.Body>
        {/* <Card.Footer className="text-muted">
          Realizado el{" "}
          
        </Card.Footer> */}
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

  const handleVolver = () => {
    onVolver();
  };

  return (
    <div>
      {showExpenseForm && (
        <ExpenseForm
          selectedBudget={selectedBudget}
          handleShowExpenseFormChange={handleShowExpenseFormChange}
          handleUpdateExpenses={handleUpdateExpenses}
          handleVolver={handleVolver}
        />
      )}
      {showExpenseList && (
        <Card border="dark" className="mb-3">
          <Card.Body>
            <Stack direction="horizontal" gap={3}>
              <div>
                <Card.Title>{selectedBudget.name}</Card.Title>
                <Card.Text className="text-muted">
                  Disponible: ${selectedBudget.leftAmount}
                </Card.Text>
              </div>
              <Stack direction="vertical" gap={2}>
                <Button
                  className="ms-auto"
                  variant="outline-secondary"
                  onClick={handleNewExpense}
                >
                  Nuevo gasto
                </Button>
                <Button
                  className="ms-auto"
                  variant="outline-danger"
                  onClick={handleVolver}
                >
                  Volver
                </Button>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      )}
      <div className="mt-3">
        {expenses.length > 0 && showExpenseList && expensesList}
        {expenses.length === 0 && showExpenseList && (
          <Card className="mb-4">
            <Card.Body>
              <Card.Text>
                No hay gastos creados aun.{" "}
                <Button onClick={handleNewExpense} variant="link">
                  Crear nuevo gasto
                </Button>
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ExpensesList;
