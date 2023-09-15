import { Form, Button, Stack, Card, FloatingLabel } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

// formik
import { useFormik } from "formik";

import * as Yup from "yup";

const ExpenseFormAdd = (props) => {
  const { onSubmit, onCancelOperation, budgets } = props;

  const navigate = useNavigate();

  const ExpenseSchema = Yup.object().shape({
    name: Yup.string().required("Requerido"),
    amount: Yup.number()
      .min(0.01, "Debe ser mayor o igual a 1")
      .required("Requerido"),
    budget: Yup.string().required("Requerido"),
  });

  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: {
      name: "",
      description: "",
      amount: "",
      budget: "",
    },
    validationSchema: ExpenseSchema,
    onSubmit,
  });

  const budgetOptions = budgets?.map((budget) => {
    return (
      <option key={budget._id} value={budget._id}>
        {budget.name}
      </option>
    );
  });

  if (budgets?.length === 0) {
    // return "Para crear un gasto, primero tenes que tener algun presupuesto creado.";
    return (
      <Card
        border="light"
        style={{ backgroundColor: "white" }}
        className="shadow-sm mb-3 py-2 bg-body rounded"
      >
        <Card.Body>
          <Card.Title className="mb-0">
            Para crear un gasto, primero tenes que tener algun presupuesto
            creado 😄.{" "}
            <Button onClick={() => navigate("/budgets/add")} variant="link">
              Crear nuevo presupuesto
            </Button>
          </Card.Title>
        </Card.Body>
      </Card>
    );
  }

  if (budgets?.length > 0) {
    return (
      <Card
        style={{ border: "none", backgroundColor: "white" }}
        className="shadow-sm mb-3 mt-4 bg-body rounded"
      >
        <Card.Header style={{ border: "none", backgroundColor: "#373E68" }}>
          <Card.Title className="text-center fs-3">Nuevo gasto</Card.Title>
        </Card.Header>
        <Card.Body className="p-4">
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <FloatingLabel controlId="floatingName" label="Nombre del gasto">
                <Form.Control
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Horeb"
                  required
                  isValid={touched.name && !errors.name}
                  isInvalid={errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescripcion">
              <FloatingLabel
                controlId="floatingDescription"
                label="Descripción (opcional)"
              >
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
                  isValid={touched.amount && !errors.amount}
                  isInvalid={errors.amount}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.amount}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPresupuesto">
              <FloatingLabel controlId="floatingSelect" label="Presupuesto">
                <Form.Select
                  name="budget"
                  value={values.budget}
                  onChange={handleChange}
                  aria-label="Floating label select example"
                  isValid={touched.budget && !errors.budget}
                  isInvalid={errors.budget}
                >
                  <option>Seleccionar</option>
                  {budgetOptions}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.budget}
                </Form.Control.Feedback>
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
  }
};

export default ExpenseFormAdd;
