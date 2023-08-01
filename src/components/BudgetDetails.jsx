import {
  Card,
  Stack,
  Col,
  Row,
  Button,
  Placeholder,
  ProgressBar,
} from "react-bootstrap";

import { useQuery } from "react-query";

import { useBudgetContext } from "../hooks/useBudgetContext";
import { useMessageContext } from "../hooks/useMessageContext";

import { useNavigate, useParams } from "react-router-dom";

const BudgetDetails = () => {
  const { getBudgets } = useBudgetContext();

  const { clearMessages } = useMessageContext();

  const { budgetId } = useParams("budgetId");

  const { data: budget, isLoading } = useQuery({
    queryKey: ["budgets", { id: budgetId }],
    queryFn: getBudgets,
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/budgets");
  };

  const handleEdit = (budget) => {
    clearMessages();
    navigate(`/budgets/${budget._id}/edit`, { replace: true });
  };

  const leftAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    minimumFractionDigits: 2,
    currency: "USD",
  }).format(budget?.leftAmount.toFixed(2));

  const leftPorcentage = Math.floor(
    (1 - budget?.spentAmount / budget?.expectedAmount) * 100
  );

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
                  onClick={() => handleEdit(budget)}
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
          <Card.Header>
            <Stack direction="horizontal" gap={3}>
              <span className="fs-4 fw-bold">{budget?.name}</span>
            </Stack>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              Presupuestado:{" "}
              <span className="fw-bold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  minimumFractionDigits: 2,
                  currency: "USD",
                }).format(budget.expectedAmount.toFixed(2))}
              </span>
            </Card.Text>
            <Card.Text>
              Gastado:{" "}
              <span className="fw-bold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  minimumFractionDigits: 2,
                  currency: "USD",
                }).format(budget.spentAmount.toFixed(2))}
              </span>
            </Card.Text>
            {/* <Card.Text>
              Balance:{" "}
              <span className="fw-bold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  minimumFractionDigits: 2,
                  currency: "USD",
                }).format(budget.leftAmount.toFixed(2))}
              </span>
            </Card.Text> */}
            {leftPorcentage >= 70 && (
              <ProgressBar
                className="mb-3"
                now={budget.leftAmount}
                label={`${leftAmount} disponible`}
                min={0}
                max={budget.expectedAmount}
              />
            )}
            {leftPorcentage >= 50 && leftPorcentage < 70 && (
              <ProgressBar
                className="progress-mid mb-3"
                now={budget.leftAmount}
                label={`${leftAmount} disponible`}
                min={0}
                max={budget.expectedAmount}
              />
            )}
            {leftPorcentage < 50 && (
              <ProgressBar
                className="progress-low mb-3"
                now={budget.leftAmount}
                label={`${leftAmount} disponible`}
                min={0}
                max={budget.expectedAmount}
              />
            )}
          </Card.Body>
        </Card>
      )}

      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Borrar Presupuesto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de eliminar el presupuesto{" "}
          <span className="fw-bold">{budget.name}</span>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => handleDelete(budget)}>
            Sí, estoy seguro
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
};

export default BudgetDetails;
