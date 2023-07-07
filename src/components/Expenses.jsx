import { Card, Row, Col, Button, Stack, Placeholder } from "react-bootstrap";

import { useQuery } from "react-query";

// components
import Expense from "./Expense";

// custom hooks
import { useExpenseContext } from "../hooks/useExpenseContext";
import { useBudgetContext } from "../hooks/useBudgetContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Expenses = () => {
  const { getAllExpenses } = useExpenseContext();
  const { getBudgets } = useBudgetContext();

  const [budgetId, setBudgetId] = useState(null);

  const navigate = useNavigate();

  // Queries
  const { data: expenses, isLoading } = useQuery({
    queryKey: ["allExpenses", { budget: budgetId }],
    queryFn: getAllExpenses,
  });

  const { data: budgets } = useQuery({
    queryKey: ["budgets"],
    queryFn: getBudgets,
  });

  const expensesList = expenses?.map((expense, i) => {
    return (
      <div key={expense._id} className="mb-3">
        <Expense
          expense={expense}
          budget={budgets?.find((b) => b._id === expense.budget._id)}
        />
      </div>
    );
  });

  return (
    <>
      {!isLoading && expenses?.length > 0 && (
        <Row>
          <Col>
            <Card style={{ backgroundColor: "white", border: "none" }}>
              <Card.Body style={{ wordBreak: "break-all" }}>
                <Card.Text>Filtrar por presupuesto:</Card.Text>
                {budgetId === null && (
                  <Button
                    onClick={() => setBudgetId(null)}
                    variant="outline-success"
                    className="me-2 mb-2"
                    active
                  >
                    Todos
                  </Button>
                )}
                {budgetId !== null && (
                  <Button
                    onClick={() => setBudgetId(null)}
                    variant="outline-success"
                    className="me-2 mb-2"
                  >
                    Todos
                  </Button>
                )}

                {budgets?.map((b) => {
                  if (budgetId === b._id) {
                    return (
                      <Button
                        key={b._id}
                        onClick={() => setBudgetId(b._id)}
                        variant="outline-success"
                        className="me-2 mb-2"
                        active
                      >
                        {b.name}
                      </Button>
                    );
                  } else {
                    return (
                      <Button
                        key={b._id}
                        onClick={() => setBudgetId(b._id)}
                        variant="outline-success"
                        className="me-2 mb-2"
                      >
                        {b.name}
                      </Button>
                    );
                  }
                })}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      <div className="mt-3">
        <div>
          <p
            className="text-muted"
            style={{
              paddingLeft: 2,
              paddingBottom: 4,
              marginBottom: 0,
            }}
          >
            Movimientos
          </p>
          {isLoading && (
            <>
              <Row>
                <Col>
                  <Card
                    className="mb-3"
                    border="light"
                    style={{ backgroundColor: "white" }}
                  >
                    <Card.Body>
                      <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={6} />
                      </Placeholder>
                      <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={4} />
                      </Placeholder>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card
                    className="mb-3"
                    border="light"
                    style={{ backgroundColor: "white" }}
                  >
                    <Card.Body>
                      <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={6} />
                      </Placeholder>
                      <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={4} />
                      </Placeholder>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </>
          )}
          {!isLoading && expenses?.length > 0 && expensesList}
        </div>
        {expenses?.length === 0 && (
          <div>
            <Card
              border="light"
              style={{ backgroundColor: "white" }}
              className="py-2"
            >
              <Card.Body>
                <Stack direction="horizontal" gap={3}>
                  <span>
                    <Card.Title className="mb-0">
                      No gastos creados aún 😄.{" "}
                      <Button
                        onClick={() => navigate("/expenses/add")}
                        variant="link"
                      >
                        Crear nuevo gasto
                      </Button>
                    </Card.Title>
                  </span>
                </Stack>
              </Card.Body>
            </Card>
          </div>
        )}
      </div>
    </>
  );
};

export default Expenses;
