import { useState } from "react";
import {
  Card,
  Stack,
  DropdownButton,
  Dropdown,
  Button,
  Modal,
  Col,
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";

// custom hooks
import { useIncomeContext } from "../hooks/useIncomeContext";
import { useMessageContext } from "../hooks/useMessageContext";

const Income = ({ income, currency, currencyType }) => {
  const { clearMessages } = useMessageContext();
  const { handleDeleteIncome } = useIncomeContext();

  const navigate = useNavigate();

  const handleEdit = (income) => {
    clearMessages();
    navigate(`/incomes/${income._id}/edit`);
  };

  const handleDelete = (income) => {
    handleDeleteIncome(income);
    handleClose();
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Col md={6} lg={6}>
        <Card
          className="shadow-sm mb-3 bg-body rounded"
          style={{ border: "none" }}
        >
          <Card.Header>
            <Stack direction="horizontal" gap={3}>
              <span className="fs-4">{income.name}</span>

              <DropdownButton
                title={<i className="fa-sharp fa-solid fa-plus gray-color"></i>}
                id="bg-vertical-dropdown-2"
                variant="link"
                className="ms-auto"
                align="end"
              >
                <Dropdown.Item eventKey="2" onClick={() => handleEdit(income)}>
                  Editar
                </Dropdown.Item>
                <Dropdown.Item eventKey="3" onClick={handleShow}>
                  Borrar
                </Dropdown.Item>
              </DropdownButton>
            </Stack>
          </Card.Header>
          <Card.Body>
            <Card.Title>
              {currencyType === "ARS" &&
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  minimumFractionDigits: 2,
                  currency: "ARS",
                }).format(income.amount.toFixed(2))}
              {currencyType === "USD" &&
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  minimumFractionDigits: 2,
                  currency: "USD",
                }).format(income.amount.toFixed(2) / currency?.compra || 1)}
            </Card.Title>
          </Card.Body>
        </Card>
      </Col>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Borrar ingreso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de eliminar el presupuesto{" "}
          <span className="fw-bold">{income.name}</span>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => handleDelete(income)}>
            Sí, estoy seguro
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Income;
