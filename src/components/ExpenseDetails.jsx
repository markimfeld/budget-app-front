import { Card, Stack, Col, Row, Button, Placeholder } from "react-bootstrap";
import { format } from "date-fns";

import { useQuery } from "react-query";

import { useExpenseContext } from "../hooks/useExpenseContext";
import { useMessageContext } from "../hooks/useMessageContext";

import { useNavigate, useParams } from "react-router-dom";

const ExpenseDetails = () => {
  const { getAllExpenses } = useExpenseContext();

  const { clearMessages } = useMessageContext();

  const { expenseId } = useParams("expenseId");

  const { data: expense, isLoading } = useQuery({
    queryKey: ["allExpenses", { id: expenseId }],
    queryFn: getAllExpenses,
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  const handleEdit = (expense) => {
    clearMessages();
    navigate(`/${expense._id}/edit`, { replace: true });
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
                  size="md"
                  variant="outline-secondary"
                  onClick={() => handleGoBack()}
                >
                  <i className="fa-solid fa-angle-left fa-sm"></i> Volver
                </Button>
                <Button
                  size="md"
                  variant="success"
                  onClick={() => handleEdit(expense)}
                  className="ms-auto"
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
              <span className="fs-4 fw-bold">{expense?.name}</span>
            </Stack>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              Descripción:{" "}
              <span className="fw-bold">{expense?.description || " - "}</span>
            </Card.Text>
            <Card.Text>
              Monto:{" "}
              <span className="fw-bold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  minimumFractionDigits: 2,
                  currency: "ARS",
                }).format(expense.amount.toFixed(2))}
              </span>
            </Card.Text>
            <Card.Text>
              Creado:{" "}
              <span className="fw-bold">
                {format(new Date(expense.createdAt), "dd/MM/yyyy kk:mm")}
              </span>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default ExpenseDetails;
