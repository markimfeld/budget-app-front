import React, { useContext } from "react";
import { Card, Stack, DropdownButton, Dropdown } from "react-bootstrap";
import "../components/Expense.css";
import { format } from "date-fns";
import { ExpenseContext } from "../context/ExpenseContext";
import { MessageContext } from "../context/MessageContext";

const Expense = ({ expense }) => {
  const {
    handleDeleteExpense,
    handleIsExpenseEditing,
    handleExpenseToUpdate,
    handleShowExpenseForm,
    handleShowExpenseList,
  } = useContext(ExpenseContext);

  const { clearMessages } = useContext(MessageContext);

  const handleEdit = (expense) => {
    handleIsExpenseEditing(true);
    handleExpenseToUpdate(expense);
    handleShowExpenseForm(true);
    handleShowExpenseList(false);
    clearMessages();
  };

  return (
    <Card
      key={expense._id}
      border="light"
      // bg="light"
      style={{ backgroundColor: "hsla(0, 0%, 94%, 1)" }}
    >
      <Card.Body>
        <Stack direction="horizontal" gap={3}>
          <span>
            <Card.Title className="mb-0">{expense.name}</Card.Title>
            {/* <Card.Text className="text-muted mb-0">
              {expense.description}
            </Card.Text> */}
            <Card.Text className="text-muted">
              {format(new Date(expense.createdAt), "dd/MM/yyyy kk:mm")}
            </Card.Text>
          </span>
          <Card.Title className="ms-auto mb-0">
            <Stack direction="horizontal" gap={3}>
              <span className="fs-4">${expense.amount.toFixed(2)}</span>

              <DropdownButton
                title={<i className="fa-sharp fa-solid fa-plus gray-color"></i>}
                id="bg-vertical-dropdown-2"
                variant="link"
                align="end"
              >
                <Dropdown.Item eventKey="1" onClick={() => handleEdit(expense)}>
                  Editar
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="2"
                  onClick={() => handleDeleteExpense(expense)}
                >
                  Borrar
                </Dropdown.Item>
              </DropdownButton>
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
