import { Form, Button, Stack, Card, FloatingLabel } from "react-bootstrap";

// formik
import { useFormik } from "formik";

const ExpenseFormAdd = (props) => {
  const { onSubmit, onCancelOperation } = props;

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      name: "",
      description: "",
      amount: "",
    },
    onSubmit,
  });

  return (
    <Card style={{ border: "none", backgroundColor: "hsl(0, 0%, 97%, 0.5)" }}>
      <Card.Header style={{ border: "none" }}>
        <Card.Title className="text-center fs-3">Nuevo gasto</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <FloatingLabel controlId="floatingName" label="Nombre del gasto">
              <Form.Control
                name="name"
                value={values.name}
                onChange={handleChange}
                type="text"
                placeholder="Horeb"
                required
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDescripcion">
            <FloatingLabel controlId="floatingDescription" label="Descripción">
              <Form.Control
                name="description"
                value={values.description}
                onChange={handleChange}
                type="text"
                placeholder="Alfajor"
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicMonto">
            <FloatingLabel controlId="floatingAmount" label="Monto">
              <Form.Control
                name="amount"
                value={values.amount}
                onChange={handleChange}
                type="number"
                placeholder="15000"
                required
              />
            </FloatingLabel>
          </Form.Group>

          <Stack direction="horizontal" gap={3}>
            <Button className="ms-auto" variant="success" type="submit">
              Guardar
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => onCancelOperation(true)}
            >
              Cancelar
            </Button>
          </Stack>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ExpenseFormAdd;
