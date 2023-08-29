import { Card, Button, Placeholder, Stack, Row, Col } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

// components
import Investment from "./Investment";

// custom hooks
import { useMessageContext } from "../hooks/useMessageContext";
import { useInvestmentContext } from "../hooks/useInvestmentContext";
import { useQuery } from "react-query";

const Investments = () => {
  const { clearMessages } = useMessageContext();

  const { getInvestments } = useInvestmentContext();

  const { data: investments, isLoading } = useQuery({
    queryKey: ["investments"],
    queryFn: getInvestments,
  });

  const navigate = useNavigate();

  const investmentList = investments?.map((investment) => {
    return <Investment key={investment._id} investment={investment} />;
  });

  const totalInvestments = investments
    ?.map((investment) => investment.amount)
    .reduce((acc, currentValue) => acc + currentValue, 0)
    .toFixed(2);

  const handleShowInvestmentFormOrList = () => {
    clearMessages();
    navigate("add");
  };

  return (
    <>
      <Row>
        <Col md={12}>
          {!isLoading && (
            <Card
              className="shadow-sm mb-4 bg-body rounded"
              style={{ border: "none" }}
            >
              <Card.Body>
                <p className="m-0 mb-1">Fondo total</p>
                <h3 className="ms-auto fw-bold mb-3">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    minimumFractionDigits: 2,
                    currency: "USD",
                  }).format(totalInvestments)}
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
      <Row className="mb-4">
        <Col>
          <Card className="bg-card-secondary">
            <Card.Body>
              <Stack direction="horizontal" gap={3}>
                <Button
                  size="md"
                  onClick={() => handleShowInvestmentFormOrList()}
                  className="ms-auto"
                >
                  <i className="fa-solid fa-plus fa-sm"></i> Agregar fondo
                </Button>
              </Stack>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          {investments?.length > 0 && !isLoading && <Row>{investmentList}</Row>}
          {investments?.length === 0 && !isLoading && (
            <Card
              border="light"
              style={{ backgroundColor: "white" }}
              className="shadow-sm py-2 mb-3 bg-body rounded"
            >
              <Card.Body>
                <Card.Title className="mb-0">
                  No tienes fondos 😄.{" "}
                  <Button
                    onClick={() => handleShowInvestmentFormOrList()}
                    variant="link"
                  >
                    Crear nuevo deuda
                  </Button>
                </Card.Title>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Investments;
