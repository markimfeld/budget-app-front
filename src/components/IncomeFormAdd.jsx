import { Form, Button, Stack, Card, FloatingLabel } from "react-bootstrap";

// formik
import { useFormik } from "formik";

const IncomeFormAdd = (props) => {
  const { onSubmit, onCancelOperation } = props;

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      name: "",
      amount: "",
    },
    onSubmit,
  });

  return (
    <Card
      style={{ border: "none", backgroundColor: "white" }}
      className="shadow-sm mb-3 mt-4 bg-body rounded"
    >
      <Card.Header style={{ border: "none", backgroundColor: "#373E68" }}>
        <Card.Title className="text-center fs-3 text-white">
          Nuevo ingreso
        </Card.Title>
      </Card.Header>
      <Card.Body className="p-4">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <FloatingLabel controlId="floatingName" label="Nombre del ingreso">
              <Form.Control
                name="name"
                value={values.name}
                onChange={handleChange}
                type="text"
                placeholder="Sueldo"
                required
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicExpectedAmount">
            <FloatingLabel controlId="floatingExpectedAmount" label="Monto">
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
          <div className="d-grid gap-2">
            <Stack direction="horizontal" gap={3}>
              <Button className="ms-auto" variant="success" type="submit">
                Guardar
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

export default IncomeFormAdd;
