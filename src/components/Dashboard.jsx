import { Card, Button, Stack, Row, Col, Placeholder } from "react-bootstrap";

import PieChart from "./PieChart";
import BarChart from "./BarChart";

import { useNavigate } from "react-router-dom";

// custom hooks
import { useBudgetContext } from "../hooks/useBudgetContext";
import { useMessageContext } from "../hooks/useMessageContext";
import { useExpenseContext } from "../hooks/useExpenseContext";

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const Dashboard = () => {
  const {
    budgets,
    filters,
    getCurrentMonthBudgets,
    getNextMonthBudgets,
    getPreviuosMonthBudgets,
    handleIsEditing,
    isBudgetCreating,
    isLoading,
  } = useBudgetContext();
  const { clearMessages } = useMessageContext();

  const { selectedBudget, handleSelectedBudget, handleIsExpenseEditing } =
    useExpenseContext();

  const navigate = useNavigate();

  const spentTotal = budgets.map((budget) => budget.spentAmount);

  const expectedTotal = budgets.map((budget) => budget.expectedAmount);

  const spentTotals = spentTotal
    .reduce((acc, currentValue) => acc + currentValue, 0)
    .toFixed(2);

  const expectedTotals = expectedTotal
    .reduce((acc, currentValue) => acc + currentValue, 0)
    .toFixed(2);

  const handleShowBudgetFormOrList = (showForm) => {
    if (isBudgetCreating) {
      clearMessages();
      handleIsEditing(false);
      navigate("/budgets/add");
    } else {
      handleSelectedBudget(selectedBudget);
      handleIsExpenseEditing(false);
      clearMessages();
    }
  };

  const handleCurrentMonth = () => {
    getCurrentMonthBudgets();
  };

  const handleNextMonth = () => {
    getNextMonthBudgets();
  };

  const handlePreviusMonth = () => {
    getPreviuosMonthBudgets();
  };

  return (
    <>
      <Row>
        <Col>
          {!isLoading && (
            <Card
              className="mb-3"
              text="dark"
              border="light"
              style={{ backgroundColor: "hsl(0, 0%, 97%)" }}
            >
              <Card.Body>
                <Stack direction="horizontal" gap={3}>
                  <Card.Title>
                    {months[filters.month - 1]} {filters.year}
                  </Card.Title>
                  <Button
                    className="ms-auto"
                    variant="outline-secondary"
                    size="sm"
                    onClick={handlePreviusMonth}
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={handleCurrentMonth}
                  >
                    <i className="fa-solid fa-calendar"></i>
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={handleNextMonth}
                  >
                    <i className="fa-solid fa-arrow-right"></i>
                  </Button>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleShowBudgetFormOrList(true)}
                    className="d-md-block d-none"
                  >
                    <i className="fa-solid fa-plus"></i> Nuevo
                  </Button>
                </Stack>
                <Stack className="mt-2">
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleShowBudgetFormOrList(true)}
                    className="d-md-none"
                  >
                    <i className="fa-solid fa-plus"></i> Nuevo
                  </Button>
                </Stack>
              </Card.Body>
            </Card>
          )}
          {isLoading && (
            <Card
              className="mb-3"
              text="dark"
              border="light"
              style={{ backgroundColor: "hsl(0, 0%, 97%)" }}
            >
              <Card.Body>
                <Placeholder
                  as={Card.Text}
                  animation="glow"
                  className="d-flex justify-content-between"
                >
                  <Placeholder xs={2} /> <Placeholder xs={3} />{" "}
                </Placeholder>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          {!isLoading && (
            <Card
              className="mb-3"
              border="light"
              style={{ backgroundColor: "hsl(0, 0%, 97%)" }}
            >
              <Card.Body>
                <p className="m-0 mb-1">Presupuestado</p>
                <h3 className="ms-auto">${expectedTotals}</h3>
              </Card.Body>
            </Card>
          )}
          {isLoading && (
            <Card
              className="mb-3"
              border="light"
              style={{ backgroundColor: "hsl(0, 0%, 97%)" }}
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
          )}
        </Col>
        <Col md={4}>
          {!isLoading && (
            <Card
              className="mb-3"
              border="light"
              style={{ backgroundColor: "hsl(0, 0%, 97%)" }}
            >
              <Card.Body>
                <p className="m-0 mb-1">Gastado</p>
                <h3 className="ms-auto">${spentTotals}</h3>
              </Card.Body>
            </Card>
          )}
          {isLoading && (
            <Card
              className="mb-3"
              border="light"
              style={{ backgroundColor: "hsl(0, 0%, 97%)" }}
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
          )}
        </Col>
        <Col md={4}>
          {!isLoading && (
            <Card
              className="mb-3"
              border="light"
              style={{ backgroundColor: "hsl(0, 0%, 97%)" }}
            >
              <Card.Body>
                <p className="m-0 mb-1">Balance</p>
                <h3 className="ms-auto">
                  ${(expectedTotals - spentTotals).toFixed(2)}
                </h3>
              </Card.Body>
            </Card>
          )}
          {isLoading && (
            <Card
              className="mb-3"
              border="light"
              style={{ backgroundColor: "hsl(0, 0%, 97%)" }}
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
          )}
        </Col>
      </Row>
      {budgets.length > 0 && (
        <Row>
          {/* <Col md={4}>
            <Card
              className="mb-3"
              border="light"
              style={{ backgroundColor: "hsl(0, 0%, 97%)" }}
            >
              <Card.Body>
                <PieChart />
              </Card.Body>
            </Card>
          </Col> */}
          <Col>
            <Card
              className="mb-3"
              border="light"
              style={{ backgroundColor: "hsl(0, 0%, 97%)" }}
            >
              <Card.Body
                style={{ height: "300px" }}
                className="d-flex justify-content-center"
              >
                <BarChart />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Dashboard;
