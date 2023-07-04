import { Card, Row, Col, Button, Stack } from "react-bootstrap";

import { useQuery } from "react-query";

// components
import Expense from "./Expense";

// custom hooks
import { useExpenseContext } from "../hooks/useExpenseContext";
import { useBudgetContext } from "../hooks/useBudgetContext";
import { useState } from "react";

const Expenses = () => {
  const { getAllExpenses } = useExpenseContext();
  const { getBudgets } = useBudgetContext();

  const [budgetId, setBudgetId] = useState(null);

  // Queries
  const { data: expenses } = useQuery({
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
      <Row>
        <Col>
          <Card style={{ backgroundColor: "white", border: "none" }}>
            <Card.Body style={{ wordBreak: "break-all" }}>
              <Button onClick={() => setBudgetId(null)} variant="link">
                Todos
              </Button>
              {budgets?.map((b) => {
                return (
                  <Button
                    key={b._id}
                    onClick={() => setBudgetId(b._id)}
                    variant="link"
                  >
                    {b.name}
                  </Button>
                );
              })}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="mt-3">
        {expenses?.length > 0 && (
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
            {expensesList}
          </div>
        )}
        {expenses?.length === 0 && (
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
            <Card
              border="light"
              style={{ backgroundColor: "white" }}
              className="py-2"
            >
              <Card.Body>
                <Stack direction="horizontal" gap={3}>
                  <span>
                    <Card.Title className="mb-0">
                      No se encontraron resultados 😄.
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
