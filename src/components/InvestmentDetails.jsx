import { Card, Stack, Col, Row, Button, Placeholder } from "react-bootstrap";

import { useQuery } from "react-query";

import { useInvestmentContext } from "../hooks/useInvestmentContext";
import { useMessageContext } from "../hooks/useMessageContext";

import { useNavigate, useParams } from "react-router-dom";

const InvestmentDetails = () => {
  const { getInvestments } = useInvestmentContext();

  const { clearMessages } = useMessageContext();

  const { investmentId } = useParams("investmentId");

  const { data: investment, isLoading } = useQuery({
    queryKey: ["investments", { id: investmentId }],
    queryFn: getInvestments,
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/investments");
  };

  const handleEdit = (investment) => {
    clearMessages();
    navigate(`/investments/${investment._id}/edit`, { replace: true });
  };

  return (
    <>
      <Row className="mb-4">
        <Col>
          <Card
            className="shadow-sm p-1 bg-body rounded"
            style={{ border: "none" }}
          >
            <Card.Body>
              <Stack direction="horizontal" gap={3}>
                <Button
                  variant="outline-secondary"
                  size="md"
                  onClick={() => handleGoBack()}
                >
                  <i className="fa-solid fa-angle-left fa-sm"></i>{" "}
                  <span className="fw-bold">Volver</span>
                </Button>
                <Button
                  size="md"
                  onClick={() => handleEdit(investment)}
                  className="ms-auto"
                  variant="success"
                >
                  <i className="fa-solid fa-edit fa-sm"></i> Editar
                </Button>
              </Stack>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {isLoading && (
        <Card
          className="shadow-sm p-3 mb-3 bg-body rounded"
          style={{ border: "none" }}
        >
          <Card.Header>
            <Placeholder
              as={Card.Title}
              animation="wave"
              className="justify-content-between"
            >
              <Placeholder xs={3} />
            </Placeholder>
          </Card.Header>
          <Card.Body>
            <Placeholder as={Card.Text} animation="wave">
              <Placeholder xs={3} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="wave">
              <Placeholder xs={2} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="wave">
              <Placeholder xs={2} />
            </Placeholder>
          </Card.Body>
        </Card>
      )}
      {!isLoading && (
        <Card
          className="shadow-sm p-3 mb-3 bg-body rounded"
          style={{ border: "none" }}
        >
          <Card.Header className="pb-0">
            <Card.Title className="fs-4 fw-bold text-center">
              {investment?.name}
            </Card.Title>
            <hr className="mb-0" />
          </Card.Header>
          <Card.Body>
            <Stack className="mb-2" direction="horizontal" gap={3}>
              <span className="text-muted">Monto: </span>
              <span className="ms-auto fw-bold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  minimumFractionDigits: 2,
                  currency: "USD",
                }).format(investment?.amount.toFixed(2))}
              </span>
            </Stack>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default InvestmentDetails;
