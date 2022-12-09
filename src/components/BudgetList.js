import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";

import ExpensesList from "./ExpensesList";

const BudgetList = ({ budgets }) => {
  const [expenses, setExpenses] = useState([]);

  const totales = budgets.map((budget) => budget.spentAmount);

  const totalSpent = totales.reduce(
    (acc, currentValue) => acc + currentValue,
    0
  );

  const getExpenses = async (budgetId) => {
    if (window.localStorage.getItem("auth-token") !== null) {
      axios.defaults.headers.common["auth-token"] =
        window.localStorage.getItem("auth-token");
      const { data } = await axios.get("http://localhost:3001/api/v1/expenses");

      const expensesByBudgetId = data.data.filter(
        (expense) => expense.budget._id === budgetId
      );

      setExpenses(expensesByBudgetId);
      console.log(expensesByBudgetId);
    }
  };

  const budgetList = budgets.map((budget) => {
    return (
      <Card key={budget._id} className="text-center mb-4">
        <Card.Header>{budget.name}</Card.Header>
        <Card.Body>
          <Card.Title>${budget.leftAmount}</Card.Title>
          <Card.Text>Gastado hasta ahora ${budget.spentAmount}</Card.Text>
          <Button variant="success" onClick={() => getExpenses(budget._id)}>
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
  };

  return (
    <>
      <div>
        {expenses.length > 0 && (
          <div>
            <a href="#volver" onClick={() => onVolver()}>
              Volver
            </a>
            <ExpensesList expenses={expenses} />
          </div>
        )}
      </div>
      <div>
        {expenses.length === 0 && (
          <div>
            <h2 className="text-center">Presupuestos</h2>
            <p>Total gastado hasta hoy: ${totalSpent}</p>
            {budgets.length > 0 && budgetList}
          </div>
        )}
      </div>
    </>
  );
};

export default BudgetList;
