import { Form, Button, Stack, Card, FloatingLabel } from "react-bootstrap";

// formik
import { useFormik } from "formik";

const BudgetFormEdit = (props) => {
  const { onSubmit, onCancelOperation, budgetToUpdate } = props;

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      name: budgetToUpdate?.name || "",
      expectedAmount: budgetToUpdate?.expectedAmount || "",
    },
    onSubmit,
  });

  return (
    <Card style={{ border: "none", backgroundColor: "hsl(0, 0%, 97%, 0.5)" }}>
      <Card.Header style={{ border: "none" }}>
        <Card.Title className="text-center fs-3">Editar presupuesto</Card.Title>
      </Card.Header>
      <Card.Body className="p-4">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <FloatingLabel
              controlId="floatingName"
              label="Nombre del presupuesto"
            >
              <Form.Control
                name="name"
                value={values.name}
                onChange={handleChange}
                type="text"
                placeholder="Comida"
                required
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicExpectedAmount">
            <FloatingLabel
              controlId="floatingExpectedAmount"
              label="Monto previsto"
            >
              <Form.Control
                name="expectedAmount"
                value={values.expectedAmount}
                onChange={handleChange}
                type="number"
                placeholder="15000"
                required
              />
            </FloatingLabel>
          </Form.Group>
          <div className="d-grid gap-2">
            <Stack direction="horizontal" gap={3}>
              <Button className="ms-auto" variant="success" type="submit">
                Modificar
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => onCancelOperation()}
              >
                Cancelar
              </Button>
            </Stack>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BudgetFormEdit;
