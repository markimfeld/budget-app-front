import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";

import ExpensesList from "./ExpensesList";
import BudgetForm from "./BudgetForm";

import expenseService from "../services/expense";

const BudgetList = ({
  budgets,
  showBudgetList,
  showBudgetForm,
  onHandleRenderBudgetForm,
  user,
}) => {
  const [expenses, setExpenses] = useState([]);
  const [showExpensesList, setShowExpensesList] = useState(false);

  const totales = budgets.map((budget) => budget.spentAmount);

  const totalSpent = totales.reduce(
    (acc, currentValue) => acc + currentValue,
    0
  );

  const getExpenses = async (budgetId) => {
    if (user !== null) {
      const config = {
        headers: {
          Authorization: `${user.accessToken}`,
        },
      };
      try {
        const { data } = await expenseService.getAll(config);

        const expensesByBudgetId = data.filter(
          (expense) => expense.budget._id === budgetId
        );

        setExpenses(expensesByBudgetId);
        setShowExpensesList(true);
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
          <Button variant="primary" onClick={() => getExpenses(budget._id)}>
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

  return (
    <>
      <div>
        {showExpensesList && (
          <div>
            <h2 className="text-center mb-3">Gastos</h2>
            <ExpensesList expenses={expenses} />
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
            <BudgetForm onShowBudgetForm={onCancel} />
          </div>
        )}
      </div>
    </>
  );
};

export default BudgetList;
