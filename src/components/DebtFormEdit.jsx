import { Form, Button, Stack, Card, FloatingLabel } from "react-bootstrap";

import * as Yup from "yup";

// formik
import { useFormik } from "formik";

const DebtFormEdit = (props) => {
  const { onSubmit, onCancelOperation, debtToUpdate } = props;

  const DebtSchema = Yup.object().shape({
    name: Yup.string().required("Requerido"),
    installmentAmount: Yup.number()
      .min(0.01, "Debe ser mayor o igual a 1")
      .required("Requerido"),
    leftAmountInstallments: Yup.number()
      .min(0, "Debe ser mayor o igual a 1")
      .required("Requerido"),
    initialAmountInstallments: Yup.number()
      .min(0, "Debe ser mayor o igual a 1")
      .required("Requerido"),
    startDate: Yup.date().required("Requerido"),
    endDate: Yup.date().required("Requerido"),
  });

  const getFormattedDate = (date) => {
    const year = date.toLocaleString("default", {
      year: "numeric",
    });
    const month = date.toLocaleString("default", {
      month: "2-digit",
    });
    const day = date.toLocaleString("default", {
      day: "2-digit",
    });

    return `${year}-${month}-${day}`;
  };

  const startDateFormatted = getFormattedDate(new Date(debtToUpdate.startDate));
  const endDateFormatted = getFormattedDate(new Date(debtToUpdate.endDate));

  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: {
      name: debtToUpdate?.name || "",
      installmentAmount: debtToUpdate?.installmentAmount || "",
      leftAmountInstallments: debtToUpdate?.leftAmountInstallments || 0,
      initialAmountInstallments: debtToUpdate?.initialAmountInstallments || "",
      startDate: startDateFormatted || "",
      endDate: endDateFormatted || "",
    },
    enableReinitialize: true,
    validationSchema: DebtSchema,
    onSubmit,
  });

  return (
    <Card
      style={{ border: "none", backgroundColor: "white" }}
      className="shadow-sm mb-3 mt-4 bg-body rounded"
    >
      <Card.Header style={{ border: "none", backgroundColor: "#373E68" }}>
        <Card.Title className="text-center fs-3">Editar deuda</Card.Title>
      </Card.Header>
      <Card.Body className="p-4">
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <FloatingLabel controlId="floatingName" label="Nombre de la deuda">
              <Form.Control
                name="name"
                value={values.name}
                onChange={handleChange}
                type="text"
                placeholder="Comida"
                required
                isValid={touched.name && !errors.name}
                isInvalid={errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicInstallmentAmount">
            <FloatingLabel
              controlId="floatingInstallmentAmount"
              label="Monto de la cuota"
            >
              <Form.Control
                name="installmentAmount"
                value={values.installmentAmount}
                onChange={handleChange}
                type="number"
                placeholder="15000"
                required
                isValid={touched.installmentAmount && !errors.installmentAmount}
                isInvalid={errors.installmentAmount}
              />
              <Form.Control.Feedback type="invalid">
                {errors.installmentAmount}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicInitialAmountInstallments"
          >
            <FloatingLabel
              controlId="floatingInitialAmountInstallments"
              label="Cantidad de cuotas"
            >
              <Form.Control
                name="initialAmountInstallments"
                value={values.initialAmountInstallments}
                onChange={handleChange}
                type="number"
                placeholder="15000"
                required
                isValid={
                  touched.initialAmountInstallments &&
                  !errors.initialAmountInstallments
                }
                isInvalid={errors.initialAmountInstallments}
              />
              <Form.Control.Feedback type="invalid">
                {errors.initialAmountInstallments}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicLeftAmountInstallments"
          >
            <FloatingLabel
              controlId="floatingLeftAmountInstallments"
              label="Cuotas restantes"
            >
              <Form.Control
                name="leftAmountInstallments"
                value={values.leftAmountInstallments}
                onChange={handleChange}
                type="number"
                placeholder="15000"
                required
                isValid={
                  touched.leftAmountInstallments &&
                  !errors.leftAmountInstallments
                }
                isInvalid={errors.leftAmountInstallments}
              />
              <Form.Control.Feedback type="invalid">
                {errors.leftAmountInstallments}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicStartDate">
            <FloatingLabel
              controlId="floatingStartDate"
              label="Fecha de compra"
            >
              <Form.Control
                name="startDate"
                value={values.startDate}
                onChange={handleChange}
                type="date"
                placeholder="15000"
                required
                isValid={touched.startDate && !errors.startDate}
                isInvalid={errors.startDate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.startDate}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEndDate">
            <FloatingLabel
              controlId="floatingEndDate"
              label="Fecha de finalización"
            >
              <Form.Control
                name="endDate"
                value={values.endDate}
                onChange={handleChange}
                type="date"
                placeholder="15000"
                required
                isValid={touched.endDate && !errors.endDate}
                isInvalid={errors.endDate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.endDate}
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

export default DebtFormEdit;
