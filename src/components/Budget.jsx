import { useState } from "react";
import {
  Card,
  Stack,
  DropdownButton,
  Dropdown,
  Button,
  Modal,
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";

// custom hooks
import { useBudgetContext } from "../hooks/useBudgetContext";
import { useMessageContext } from "../hooks/useMessageContext";

const Budget = ({ budget }) => {
  const { clearMessages } = useMessageContext();
  const {
    handleDeleteBudget,
    handleBudgetToUpdate,
    handleIsEditing,
    handleIsBudgetCreating,
  } = useBudgetContext();

  const navigate = useNavigate();

  const handleGetExpenses = (budget) => {
    clearMessages();
    handleIsBudgetCreating(false);
    navigate(`/budgets/${budget._id}/expenses`);
  };

  const handleEdit = (budget) => {
    // handleBudgetToUpdate(budget);
    handleIsEditing(true);
    clearMessages();

    navigate(`/budgets/${budget._id}/edit`);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card className="mb-4" style={{ border: "none" }}>
        <Card.Header style={{ border: "none" }}>
          <Stack direction="horizontal" gap={3}>
            <span>{budget.name}</span>

            <DropdownButton
              title={<i className="fa-sharp fa-solid fa-plus gray-color"></i>}
              id="bg-vertical-dropdown-2"
              variant="link"
              className="ms-auto"
              align="end"
            >
              <Dropdown.Item
                eventKey="1"
                onClick={() => handleGetExpenses(budget)}
              >
                Ver gastos
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
        <Card.Body style={{ backgroundColor: "hsl(0, 0%, 97%, 0.5)" }}>
          <Card.Title>${budget.spentAmount.toFixed(2)} </Card.Title>
          <Card.Text className="text-muted m-0 p-0">
            Monto disponible ${budget.leftAmount.toFixed(2)}
          </Card.Text>
          <Card.Text className="text-muted">
            Monto límite ${budget.expectedAmount.toFixed(2)}
          </Card.Text>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Borrar Presupuesto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de eliminar el presupuesto{" "}
          <span style={{ fontWeight: 500 }}>{budget.name}</span>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => handleDeleteBudget(budget)}>
            Sí, estoy seguro
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Budget;
