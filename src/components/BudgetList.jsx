import {
  Card,
  Button,
  Placeholder,
  Stack,
  DropdownButton,
} from "react-bootstrap";

// components
import ExpensesList from "./ExpensesList";
import BudgetForm from "./BudgetForm";
import Budget from "./Budget";

// custom hooks
import { useMessageContext } from "../hooks/useMessageContext";
import { useBudgetContext } from "../hooks/useBudgetContext";

const BudgetList = () => {
  const { clearMessages } = useMessageContext();
  const {
    budgets,
    showBudgetForm,
    showBudgetList,
    handleShowBudgetForm,
    handleShowBudgetList,
    isLoading,
    handleIsEditing,
  } = useBudgetContext();

  const budgetList = budgets.map((budget) => {
    return <Budget key={budget._id} budget={budget} />;
  });

  const handleShowBudgetFormOrList = (showForm) => {
    handleShowBudgetForm(showForm);
    handleShowBudgetList(!showForm);
    handleIsEditing(false);
    clearMessages();
  };

  return (
    <>
      <div>
        {!showBudgetList && (
          <div>
            <ExpensesList />
          </div>
        )}
      </div>
      <div>
        {isLoading && (
          <Card
            className="mb-4"
            style={{ backgroundColor: "hsl(0, 0%, 97%, 0.5)", border: "none" }}
          >
            <Card.Body className="p-0">
              <Card.Header style={{ border: "none" }} className="py-2">
                <Placeholder
                  as={Card.Title}
                  animation="wave"
                  className="justify-content-between"
                >
                  <Stack direction="horizontal" gap={3}>
                    <Placeholder xs={3} />
                    <Placeholder.Button
                      as={DropdownButton}
                      variant="link"
                      className="ms-auto"
                      animation="wave"
                    >
                      <i className="fa-sharp fa-solid fa-plus gray-color"></i>
                    </Placeholder.Button>
                  </Stack>
                </Placeholder>
              </Card.Header>

              <Placeholder
                className="mt-3 px-3"
                as={Card.Text}
                animation="wave"
              >
                <Placeholder xs={1} />
              </Placeholder>
              <Placeholder className="px-3" as={Card.Text} animation="wave">
                <Placeholder xs={2} />
              </Placeholder>
              <Placeholder className="px-3" as={Card.Text} animation="wave">
                <Placeholder xs={1} />
              </Placeholder>
            </Card.Body>
          </Card>
        )}

        {showBudgetList && (
          <div>
            {budgets.length > 0 && !isLoading && budgetList}
            {budgets.length === 0 && !isLoading && (
              <Card
                className="mb-4"
                border="light"
                style={{ backgroundColor: "hsl(0, 0%, 97%)" }}
              >
                <Card.Body>
                  <Card.Text>
                    No hay presupuestos creados aun 😄.{" "}
                    <Button
                      onClick={() => handleShowBudgetFormOrList(true)}
                      variant="link"
                    >
                      Crear nuevo presupuesto
                    </Button>
                  </Card.Text>
                </Card.Body>
              </Card>
            )}
          </div>
        )}
      </div>
      <div>
        {showBudgetForm && (
          <div>
            <BudgetForm />
          </div>
        )}
      </div>
    </>
  );
};

export default BudgetList;
