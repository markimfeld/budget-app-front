import { Card, Button, Stack, Row, Col, Placeholder } from "react-bootstrap";

import "../components/Dashboard.css";

import PieChart from "./PieChart";
import BarChart from "./BarChart";

import { useQuery } from "react-query";

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
    getBudgets,
    getCurrentMonthBudgets,
    getNextMonthBudgets,
    getPreviuosMonthBudgets,
    handleIsEditing,
    isBudgetCreating,
  } = useBudgetContext();
  const { clearMessages } = useMessageContext();

  const { selectedBudget, handleSelectedBudget, handleIsExpenseEditing } =
    useExpenseContext();

  const { data, isLoading } = useQuery({
    queryKey: ["budgets"],
    queryFn: getBudgets,
  });

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
      navigate("/expenses/add");
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
      {/* <Row>
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
      </Row> */}
      <Row>
        <Col md={4}>
          {!isLoading && (
            <Card
              className="mb-3 card-background-gradient"
              // style={{ backgroundColor: "rgba(255, 159, 64, 0.2)" }}
              // style={{
              //   backgroundColor: "hsl(10, 79%, 65%)",
              //   borderColor: "hsl(10, 79%, 65%)",
              // }}
            >
              <Card.Body>
                <p className="m-0 mb-1 text-white">Presupuestado este mes</p>
                <h3 className="ms-auto text-white">${expectedTotals}</h3>
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
              className="mb-3 card-background-gradient"
              // style={{
              //   backgroundColor: "hsl(10, 79%, 65%)",
              //   borderColor: "hsl(10, 79%, 65%)",
              // }}
            >
              <Card.Body>
                <p className="m-0 mb-1 text-white">Total este mes</p>
                <h3 className="ms-auto text-white">${spentTotals}</h3>
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
              className="mb-3 card-background-gradient"
              // style={{
              //   backgroundColor: "hsl(10, 79%, 65%)",
              //   borderColor: "hsl(10, 79%, 65%)",
              // }}
            >
              <Card.Body>
                <p className="m-0 mb-1 text-white">Mi balance</p>
                <h3 className="ms-auto text-white">
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
      <Row>
        <Col>
          <Card style={{ backgroundColor: "#373E68" }}>
            <Card.Body>
              <Stack direction="horizontal" gap={3}>
                <Button
                  size="md"
                  onClick={() => handleShowBudgetFormOrList(true)}
                  className="ms-auto"
                >
                  <i className="fa-solid fa-plus fa-sm"></i> Agregar gasto
                </Button>
              </Stack>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* {budgets.length > 0 && (
        <Row>
          <Col md={6}>
            <Card
              className="mb-3 mb-md-1"
              border="light"
              style={{ backgroundColor: "hsl(0, 0%, 97%)" }}
            >
              <Card.Body
                style={{ height: "300px" }}
                className="d-flex justify-content-center align-items-center"
              >
                <PieChart />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card
              className="mb-1"
              border="light"
              style={{ backgroundColor: "hsl(0, 0%, 97%)" }}
            >
              <Card.Body
                style={{ height: "300px" }}
                className="d-flex justify-content-center align-items-center"
              >
                <BarChart />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )} */}
    </>
  );
};

export default Dashboard;
