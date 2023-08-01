import { useState } from "react";
import {
  Card,
  Stack,
  DropdownButton,
  Dropdown,
  Button,
  Modal,
  Col,
  ProgressBar,
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";

// custom hooks
import { useBudgetContext } from "../hooks/useBudgetContext";
import { useMessageContext } from "../hooks/useMessageContext";

const Budget = ({ budget }) => {
  const { clearMessages } = useMessageContext();
  const { handleDeleteBudget } = useBudgetContext();

  const navigate = useNavigate();

  const handleDetails = (budget) => {
    clearMessages();
    navigate(`/budgets/${budget._id}/details`);
  };

  const handleEdit = (budget) => {
    clearMessages();
    navigate(`/budgets/${budget._id}/edit`, { replace: true });
  };

  const handleDelete = (budget) => {
    handleDeleteBudget(budget);
    handleClose();
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const leftAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    minimumFractionDigits: 2,
    currency: "USD",
  }).format(budget.leftAmount.toFixed(2));

  const leftPorcentage = Math.floor(
    (1 - budget.spentAmount / budget.expectedAmount) * 100
  );

  return (
    <>
      <Col md={6} lg={6}>
        <Card
          className="shadow-sm p-3 mb-3 bg-body rounded"
          style={{ border: "none" }}
        >
          <Card.Header>
            <Stack direction="horizontal" gap={3}>
              <span className="fs-4 fw-bold">{budget.name}</span>

              <DropdownButton
                title={<i className="fa-sharp fa-solid fa-plus gray-color"></i>}
                id="bg-vertical-dropdown-2"
                variant="link"
                className="ms-auto"
                align="end"
              >
                <Dropdown.Item
                  eventKey="2"
                  onClick={() => handleDetails(budget)}
                >
                  Detalles
                </Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={() => handleEdit(budget)}>
                  Editar
                </Dropdown.Item>
                <Dropdown.Item eventKey="3" onClick={handleShow}>
                  Borrar
                </Dropdown.Item>
              </DropdownButton>
            </Stack>
          </Card.Header>
          <Card.Body>
            {/* <Card.Title>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                minimumFractionDigits: 2,
                currency: "USD",
              }).format(budget.spentAmount.toFixed(2))}
            </Card.Title> */}
            {/* <Card.Text className="text-muted m-0 p-0">
              Monto disponible{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                minimumFractionDigits: 2,
                currency: "USD",
              }).format(budget.leftAmount.toFixed(2))}
            </Card.Text>
            <Card.Text className="text-muted">
              Monto límite{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                minimumFractionDigits: 2,
                currency: "USD",
              }).format(budget.expectedAmount.toFixed(2))}
            </Card.Text> */}
            {leftPorcentage >= 70 && (
              <ProgressBar
                now={budget.leftAmount}
                label={`${leftAmount} disponible`}
                min={0}
                max={budget.expectedAmount}
              />
            )}
            {leftPorcentage >= 50 && leftPorcentage < 70 && (
              <ProgressBar
                className="progress-mid"
                now={budget.leftAmount}
                label={`${leftAmount} disponible`}
                min={0}
                max={budget.expectedAmount}
              />
            )}
            {leftPorcentage < 50 && (
              <ProgressBar
                className="progress-low"
                now={budget.leftAmount}
                label={`${leftAmount} disponible`}
                min={0}
                max={budget.expectedAmount}
              />
            )}
          </Card.Body>
        </Card>
      </Col>

      <Modal show={show} onHide={handleClose}>
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
      </Modal>
    </>
  );
};

export default Budget;
