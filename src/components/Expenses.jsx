import { Card, Row, Col, Button, Stack, Placeholder } from "react-bootstrap";

import { useQuery } from "react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import Expense from "./Expense";

// custom hooks
import { useExpenseContext } from "../hooks/useExpenseContext";
import { useBudgetContext } from "../hooks/useBudgetContext";
import { useCurrencyContext } from "../hooks/useCurrencyContext";

const Expenses = () => {
  const { getAllExpenses } = useExpenseContext();
  const { getBudgets } = useBudgetContext();

  const [budgetId, setBudgetId] = useState(null);

  const { getCurrencyPrice, currencyType } = useCurrencyContext();

  const { data: currency } = useQuery({
    queryKey: ["currency", { type: "blue" }],
    queryFn: getCurrencyPrice,
  });

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
          currency={currency}
          currencyType={currencyType}
        />
      </div>
    );
  });

  return (
    <>
      <Row>
        <Col md={4} sm={12} lg={3}>
          <Row className="mb-sm-4">
            <Col>
              <p
                className="text-muted mt-sm-2 mt-md-4"
                style={{
                  paddingLeft: 2,
                  paddingBottom: 4,
                  marginBottom: 0,
                }}
              ></p>
              <Card
                style={{ backgroundColor: "white", border: "none" }}
                className="shadow-sm mb-3 bg-body rounded"
              >
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
        </Col>
        <Col>
          <div>
            <div>
              <p
                className="text-muted mt-2 mt-md-0"
                style={{
                  paddingLeft: 2,
                  paddingBottom: 4,
                  marginBottom: 0,
                }}
              >
                Transacciones
              </p>
              {isLoading && (
                <>
                  <Row>
                    <Col>
                      <Card
                        className="mb-3 shadow-sm bg-body rounded"
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
                        className="mb-3 shadow-sm bg-body rounded"
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
                  className="shadow-sm py-2 mb-3 bg-body rounded"
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
        </Col>
      </Row>
    </>
  );
};

export default Expenses;
