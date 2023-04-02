import React, { useContext } from "react";
import { Card, Stack, Button } from "react-bootstrap";
import { format } from "date-fns";
import { ExpenseContext } from "../context/ExpenseContext";

const Expense = ({ expense }) => {
  const { handleDeleteExpense } = useContext(ExpenseContext);

  return (
    <Card key={expense._id} className="mb-4">
      <Card.Body>
        <Stack direction="horizontal" gap={3}>
          <span>
            <Card.Title>{expense.name}</Card.Title>
            <Card.Text className="m-0 p-0">{expense.description}</Card.Text>
            <Card.Text className="text-muted">
              {format(new Date(expense.createdAt), "dd/MM/yyyy kk:mm")}
            </Card.Text>
          </span>
          <Card.Title className="ms-auto">
            <Stack direction="horizontal" gap={3}>
              <span className="fs-4">${expense.amount}</span>
              <Button
                className=""
                variant="outline-danger"
                size="sm"
                onClick={() => handleDeleteExpense(expense)}
              >
                <i className="fa-solid fa-trash"></i>
              </Button>
            </Stack>
          </Card.Title>
        </Stack>
      </Card.Body>
      {/* <Card.Footer className="text-muted">
            Realizado el{" "}
            
          </Card.Footer> */}
    </Card>
  );
};

export default Expense;
