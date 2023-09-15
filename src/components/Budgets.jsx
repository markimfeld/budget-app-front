import {
  Card,
  Button,
  Placeholder,
  Stack,
  DropdownButton,
  Row,
  Col,
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

// components
import Budget from "./Budget";

// custom hooks
import { useMessageContext } from "../hooks/useMessageContext";
import { useBudgetContext } from "../hooks/useBudgetContext";
import { useCurrencyContext } from "../hooks/useCurrencyContext";

const Budgets = () => {
  const { clearMessages } = useMessageContext();
  const { getBudgets } = useBudgetContext();

  const { getCurrencyPrice, currencyType } = useCurrencyContext();

  const { data: currency } = useQuery({
    queryKey: ["currency", { type: "blue" }],
    queryFn: getCurrencyPrice,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["budgets"],
    queryFn: getBudgets,
  });

  const navigate = useNavigate();

  const budgetList = data?.map((budget) => {
    return (
      <Budget
        key={budget._id}
        budget={budget}
        currencyType={currencyType}
        currency={currency}
      />
    );
  });

  const handleShowBudgetFormOrList = () => {
    clearMessages();
    navigate("add");
  };

  return (
    <>
      <Row className="mb-4">
        <Col>
          <Card className="bg-card-secondary">
            <Card.Body>
              <Stack direction="horizontal" gap={3}>
                <Button
                  size="md"
                  onClick={() => handleShowBudgetFormOrList()}
                  className="ms-auto"
                >
                  <i className="fa-solid fa-plus fa-sm"></i> Agregar presupuesto
                </Button>
              </Stack>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div>
        {isLoading && (
          <>
            <Row>
              <Col md={6} lg={6}>
                <Card
                  className="mb-4 pb-3 shadow-sm bg-body rounded"
                  style={{
                    backgroundColor: "hsl(0, 0%, 97%, 0.5)",
                    border: "none",
                  }}
                >
                  <Card.Body className="py-3">
                    <Card.Header style={{ border: "none" }} className="px-3">
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
                      className="px-3"
                      as={Card.Text}
                      animation="wave"
                    >
                      <Placeholder xs={2} />
                    </Placeholder>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} lg={6}>
                <Card
                  className="mb-4 pb-3 shadow-sm bg-body rounded"
                  style={{
                    backgroundColor: "hsl(0, 0%, 97%, 0.5)",
                    border: "none",
                  }}
                >
                  <Card.Body className="py-3">
                    <Card.Header style={{ border: "none" }} className="px-3">
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
                      className="px-3"
                      as={Card.Text}
                      animation="wave"
                    >
                      <Placeholder xs={2} />
                    </Placeholder>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={6} lg={6}>
                <Card
                  className="mb-4 pb-3 shadow-sm bg-body rounded"
                  style={{
                    backgroundColor: "hsl(0, 0%, 97%, 0.5)",
                    border: "none",
                  }}
                >
                  <Card.Body className="py-3">
                    <Card.Header style={{ border: "none" }} className="px-3">
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
                      className="px-3"
                      as={Card.Text}
                      animation="wave"
                    >
                      <Placeholder xs={2} />
                    </Placeholder>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} lg={6}>
                <Card
                  className="mb-4 pb-3 shadow-sm bg-body rounded"
                  style={{
                    backgroundColor: "hsl(0, 0%, 97%, 0.5)",
                    border: "none",
                  }}
                >
                  <Card.Body className="py-3">
                    <Card.Header style={{ border: "none" }} className="px-3">
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
                      className="px-3"
                      as={Card.Text}
                      animation="wave"
                    >
                      <Placeholder xs={2} />
                    </Placeholder>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </div>
      <div>
        {data?.length > 0 && !isLoading && <Row>{budgetList}</Row>}
        {data?.length === 0 && !isLoading && (
          <Card
            border="light"
            style={{ backgroundColor: "white" }}
            className="shadow-sm py-2 mb-3 bg-body rounded"
          >
            <Card.Body>
              <Card.Title className="mb-0">
                No hay presupuestos creados aún 😄.{" "}
                <Button
                  onClick={() => handleShowBudgetFormOrList()}
                  variant="link"
                >
                  Crear nuevo presupuesto
                </Button>
              </Card.Title>
            </Card.Body>
          </Card>
        )}
      </div>
    </>
  );
};

export default Budgets;
