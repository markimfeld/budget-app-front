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
import Income from "./Income";

// custom hooks
import { useMessageContext } from "../hooks/useMessageContext";
import { useIncomeContext } from "../hooks/useIncomeContext";
import { useQuery } from "react-query";

const Incomes = () => {
  const { clearMessages } = useMessageContext();
  const { getIncomes } = useIncomeContext();

  const { data, isLoading } = useQuery({
    queryKey: ["incomes"],
    queryFn: getIncomes,
  });

  const navigate = useNavigate();

  const incomeList = data?.map((income) => {
    return <Income key={income._id} income={income} />;
  });

  const handleShowIncomeFormOrList = () => {
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
                  onClick={() => handleShowIncomeFormOrList()}
                  className="ms-auto"
                >
                  <i className="fa-solid fa-plus fa-sm"></i> Agregar ingreso
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
        {data?.length > 0 && !isLoading && <Row>{incomeList}</Row>}
        {data?.length === 0 && !isLoading && (
          <Card border="light" className="shadow-sm py-2 mb-3 bg-body rounded">
            <Card.Body>
              <Card.Title className="mb-0">
                No hay ingresos creados aún 😄.{" "}
                <Button
                  onClick={() => handleShowIncomeFormOrList()}
                  variant="link"
                >
                  Crear nuevo ingreso
                </Button>
              </Card.Title>
            </Card.Body>
          </Card>
        )}
      </div>
    </>
  );
};

export default Incomes;
