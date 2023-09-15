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
import { useInvestmentContext } from "../hooks/useInvestmentContext";
import { useMessageContext } from "../hooks/useMessageContext";

const Investment = ({ investment }) => {
  const { clearMessages } = useMessageContext();
  const { handleDeleteInvestment } = useInvestmentContext();

  const navigate = useNavigate();

  const handleDetails = (investment) => {
    clearMessages();
    navigate(`/investments/${investment._id}/details`);
  };

  const handleEdit = (investment) => {
    clearMessages();
    navigate(`/investments/${investment._id}/edit`, { replace: true });
  };

  const handleDelete = (investment) => {
    handleDeleteInvestment(investment);
    handleClose();
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Col md={6}>
        <Card
          className="shadow-sm p-4 mb-3 bg-body rounded"
          style={{ border: "none" }}
        >
          <Card.Body className="px-2 py-1">
            <Stack direction="horizontal" gap={3}>
              <span>
                <Card.Title className="mb-2">{investment.name}</Card.Title>
              </span>
              <Card.Title className="ms-auto mb-0">
                <Stack direction="horizontal" gap={3}>
                  <span className="fs-4 fw-bold">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      minimumFractionDigits: 2,
                      currency: "USD",
                    }).format(investment.amount.toFixed(2))}
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
                      onClick={() => handleDetails(investment)}
                    >
                      Detalle
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="1"
                      onClick={() => handleEdit(investment)}
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
          <span className="fw-bold">{investment.name}</span>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => handleDelete(investment)}>
            Sí, estoy seguro
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Investment;
