import { Form, Button, Stack, Card, FloatingLabel } from "react-bootstrap";

import * as Yup from "yup";

// formik
import { useFormik } from "formik";

const InvestmentFormEdit = (props) => {
  const { onSubmit, onCancelOperation, investmentToUpdate } = props;

  const InvestmentSchema = Yup.object().shape({
    name: Yup.string().required("Requerido"),
    amount: Yup.number()
      .min(0.01, "Debe ser mayor o igual a 1")
      .required("Requerido"),
  });

  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: {
      name: investmentToUpdate?.name || "",
      amount: investmentToUpdate?.amount || "",
    },
    validationSchema: InvestmentSchema,
    onSubmit,
  });

  return (
    <Card
      style={{ border: "none", backgroundColor: "white" }}
      className="shadow-sm mb-3 mt-4 bg-body rounded"
    >
      <Card.Header style={{ border: "none", backgroundColor: "#373E68" }}>
        <Card.Title className="text-center fs-3 text-white">
          Editar fondo
        </Card.Title>
      </Card.Header>
      <Card.Body className="p-4">
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <FloatingLabel controlId="floatingName" label="Nombre del ingreso">
              <Form.Control
                name="name"
                value={values.name}
                onChange={handleChange}
                type="text"
                placeholder="Fondo"
                required
                isValid={touched.name && !errors.name}
                isInvalid={errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
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
                isValid={touched.amount && !errors.amount}
                isInvalid={errors.amount}
              />
              <Form.Control.Feedback type="invalid">
                {errors.amount}
              </Form.Control.Feedback>
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

export default InvestmentFormEdit;
