import {
  Card,
  Button,
  Placeholder,
  Stack,
  DropdownButton,
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";

// components
import Budget from "./Budget";

// custom hooks
import { useMessageContext } from "../hooks/useMessageContext";
import { useBudgetContext } from "../hooks/useBudgetContext";
import { useQuery } from "react-query";

const Budgets = () => {
  const { clearMessages } = useMessageContext();
  const { handleIsEditing, getBudgets } = useBudgetContext();

  const { data, isLoading } = useQuery({
    queryKey: "budgets",
    queryFn: getBudgets,
  });
  console.log(data);

  const navigate = useNavigate();

  const budgetList = data?.map((budget) => {
    return <Budget key={budget._id} budget={budget} />;
  });

  const handleShowBudgetFormOrList = (showForm) => {
    handleIsEditing(false);
    clearMessages();
    navigate("add");
  };

  return (
    <>
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
      </div>
      <div>
        {data?.length > 0 && !isLoading && budgetList}
        {data?.length === 0 && !isLoading && (
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
    </>
  );
};

export default Budgets;
