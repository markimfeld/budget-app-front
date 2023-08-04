import {
  Card,
  Button,
  Stack,
  Row,
  Col,
  Placeholder,
  ProgressBar,
} from "react-bootstrap";

import "../components/Dashboard.css";

import { useQuery } from "react-query";

import { useNavigate } from "react-router-dom";

// custom hooks
import { useBudgetContext } from "../hooks/useBudgetContext";
import { useMessageContext } from "../hooks/useMessageContext";
import { useIncomeContext } from "../hooks/useIncomeContext";

// const months = [
//   "Enero",
//   "Febrero",
//   "Marzo",
//   "Abril",
//   "Mayo",
//   "Junio",
//   "Julio",
//   "Agosto",
//   "Septiembre",
//   "Octubre",
//   "Noviembre",
//   "Diciembre",
// ];

const Dashboard = () => {
  const { budgets, getBudgets } = useBudgetContext();
  const { clearMessages } = useMessageContext();

  const { getIncomes } = useIncomeContext();

  const { data: incomes, isLoading } = useQuery({
    queryKey: ["incomes"],
    queryFn: getIncomes,
  });

  const { data: lastMonthIncomes } = useQuery({
    queryKey: [
      "lastMonthIncomes",
      {
        filters: {
          month: new Date().getMonth(),
          year: new Date().getFullYear(),
        },
      },
    ],
    queryFn: getIncomes,
  });

  const { data: lastMonthBudgets } = useQuery({
    queryKey: [
      "lastMonthBudgets",
      {
        filters: {
          month: new Date().getMonth(),
          year: new Date().getFullYear(),
        },
      },
    ],
    queryFn: getBudgets,
  });

  const navigate = useNavigate();

  const totalIncomes = incomes
    ?.map((income) => income.amount)
    .reduce((acc, currentValue) => acc + currentValue, 0)
    .toFixed(2);

  const lastMonthTotalIncomes = lastMonthIncomes
    ?.map((income) => income.amount)
    .reduce((acc, currentValue) => acc + currentValue, 0)
    .toFixed(2);

  const spentTotal = budgets.map((budget) => budget.spentAmount);

  const lastSpentTotal = lastMonthBudgets?.map((budget) => budget.spentAmount);

  // const expectedTotal = budgets.map((budget) => budget.expectedAmount);

  const spentTotals = spentTotal
    .reduce((acc, currentValue) => acc + currentValue, 0)
    .toFixed(2);

  const lastSpentTotals = lastSpentTotal
    ?.reduce((acc, currentValue) => acc + currentValue, 0)
    .toFixed(2);

  // const expectedTotals = expectedTotal
  //   .reduce((acc, currentValue) => acc + currentValue, 0)
  //   .toFixed(2);

  const leftPorcentage =
    Math.floor((1 - spentTotals / totalIncomes) * 100) || 0;

  const incomePorcentageBetweenLastMonth = Number.parseFloat(
    (1 - lastMonthTotalIncomes / totalIncomes) * 100
  ).toFixed(2);

  const expensePorcentageBetweenLastMonth = Number.parseFloat(
    (1 - lastSpentTotals / spentTotals) * 100
  ).toFixed(2);

  const handleShowBudgetFormOrList = () => {
    clearMessages();
    navigate("/expenses/add");
  };

  // const handleCurrentMonth = () => {
  //   getCurrentMonthBudgets();
  // };

  // const handleNextMonth = () => {
  //   getNextMonthBudgets();
  // };

  // const handlePreviusMonth = () => {
  //   getPreviuosMonthBudgets();
  // };

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
        <Col md={6}>
          {!isLoading && (
            <Card
              className="shadow-sm mb-4 bg-body rounded"
              style={{ border: "none" }}
            >
              <Card.Body>
                <p className="m-0 mb-1">Ingreso total</p>
                <h3 className="ms-auto fw-bold mb-3">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    minimumFractionDigits: 2,
                    currency: "USD",
                  }).format(totalIncomes)}
                </h3>
                {lastMonthTotalIncomes > 0 && (
                  <div>
                    {incomePorcentageBetweenLastMonth > 0 && (
                      <>
                        <i className="fa-solid fa-arrow-up me-1 text-success"></i>
                        <span className="text-success fw-bold">
                          +{incomePorcentageBetweenLastMonth} %
                        </span>
                        <span className="text-muted fw-lighter me-1">
                          {" "}
                          más que el mes pasado
                        </span>
                      </>
                    )}
                    {incomePorcentageBetweenLastMonth < 0 && (
                      <>
                        <i className="fa-solid fa-arrow-down me-1 text-danger"></i>
                        <span className="text-danger fw-bold">
                          +{incomePorcentageBetweenLastMonth} %
                        </span>
                        <span className="text-muted fw-lighter me-1">
                          {" "}
                          menos que el mes pasado
                        </span>
                      </>
                    )}
                  </div>
                )}
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
        {/* <Col md={3}>
          {!isLoading && (
            <Card className="mb-3 card-background-gradient">
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
        </Col> */}
        <Col md={6}>
          {!isLoading && (
            <Card
              className="shadow-sm mb-4 bg-body rounded"
              style={{ border: "none" }}
            >
              <Card.Body>
                <p className="m-0 mb-1">Gasto total</p>
                <h3 className="ms-auto fw-bold mb-3">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    minimumFractionDigits: 2,
                    currency: "USD",
                  }).format(spentTotals)}
                </h3>
                {lastSpentTotals > 0 && (
                  <div>
                    <i className="fa-solid fa-arrow-down me-1 text-danger"></i>
                    <span className="text-danger fw-bold">
                      {expensePorcentageBetweenLastMonth} %
                    </span>
                    <span className="text-muted fw-lighter me-1">
                      {" "}
                      menos que el mes pasado
                    </span>
                  </div>
                )}
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
        <Col md={12}>
          {!isLoading && (
            <Card
              className="shadow-sm mb-4 pb-2 bg-body rounded"
              style={{ border: "none" }}
            >
              <Card.Body>
                <p className="m-0 mb-1">Balance total</p>
                <h3 className="ms-auto fw-bold mb-3">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    minimumFractionDigits: 2,
                    currency: "USD",
                  }).format((totalIncomes - spentTotals).toFixed(2))}
                </h3>
                {leftPorcentage >= 70 && (
                  <ProgressBar
                    now={leftPorcentage}
                    label={`${leftPorcentage}% disponible`}
                  />
                )}
                {leftPorcentage >= 50 && leftPorcentage < 70 && (
                  <ProgressBar
                    className="progress-mid"
                    now={leftPorcentage}
                    label={`${leftPorcentage}% disponible`}
                  />
                )}
                {leftPorcentage < 50 && (
                  <ProgressBar
                    className="progress-low"
                    now={leftPorcentage}
                    label={`${leftPorcentage}% disponible`}
                  />
                )}
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
      <Row className="mb-3">
        <Col>
          <Card className="bg-card-secondary">
            <Card.Body>
              <Stack direction="horizontal" gap={3}>
                <Button
                  size="md"
                  onClick={() => handleShowBudgetFormOrList()}
                  className="ms-auto"
                >
                  <i className="fa-solid fa-plus fa-sm"></i> Agregar gasto
                </Button>
              </Stack>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
