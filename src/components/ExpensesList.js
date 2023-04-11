import React from "react";
import { useContext } from "react";
import { Card, Button, Stack } from "react-bootstrap";

import ExpenseForm from "./ExpenseForm";
import Success from "../components/Success";
import Expense from "./Expense";

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
    handleSelectedBudget,
    messageExpense,
  } = useContext(ExpenseContext);

  const { handleShowBudgetList } = useContext(BudgetContext);

  const expensesList = expenses.map((expense, i) => {
    if (i === expenses.length - 1) {
      return (
        <div key={expense._id}>
          <Expense expense={expense} />
        </div>
      );
    } else {
      return (
        <div key={expense._id} className="mb-2">
          <Expense expense={expense} />
        </div>
      );
    }
  });

  const handleNewExpense = (showForm) => {
    handleShowExpenseForm(showForm);
    handleShowExpenseList(!showForm);
    handleShowBudgetList(!showForm);
    handleSelectedBudget(selectedBudget);
  };

  const handleVolver = (showList) => {
    handleShowExpenseList(!showList);
    handleShowExpenseForm(!showList);
    handleShowBudgetList(showList);
  };

  return (
    <>
      <div>
        {showExpensesList && (
          <Card
            border="light"
            className="mb-3"
            // bg="light"
            style={{ backgroundColor: "hsl(0, 0%, 97%)" }}
          >
            <Card.Body>
              <Stack direction="horizontal" gap={3}>
                <div>
                  <Card.Title>{selectedBudget.name}</Card.Title>
                  <Card.Text className="text-muted">
                    Disponible: ${selectedBudget.leftAmount}
                  </Card.Text>
                </div>
                <Stack direction="horizontal" gap={3} className="ms-auto">
                  <Button
                    className="ms-auto"
                    size="sm"
                    variant="outline-secondary"
                    onClick={() => handleNewExpense(true)}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </Button>
                  <Button
                    className=""
                    size="sm"
                    variant="outline-secondary"
                    onClick={() => handleVolver(true)}
                  >
                    <i className="fa-solid fa-angle-left"></i>
                  </Button>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        )}
      </div>
      <div className="mt-3">
        {messageExpense !== null && <Success />}
        {expenses.length > 0 && showExpensesList && (
          <div>
            <p
              className="text-muted"
              style={{
                paddingLeft: 5,
                paddingBottom: 0,
                marginBottom: 0,
              }}
            >
              Movimientos
            </p>
            <Card
              border="light"
              className="p-2 mb-5"
              style={{ backgroundColor: "hsl(0, 0%, 97%)" }}
            >
              {expensesList}
            </Card>
          </div>
        )}
        {expenses.length === 0 && showExpensesList && (
          <Card className="mb-4">
            <Card.Body>
              <Card.Text>
                No hay gastos creados aun.{" "}
                <Button onClick={() => handleNewExpense(true)} variant="link">
                  Crear nuevo gasto
                </Button>
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </div>
      <div>{showExpenseForm && <ExpenseForm />}</div>
    </>
  );
};

export default ExpensesList;
