import { Card } from "react-bootstrap";

import { useQuery } from "react-query";

// components
import Expense from "./Expense";

// custom hooks
import { useExpenseContext } from "../hooks/useExpenseContext";
import { useBudgetContext } from "../hooks/useBudgetContext";

const Expenses = () => {
  const { getAllExpenses } = useExpenseContext();
  const { getBudgets } = useBudgetContext();

  // Queries
  const { data } = useQuery({
    queryKey: ["allExpenses"],
    queryFn: getAllExpenses,
  });

  const { data: budgets } = useQuery({
    queryKey: ["budgets"],
    queryFn: getBudgets,
  });

  const expensesList = data?.map((expense, i) => {
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
      <div className="mt-3">
        {data?.length > 0 && (
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
        {data?.length === 0 && (
          <Card
            className="mb-4 py-2"
            border="light"
            style={{ backgroundColor: "hsl(0, 0%, 97%)" }}
          >
            <Card.Body>
              <Card.Text>No hay gastos creados aun 😄. </Card.Text>
            </Card.Body>
          </Card>
        )}
      </div>
    </>
  );
};

export default Expenses;
