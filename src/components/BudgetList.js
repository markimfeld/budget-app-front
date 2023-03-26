import React from "react";
import { useContext } from "react";
import { Card, Button, Stack } from "react-bootstrap";

import ExpensesList from "./ExpensesList";
import BudgetForm from "./BudgetForm";

import Success from "./Success";

import { BudgetContext } from "../context/BudgetContext";
import { ExpenseContext } from "../context/ExpenseContext";

const BudgetList = () => {
  const { budgets, showBudgetForm, showBudgetList } = useContext(BudgetContext);
  const { expenses, getExpenses, showExpensesList, selectedBudget } =
    useContext(ExpenseContext);

  const budgetList = budgets.map((budget) => {
    return (
      <Card key={budget._id} className="mb-4">
        <Card.Header>
          <Stack direction="horizontal" gap={3}>
            <span>{budget.name}</span>
            <Button
              className="ms-auto"
              variant="outline-secondary"
              onClick={() => getExpenses(budget)}
            >
              Ver detalle
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
    );
  });

  const onVolver = () => {
    // setExpenses([]);
    // setShowExpensesList(false);
  };

  const handleChangeExpenses = (newExpense) => {
    // setExpenses([newExpense, ...expenses]);
  };

  return (
    <>
      {/* {message !== null && <Success message={message} />} */}
      <div>
        {showExpensesList && (
          <div>
            <ExpensesList />
          </div>
        )}
      </div>
      <div>
        {showBudgetList && (
          <div>
            {budgets.length > 0 && budgetList}
            {/* {budgets.length === 0 && (
          <Card className="mb-4">
            <Card.Body>
              <Card.Text>
                No hay presupuestos creados aun.{" "}
                <Button
                  onClick={() => handleRenderNewBudgetForm(true)}
                  variant="link"
                >
                  Crear nuevo presupuesto
                </Button>
              </Card.Text>
            </Card.Body>
          </Card>
        )} */}
          </div>
        )}
      </div>
      <div>
        {showBudgetForm && (
          <div>
            <BudgetForm />
          </div>
        )}
      </div>
    </>
  );
};

export default BudgetList;
