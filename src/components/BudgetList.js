import React from "react";
import { Card, Button } from "react-bootstrap";

const BudgetList = ({ budgets }) => {
  const totales = budgets.map((budget) => budget.spentAmount);

  const totalSpent = totales.reduce(
    (acc, currentValue) => acc + currentValue,
    0
  );

  const budgetList = budgets.map((budget) => {
    return (
      <Card key={budget._id} className="text-center mb-4">
        <Card.Header>{budget.name}</Card.Header>
        <Card.Body>
          <Card.Title>${budget.leftAmount}</Card.Title>
          <Card.Text>Gastado hasta ahora ${budget.spentAmount}</Card.Text>
          <Button variant="success">Cargar gasto</Button>
        </Card.Body>
        <Card.Footer className="text-muted">
          Monto máximo ${budget.expectedAmount}
        </Card.Footer>
      </Card>
    );
  });

  return (
    <div>
      <h2 className="text-center">Presupuestos</h2>
      <p>Total gastado hasta hoy: ${totalSpent}</p>
      {budgets.length > 0 && budgetList}
    </div>
  );
};

export default BudgetList;
