import {
  Card,
  Button,
  Placeholder,
  Stack,
  DropdownButton,
  Row,
  Col,
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";

// components
import Debt from "./Debt";

// custom hooks
import { useMessageContext } from "../hooks/useMessageContext";
import { useDebtContext } from "../hooks/useDebtContext";
import { useQuery } from "react-query";

const Debts = () => {
  const { clearMessages } = useMessageContext();
  const { getDebts } = useDebtContext();

  const { data, isLoading } = useQuery({
    queryKey: ["debts"],
    queryFn: getDebts,
  });

  const navigate = useNavigate();

  const debtList = data?.map((debt) => {
    return <Debt key={debt._id} debt={debt} />;
  });

  const handleShowDebtFormOrList = () => {
    clearMessages();
    navigate("add");
  };

  return (
    <>
      <Row className="mb-4">
        <Col>
          <Card className="bg-card-secondary">
            <Card.Body>
              <Stack direction="horizontal" gap={3}>
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
      <div>
        {isLoading && (
          <Card
            className="mb-4"
            style={{ backgroundColor: "hsl(0, 0%, 97%, 0.5)", border: "none" }}
          >
            <Card.Body className="p-0">
              <Card.Header style={{ border: "none" }} className="py-2">
                <Placeholder
                  as={Card.Title}
                  animation="wave"
                  className="justify-content-between"
                >
                  <Stack direction="horizontal" gap={3}>
                    <Placeholder xs={3} />
                    <Placeholder.Button
                      as={DropdownButton}
                      variant="link"
                      className="ms-auto"
                      animation="wave"
                    >
                      <i className="fa-sharp fa-solid fa-plus gray-color"></i>
                    </Placeholder.Button>
                  </Stack>
                </Placeholder>
              </Card.Header>

              <Placeholder
                className="mt-3 px-3"
                as={Card.Text}
                animation="wave"
              >
                <Placeholder xs={1} />
              </Placeholder>
              <Placeholder className="px-3" as={Card.Text} animation="wave">
                <Placeholder xs={2} />
              </Placeholder>
              <Placeholder className="px-3" as={Card.Text} animation="wave">
                <Placeholder xs={1} />
              </Placeholder>
            </Card.Body>
          </Card>
        )}
      </div>
      <div>
        {data?.length > 0 && !isLoading && <Row>{debtList}</Row>}
        {data?.length === 0 && !isLoading && (
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
      </div>
    </>
  );
};

export default Debts;
