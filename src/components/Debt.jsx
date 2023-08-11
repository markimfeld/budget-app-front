import { useState } from "react";
import {
  Card,
  Stack,
  DropdownButton,
  Dropdown,
  Button,
  Modal,
  Col,
  Badge,
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";

// custom hooks
import { useDebtContext } from "../hooks/useDebtContext";
import { useMessageContext } from "../hooks/useMessageContext";

const Debt = ({ debt }) => {
  const { clearMessages } = useMessageContext();
  const { handleDeleteDebt } = useDebtContext();

  const navigate = useNavigate();

  const handleDetails = (debt) => {
    clearMessages();
    navigate(`/debts/${debt._id}/details`);
  };

  const handleEdit = (debt) => {
    clearMessages();
    navigate(`/debts/${debt._id}/edit`, { replace: true });
  };

  const handleDelete = (debt) => {
    handleDeleteDebt(debt);
    handleClose();
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Col md={12}>
        <Card
          className="shadow-sm p-3 mb-3 bg-body rounded"
          style={{ border: "none" }}
        >
          <Card.Body className="px-2 py-1">
            <Stack direction="horizontal" gap={3}>
              <span>
                <Card.Title className="mb-2">{debt.name}</Card.Title>
                <Card.Text className="card-subtitle">
                  {/* {debt.leftAmountInstallments} de{" "}
                  {debt.initialAmountInstallments} */}
                  {debt?.status === false && (
                    <Badge className="ms-auto" bg="secondary">
                      {debt.leftAmountInstallments} de{" "}
                      {debt.initialAmountInstallments}
                    </Badge>
                  )}
                  {debt?.status === true && (
                    <Badge className="ms-auto" bg="primary">
                      Pagado
                    </Badge>
                  )}
                </Card.Text>
              </span>
              <Card.Title className="ms-auto mb-0">
                <Stack direction="horizontal" gap={3}>
                  <span className="fs-4 fw-bold">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      minimumFractionDigits: 2,
                      currency: "USD",
                    }).format(debt.installmentAmount.toFixed(2))}
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
                      onClick={() => handleDetails(debt)}
                    >
                      Detalle
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="1"
                      onClick={() => handleEdit(debt)}
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
      </Col>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Borrar Presupuesto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de eliminar el presupuesto{" "}
          <span className="fw-bold">{debt.name}</span>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => handleDelete(debt)}>
            Sí, estoy seguro
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Debt;
