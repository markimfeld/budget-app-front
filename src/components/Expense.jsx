import { useState } from "react";
import {
  Card,
  Stack,
  DropdownButton,
  Dropdown,
  Modal,
  Button,
} from "react-bootstrap";
import "../components/Expense.css";
import { format } from "date-fns";

import { useNavigate } from "react-router-dom";

// custom hooks
import { useExpenseContext } from "../hooks/useExpenseContext";
import { useMessageContext } from "../hooks/useMessageContext";

const Expense = ({ expense, budget }) => {
  const { handleDeleteExpense } = useExpenseContext();

  const { clearMessages } = useMessageContext();
  const navigate = useNavigate();

  const handleDetails = (expense) => {
    clearMessages();
    navigate(`${expense._id}/details`);
  };

  const handleEdit = () => {
    clearMessages();
    navigate(`${expense._id}/edit`);
  };

  const handleDelete = (expense, budget) => {
    handleDeleteExpense(expense, budget);
    handleClose();
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card
        key={expense._id}
        border="light"
        style={{ backgroundColor: "white", border: "none" }}
        className="shadow-sm py-2 mb-3 bg-body rounded"
      >
        <Card.Body>
          <Stack direction="horizontal" gap={3}>
            <span>
              <Card.Title className="mb-0">{expense.name}</Card.Title>
              <Card.Text className="text-muted">
                {format(new Date(expense.createdAt), "dd/MM/yyyy kk:mm")}
              </Card.Text>
            </span>
            <Card.Title className="ms-auto mb-0">
              <Stack direction="horizontal" gap={3}>
                <span className="fs-4 fw-bold">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    minimumFractionDigits: 2,
                    currency: "USD",
                  }).format(expense.amount.toFixed(2))}
                </span>

                <DropdownButton
                  title={
                    <i className="fa-sharp fa-solid fa-plus gray-color"></i>
                  }
                  id="bg-vertical-dropdown-2"
                  variant="link"
                  align="end"
                >
                  <Dropdown.Item
                    eventKey="1"
                    onClick={() => handleDetails(expense)}
                  >
                    Detalle
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="1"
                    onClick={() => handleEdit(expense)}
                  >
                    Editar
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="2" onClick={handleShow}>
                    Borrar
                  </Dropdown.Item>
                </DropdownButton>
              </Stack>
            </Card.Title>
          </Stack>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Borrar Gasto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de eliminar el gasto{" "}
          <span style={{ fontWeight: 500 }}>{expense.name}</span>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDelete(expense, budget)}
          >
            Sí, estoy seguro
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Expense;
