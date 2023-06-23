import { Card } from "react-bootstrap";

import { useQuery } from "react-query";

// components
import Expense from "./Expense";

// custom hooks
import { useExpenseContext } from "../hooks/useExpenseContext";

const Expenses = () => {
  const { getAllExpenses } = useExpenseContext();

  // Queries
  const { data } = useQuery("allExpenses", getAllExpenses);
  console.log(data);

  const expensesList = data?.map((expense, i) => {
    if (i === data.length - 1) {
      return (
        <div key={expense._id}>
          <Expense expense={expense} />
        </div>
      );
    } else {
      return (
        <div key={expense._id} className="mb-2">
          <Expense expense={expense} />
        </div>
      );
    }
  });

  return (
    <>
      <div className="mt-3">
        {data?.length > 0 && (
          <div>
            <p
              className="text-muted"
              style={{
                paddingLeft: 5,
                paddingBottom: 0,
                marginBottom: 0,
              }}
            >
              Movimientos
            </p>
            <Card
              border="light"
              className="p-2 mb-5"
              style={{ backgroundColor: "hsl(0, 0%, 97%)" }}
            >
              {expensesList}
            </Card>
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
