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

const Debt = ({ debt, currency, currencyType }) => {
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
          className="shadow-sm py-0 mb-3 bg-body rounded"
          style={{ border: "none" }}
        >
          <Card.Body>
            <Stack direction="horizontal" gap={3}>
              <span>
                <Card.Title className="mb-3">{debt.name}</Card.Title>
                <Card.Text className="card-subtitle">
                  {/* {debt.leftAmountInstallments} de{" "}
                  {debt.initialAmountInstallments} */}
                  {debt?.isPaid === false && (
                    <Badge className="ms-auto" bg="secondary">
                      {debt.leftAmountInstallments} de{" "}
                      {debt.initialAmountInstallments}
                    </Badge>
                  )}
                  {debt?.isPaid === true && (
                    <Badge className="ms-auto" bg="primary">
                      Pagado
                    </Badge>
                  )}
                </Card.Text>
              </span>
              <Card.Title className="ms-auto mb-0">
                <Stack direction="vertical" gap={1}>
                  <span className="fs-5 fw-bold m-0 p-0">
                    {currencyType === "ARS" &&
                      new Intl.NumberFormat("en-US", {
                        style: "currency",
                        minimumFractionDigits: 2,
                        currency: "ARS",
                      }).format(debt.installmentAmount.toFixed(2))}
                    {currencyType === "USD" &&
                      currency &&
                      new Intl.NumberFormat("en-US", {
                        style: "currency",
                        minimumFractionDigits: 2,
                        currency: "USD",
                      }).format(
                        debt.installmentAmount.toFixed(2) / currency?.compra
                      )}
                  </span>

                  <DropdownButton
                    title={
                      <i className="fa-sharp fa-solid fa-plus gray-color"></i>
                    }
                    id="bg-vertical-dropdown-2"
                    variant="link"
                    className="ms-auto"
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
          <Modal.Title>Borrar deuda</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de eliminar la deuda{" "}
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
