import { Card, Button, Placeholder, Stack, Row, Col } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import { useQueryClient } from "react-query";

import debtService from "../services/debt";

// components
import Debt from "./Debt";

import { useQuery } from "react-query";

// labels
import { DEBT_UPDATED_MESSAGE } from "../labels/labels";

// custom hooks
import { useMessageContext } from "../hooks/useMessageContext";
import { useDebtContext } from "../hooks/useDebtContext";
import { useCurrencyContext } from "../hooks/useCurrencyContext";

const Debts = () => {
  const {
    handleSetMessage,
    handleSetType,
    handleSetRecordType,
    clearMessages,
  } = useMessageContext();

  const { getDebts, isPaid, handleIsPaid } = useDebtContext();

  const { getCurrencyPrice, currencyType } = useCurrencyContext();

  const { data: currency } = useQuery({
    queryKey: ["currency", { type: "blue" }],
    queryFn: getCurrencyPrice,
  });

  // Get QueryClient from the context
  const queryClient = useQueryClient();

  const { data: debts, isLoading } = useQuery({
    queryKey: ["debts", { filters: { isPaid } }],
    queryFn: getDebts,
  });

  const navigate = useNavigate();

  const debtList = debts?.map((debt) => {
    return (
      <Debt
        key={debt._id}
        debt={debt}
        currency={currency}
        currencyType={currencyType}
      />
    );
  });

  const totalDebt = debts
    ?.map((debt) => debt.leftAmountInstallments * debt.installmentAmount)
    .reduce((acc, currentValue) => acc + currentValue, 0)
    .toFixed(2);

  const nextMonthTotal = debts
    ?.map((debt) =>
      debt.leftAmountInstallments !== 0 ? debt.installmentAmount : 0
    )
    .reduce((acc, currentValue) => acc + currentValue, 0)
    .toFixed(2);

  const handleShowDebtFormOrList = () => {
    clearMessages();
    navigate("add");
  };

  const handlePaid = async () => {
    const debtsFiltered = debts.filter(
      (debt) => debt.leftAmountInstallments > 0
    );

    if (debtsFiltered.length === 0) {
      handleSetMessage("No tenes mas deudas");
      handleSetType("success");
      handleSetRecordType("debt");
      return;
    }

    const { data } = await debtService.updateMany({ debts: debtsFiltered });

    if (data.nModified) {
      handleSetMessage(DEBT_UPDATED_MESSAGE);
      handleSetType("success");
      handleSetRecordType("debt");
      queryClient.invalidateQueries({ queryKey: ["debts"] });
    }
  };

  const handleFilterByPaid = () => {
    handleIsPaid(!isPaid);
  };

  return (
    <>
      <Row>
        <Col md={6}>
          {!isLoading && (
            <Card
              className="shadow-sm mb-4 bg-body rounded"
              style={{ border: "none" }}
            >
              <Card.Body>
                <p className="m-0 mb-1">Deuda total</p>
                <h3 className="ms-auto fw-bold mb-3">
                  {currencyType === "ARS" &&
                    new Intl.NumberFormat("en-US", {
                      style: "currency",
                      minimumFractionDigits: 2,
                      currency: "ARS",
                    }).format(totalDebt)}
                  {currencyType === "USD" &&
                    currency &&
                    new Intl.NumberFormat("en-US", {
                      style: "currency",
                      minimumFractionDigits: 2,
                      currency: "USD",
                    }).format(totalDebt / currency?.compra)}
                </h3>
              </Card.Body>
            </Card>
          )}
          {isLoading && (
            <Card
              className="mb-3 p-2 shadow-sm bg-body rounded"
              border="light"
              style={{ backgroundColor: "hsl(0, 0%, 97%)" }}
            >
              <Card.Body>
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={4} />
                </Placeholder>
              </Card.Body>
            </Card>
          )}
        </Col>
        <Col md={6}>
          {!isLoading && (
            <Card
              className="shadow-sm mb-4 bg-body rounded"
              style={{ border: "none" }}
            >
              <Card.Body>
                <p className="m-0 mb-1">Monto a pagar próximo mes</p>
                <h3 className="ms-auto fw-bold mb-3">
                  {currencyType === "ARS" &&
                    new Intl.NumberFormat("en-US", {
                      style: "currency",
                      minimumFractionDigits: 2,
                      currency: "ARS",
                    }).format(nextMonthTotal)}
                  {currencyType === "USD" &&
                    currency &&
                    new Intl.NumberFormat("en-US", {
                      style: "currency",
                      minimumFractionDigits: 2,
                      currency: "USD",
                    }).format(nextMonthTotal / currency?.compra)}
                </h3>
              </Card.Body>
            </Card>
          )}
          {isLoading && (
            <Card
              className="mb-3 p-2 shadow-sm bg-body rounded"
              border="light"
              style={{ backgroundColor: "hsl(0, 0%, 97%)" }}
            >
              <Card.Body>
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={4} />
                </Placeholder>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <Card className="bg-card-secondary">
            <Card.Body>
              <Stack direction="horizontal" gap={3}>
                <Button variant="light" size="md" onClick={() => handlePaid()}>
                  Pagar resumen
                </Button>
                <Button
                  size="md"
                  onClick={() => handleShowDebtFormOrList()}
                  className="ms-auto"
                >
                  <i className="fa-solid fa-plus fa-sm"></i> Agregar deuda
                </Button>
              </Stack>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={4} sm={12} lg={3}>
          <Row className="mb-sm-4">
            <Col>
              <Card
                style={{ backgroundColor: "white", border: "none" }}
                className="shadow-sm mb-3 bg-body rounded"
              >
                <Card.Body style={{ wordBreak: "break-all" }}>
                  <Card.Text>Filtros:</Card.Text>
                  <Button
                    onClick={() => handleFilterByPaid()}
                    variant="outline-success"
                    className="me-2 mb-2"
                    active
                  >
                    {isPaid ? "No terminadas" : "Terminadas"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col>
          {isLoading && (
            <>
              <Row>
                <Col>
                  <Card
                    className="mb-3 shadow-sm bg-body rounded"
                    border="light"
                    style={{ backgroundColor: "white" }}
                  >
                    <Card.Body>
                      <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={6} />
                      </Placeholder>
                      <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={4} />
                      </Placeholder>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card
                    className="mb-3 shadow-sm bg-body rounded"
                    border="light"
                    style={{ backgroundColor: "white" }}
                  >
                    <Card.Body>
                      <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={6} />
                      </Placeholder>
                      <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={4} />
                      </Placeholder>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card
                    className="mb-3 shadow-sm bg-body rounded"
                    border="light"
                    style={{ backgroundColor: "white" }}
                  >
                    <Card.Body>
                      <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={6} />
                      </Placeholder>
                      <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={4} />
                      </Placeholder>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card
                    className="mb-3 shadow-sm bg-body rounded"
                    border="light"
                    style={{ backgroundColor: "white" }}
                  >
                    <Card.Body>
                      <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={6} />
                      </Placeholder>
                      <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={4} />
                      </Placeholder>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card
                    className="mb-3 shadow-sm bg-body rounded"
                    border="light"
                    style={{ backgroundColor: "white" }}
                  >
                    <Card.Body>
                      <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={6} />
                      </Placeholder>
                      <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={4} />
                      </Placeholder>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </>
          )}
          {debts?.length > 0 && !isLoading && <Row>{debtList}</Row>}
          {debts?.length === 0 && !isLoading && (
            <Card
              border="light"
              style={{ backgroundColor: "white" }}
              className="shadow-sm py-2 mb-3 bg-body rounded"
            >
              <Card.Body>
                <Card.Title className="mb-0">
                  ¡Excelente! No tienes deudas 😄.{" "}
                  <Button
                    onClick={() => handleShowDebtFormOrList()}
                    variant="link"
                  >
                    Crear nuevo deuda
                  </Button>
                </Card.Title>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </>
  );
};

export default Debts;
