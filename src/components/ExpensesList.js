import React from "react";
import { useContext } from "react";
import { Card, Button, Stack } from "react-bootstrap";
import { format } from "date-fns";

import ExpenseForm from "./ExpenseForm";

import { ExpenseContext } from "../context/ExpenseContext";

import { BudgetContext } from "../context/BudgetContext";

const ExpensesList = () => {
  const {
    expenses,
    selectedBudget,
    handleShowExpenseList,
    handleShowExpenseForm,
    showExpenseForm,
    showExpensesList,
  } = useContext(ExpenseContext);

  const { handleShowBudgetList } = useContext(BudgetContext);

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
    handleShowExpenseForm(true);
    handleShowExpenseList(false);
  };

  const handleUpdateExpenses = (newExpense) => {
    // handleChangeExpenses(newExpense);
  };

  const handleVolver = () => {
    // onVolver();
  };

  return (
    <div>
      {showExpenseForm && <ExpenseForm />}
      {showExpensesList && (
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
        {expenses.length > 0 && expensesList}
        {expenses.length === 0 && (
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
