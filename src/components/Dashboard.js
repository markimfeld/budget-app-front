import React from "react";

import { useContext } from "react";

import { Card, Button, Stack, Row, Col } from "react-bootstrap";

import { BudgetContext } from "../context/BudgetContext";

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const Dashboard = () => {
  const {
    budgets,
    filters,
    getCurrentMonthBudgets,
    getNextMonthBudgets,
    getPreviuosMonthBudgets,
  } = useContext(BudgetContext);

  const spentTotal = budgets.map((budget) => budget.spentAmount);

  const expectedTotal = budgets.map((budget) => budget.expectedAmount);

  const spentTotals = spentTotal.reduce(
    (acc, currentValue) => acc + currentValue,
    0
  );

  const expectedTotals = expectedTotal.reduce(
    (acc, currentValue) => acc + currentValue,
    0
  );

  const handleCurrentMonth = () => {
    getCurrentMonthBudgets();
  };

  const handleNextMonth = () => {
    getNextMonthBudgets();
  };

  const handlePreviusMonth = () => {
    getPreviuosMonthBudgets();
  };

  return (
    <>
      <Row>
        <Col>
          <Card className="mb-3" bg="light" text="dark">
            <Card.Body>
              <Stack direction="horizontal" gap={3}>
                <Card.Title>
                  {months[filters.month - 1]} {filters.year}
                </Card.Title>
                <Button
                  className="ms-auto"
                  variant="outline-secondary"
                  size="sm"
                  onClick={handlePreviusMonth}
                >
                  <i className="fa-solid fa-arrow-left"></i>
                </Button>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={handleCurrentMonth}
                >
                  <i className="fa-solid fa-calendar"></i>
                </Button>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={handleNextMonth}
                >
                  <i className="fa-solid fa-arrow-right"></i>
                </Button>
              </Stack>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="mb-3" border="dark">
            <Card.Body>
              <p className="m-0 mb-1">Presupuestado</p>
              <h3 className="ms-auto">${expectedTotals}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="mb-3" border="danger">
            <Card.Body>
              <p className="m-0 mb-1">Gastado</p>
              <h3 className="ms-auto">${spentTotals}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="mb-3" border="success">
            <Card.Body>
              <p className="m-0 mb-1">Balance</p>
              <h3 className="ms-auto">${expectedTotals - spentTotals}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
