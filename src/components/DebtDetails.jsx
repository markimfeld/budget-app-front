import {
  Card,
  Stack,
  Col,
  Row,
  Button,
  Placeholder,
  Badge,
} from "react-bootstrap";

import { useQuery } from "react-query";

import { useDebtContext } from "../hooks/useDebtContext";
import { useMessageContext } from "../hooks/useMessageContext";
import { useCurrencyContext } from "../hooks/useCurrencyContext";

import { format } from "date-fns";

import { useNavigate, useParams } from "react-router-dom";

const DebtDetails = () => {
  const { getDebts, isPaid } = useDebtContext();

  const { clearMessages } = useMessageContext();

  const { getCurrencyPrice, currencyType } = useCurrencyContext();

  const { data: currency } = useQuery({
    queryKey: ["currency", { type: "blue" }],
    queryFn: getCurrencyPrice,
  });

  const { debtId } = useParams("debtId");

  const { data: debt, isLoading } = useQuery({
    queryKey: ["debts", { id: debtId, filters: { isPaid } }],
    queryFn: getDebts,
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/debts");
  };

  const handleEdit = (debt) => {
    clearMessages();
    navigate(`/debts/${debt._id}/edit`, { replace: true });
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
                  onClick={() => handleEdit(debt)}
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
            <Card.Text className="fs-2 fw-bold text-center">
              {debt?.name}
            </Card.Text>
            <hr className="mb-0" />
          </Card.Header>
          <Card.Body>
            <Stack className="mb-2" direction="horizontal" gap={3}>
              <span className="text-muted">Monto de la cuota: </span>
              <span className="ms-auto fw-bold">
                {currencyType === "ARS" &&
                  new Intl.NumberFormat("en-US", {
                    style: "currency",
                    minimumFractionDigits: 2,
                    currency: "ARS",
                  }).format(debt?.installmentAmount.toFixed(2))}
                {currencyType === "USD" &&
                  currency &&
                  new Intl.NumberFormat("en-US", {
                    style: "currency",
                    minimumFractionDigits: 2,
                    currency: "USD",
                  }).format(
                    debt?.installmentAmount.toFixed(2) / currency?.compra
                  )}
              </span>
            </Stack>
            <Stack className="mb-2" direction="horizontal" gap={3}>
              <span className="text-muted">Monto restante: </span>
              <span className="ms-auto fw-bold">
                {currencyType === "ARS" &&
                  new Intl.NumberFormat("en-US", {
                    style: "currency",
                    minimumFractionDigits: 2,
                    currency: "ARS",
                  }).format(
                    debt?.installmentAmount.toFixed(2) *
                      debt?.leftAmountInstallments
                  )}
                {currencyType === "USD" &&
                  currency &&
                  new Intl.NumberFormat("en-US", {
                    style: "currency",
                    minimumFractionDigits: 2,
                    currency: "USD",
                  }).format(
                    (debt?.installmentAmount.toFixed(2) *
                      debt?.leftAmountInstallments) /
                      currency?.compra
                  )}
              </span>
            </Stack>
            <Stack className="mb-2" direction="horizontal" gap={3}>
              <span className="text-muted">Monto total: </span>
              <span className="ms-auto fw-bold">
                {currencyType === "ARS" &&
                  new Intl.NumberFormat("en-US", {
                    style: "currency",
                    minimumFractionDigits: 2,
                    currency: "ARS",
                  }).format(
                    debt?.installmentAmount.toFixed(2) *
                      debt?.initialAmountInstallments
                  )}
                {currencyType === "USD" &&
                  currency &&
                  new Intl.NumberFormat("en-US", {
                    style: "currency",
                    minimumFractionDigits: 2,
                    currency: "USD",
                  }).format(
                    (debt?.installmentAmount.toFixed(2) *
                      debt?.initialAmountInstallments) /
                      currency?.compra
                  )}
              </span>
            </Stack>
            <Stack className="mb-2" direction="horizontal" gap={3}>
              <span className="text-muted">Cuotas restantes: </span>
              <span className="ms-auto fw-bold">
                {debt?.leftAmountInstallments}
              </span>
            </Stack>
            <Stack className="mb-2" direction="horizontal" gap={3}>
              <span className="text-muted">Cantidad de cuotas: </span>
              <span className="ms-auto fw-bold">
                {debt?.initialAmountInstallments}
              </span>
            </Stack>
            <Stack className="mb-2" direction="horizontal" gap={3}>
              <span className="text-muted">Fecha de compra: </span>
              <span className="ms-auto fw-bold">
                {format(new Date(debt?.startDate), "dd/MM/yyyy")}
              </span>
            </Stack>
            <Stack className="mb-2" direction="horizontal" gap={3}>
              <span className="text-muted">Fecha de finalización: </span>
              <span className="ms-auto fw-bold">
                {format(new Date(debt?.endDate), "dd/MM/yyyy")}
              </span>
            </Stack>
            <Stack className="mb-2" direction="horizontal" gap={3}>
              <span className="text-muted">Estado: </span>
              <span className="ms-auto fw-bold">
                {debt?.isPaid === false && (
                  <Badge className="ms-auto" bg="secondary">
                    Falta
                  </Badge>
                )}
                {debt?.isPaid === true && (
                  <Badge className="ms-auto" bg="primary">
                    Pagado
                  </Badge>
                )}
              </span>
            </Stack>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default DebtDetails;
