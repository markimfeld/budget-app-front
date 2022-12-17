import React from "react";
import { useState } from "react";
import { Card, Button } from "react-bootstrap";

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
      <Card key={budget._id} className="text-center mb-4">
        <Card.Header>{budget.name}</Card.Header>
        <Card.Body>
          <Card.Title>${budget.leftAmount}</Card.Title>
          <Card.Text>Gastado hasta ahora ${budget.spentAmount}</Card.Text>
          <Button variant="primary" onClick={() => getExpenses(budget)}>
            Ver detalle
          </Button>
        </Card.Body>
        <Card.Footer className="text-muted">
          Monto máximo ${budget.expectedAmount}
        </Card.Footer>
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
    setExpenses([...expenses, newExpense]);
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
            <h2 className="text-center">Presupuestos</h2>
            <p>Total gastado hasta hoy: ${totalSpent}</p>
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
