import React from "react";
import { useState } from "react";
import { Card, Button, Stack } from "react-bootstrap";

import ExpensesList from "./ExpensesList";
import BudgetForm from "./BudgetForm";

import Success from "./Success";

import expenseService from "../services/expense";

const BudgetList = ({
  budgets,
  showBudgetList,
  showBudgetForm,
  onHandleRenderBudgetForm,
  user,
  handleUpdateBudgets,
}) => {
  const [expenses, setExpenses] = useState([]);
  const [showExpensesList, setShowExpensesList] = useState(false);
  const [message, setMessage] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);

  const totales = budgets.map((budget) => budget.spentAmount);

  const totalSpent = totales.reduce(
    (acc, currentValue) => acc + currentValue,
    0
  );

  const getExpenses = async (budget) => {
    if (user !== null) {
      const config = {
        headers: {
          Authorization: `${user.accessToken}`,
        },
      };
      try {
        const { data } = await expenseService.getAll(config);

        const expensesByBudgetId = data.filter(
          (expense) => expense.budget._id === budget._id
        );

        setExpenses(expensesByBudgetId);
        setShowExpensesList(true);
        setSelectedBudget(budget);
      } catch (error) {
        console.log(error);
      }
    }
  };

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
    setExpenses([]);
    setShowExpensesList(false);
  };

  const onCancel = (showBudgetForm) => {
    onHandleRenderBudgetForm(showBudgetForm);
  };

  const handleBudgetUpdate = (newBudget) => {
    handleUpdateBudgets(newBudget);
    setMessage("Nuevo presupuesto agregado exitosamente!");

    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleChangeExpenses = (newExpense) => {
    setExpenses([newExpense, ...expenses]);
  };

  return (
    <>
      {message !== null && <Success message={message} />}
      <div>
        {showExpensesList && (
          <div>
            <ExpensesList
              expenses={expenses}
              selectedBudget={selectedBudget}
              handleChangeExpenses={handleChangeExpenses}
            />
            <Button variant="secondary" onClick={() => onVolver()}>
              Volver
            </Button>
          </div>
        )}
      </div>
      <div>
        {showBudgetList && !showExpensesList && (
          <div>
            <Card className="mb-3">
              <Card.Body>
                <p className="m-0 mb-1">Balance</p>
                <h3 className="ms-auto">${totalSpent}</h3>
              </Card.Body>
            </Card>
            {budgets.length > 0 && budgetList}
          </div>
        )}
      </div>
      <div>
        {showBudgetForm && (
          <div>
            <h2 className="text-center">Nuevo presupuesto</h2>
            <BudgetForm
              onShowBudgetForm={onCancel}
              handleBudgetUpdate={handleBudgetUpdate}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default BudgetList;
