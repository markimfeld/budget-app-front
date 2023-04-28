import { Card, Button, Stack, DropdownButton, Dropdown } from "react-bootstrap";

// components
import ExpenseForm from "./ExpenseForm";
import Expense from "./Expense";

// custom hooks
import { useExpenseContext } from "../hooks/useExpenseContext";
import { useBudgetContext } from "../hooks/useBudgetContext";
import { useMessageContext } from "../hooks/useMessageContext";

const ExpensesList = () => {
  const {
    expenses,
    selectedBudget,
    handleShowExpenseList,
    handleShowExpenseForm,
    showExpenseForm,
    showExpensesList,
    handleSelectedBudget,
    handleIsExpenseEditing,
  } = useExpenseContext();

  const { handleShowBudgetList, handleIsBudgetCreating } = useBudgetContext();

  const { clearMessages } = useMessageContext();

  const expensesList = expenses.map((expense, i) => {
    if (i === expenses.length - 1) {
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

  const handleNewExpense = (showForm) => {
    handleShowExpenseForm(showForm);
    handleShowExpenseList(!showForm);
    handleShowBudgetList(!showForm);
    handleSelectedBudget(selectedBudget);
    handleIsExpenseEditing(false);
    clearMessages();
  };

  const handleVolver = (showList) => {
    handleShowExpenseList(!showList);
    handleShowExpenseForm(!showList);
    handleShowBudgetList(showList);
    clearMessages();
    handleIsBudgetCreating(true);
  };

  return (
    <>
      <div>
        {showExpensesList && (
          <Card
            border="light"
            className="mb-3"
            style={{ backgroundColor: "hsl(0, 0%, 97%)" }}
          >
            <Card.Body>
              <Stack direction="horizontal" gap={3}>
                <div>
                  <Card.Title>{selectedBudget.name}</Card.Title>
                  <Card.Text className="text-muted">
                    Disponible: ${selectedBudget.leftAmount.toFixed(2)}
                  </Card.Text>
                </div>
                <Stack direction="horizontal" gap={3} className="ms-auto">
                  <DropdownButton
                    title={
                      <i className="fa-sharp fa-solid fa-plus gray-color"></i>
                    }
                    id="bg-vertical-dropdown-2"
                    variant="link"
                    className="ms-auto"
                    align="end"
                  >
                    <Dropdown.Item
                      eventKey="1"
                      onClick={() => handleNewExpense(true)}
                    >
                      Nuevo gasto
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="2"
                      onClick={() => handleVolver(true)}
                    >
                      Volver
                    </Dropdown.Item>
                  </DropdownButton>
                </Stack>
              </Stack>
            </Card.Body>
          </Card>
        )}
      </div>
      <div className="mt-3">
        {expenses.length > 0 && showExpensesList && (
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
        {expenses.length === 0 && showExpensesList && (
          <Card
            className="mb-4"
            border="light"
            style={{ backgroundColor: "hsl(0, 0%, 97%)" }}
          >
            <Card.Body>
              <Card.Text>
                No hay gastos creados aun 😄.{" "}
                <Button onClick={() => handleNewExpense(true)} variant="link">
                  Crear nuevo gasto
                </Button>
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </div>
      <div>{showExpenseForm && <ExpenseForm />}</div>
    </>
  );
};

export default ExpensesList;
