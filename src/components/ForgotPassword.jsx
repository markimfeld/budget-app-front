import {
  Form,
  Button,
  Card,
  Col,
  Row,
  FloatingLabel,
  Container,
} from "react-bootstrap";
import * as Yup from "yup";

// formik
import { useFormik } from "formik";

// custom hooks
import { useMessageContext } from "../hooks/useMessageContext";
import loginService from "../services/login";
import { useState } from "react";

const ForgotPasswordForm = () => {
  const {
    message,
    handleSetMessage,
    handleSetType,
    recordType,
    handleSetRecordType,
    clearMessages,
  } = useMessageContext();
  const [isSend, setIsSend] = useState(false);

  const onSubmit = async ({ email }) => {
    try {
      await loginService.recoverPassword({ email });
      clearMessages();
      handleSetMessage("Se envió un mail a tu casilla.");
      handleSetType("success");
      handleSetRecordType("user");
      setIsSend(true);
    } catch (error) {
      console.log(error);
    }
  };

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("Usá el formato usuario@dominio.com")
      .required("Requerido"),
  });

  const { handleSubmit, values, setFieldValue, errors, touched } = useFormik({
    initialValues: {
      email: "",
      loginEnabledBtn: false,
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit,
  });

  const onChangeEmail = (e) => {
    setFieldValue("email", e.target.value);
    if (values.email) {
      setFieldValue("loginEnabledBtn", true);
    }
  };

  const showMessage = () => {
    return message !== null && recordType === "user";
  };

  return (
    <>
      <Container>
        <Row
          className="justify-content-md-center align-items-center"
          style={{ height: "97vh" }}
        >
          {!isSend && (
            <Col md="6">
              <Card className="shadow-sm py-2 mb-3 bg-body rounded-0">
                <Card.Body>
                  <Card.Title className="text-center fs-1 mb-4">
                    <i className="fa-solid fa-coins"></i> Finance Pro
                  </Card.Title>
                  <Card.Subtitle className="fs-5 mb-2">
                    Ingresá tu correo electrónico con el que te registraste.
                  </Card.Subtitle>
                  <Form noValidate onSubmit={handleSubmit}>
                    <Row className="g-2 mb-3">
                      <Col>
                        <FloatingLabel
                          controlId="floatingPassword"
                          label="Email"
                        >
                          <Form.Control
                            name="email"
                            value={values.email}
                            onChange={onChangeEmail}
                            type="email"
                            placeholder="Email"
                            required
                            isValid={touched.email && !errors.email}
                            isInvalid={errors.email}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.email}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Col>
                    </Row>

                    <div className="d-grid gap-2">
                      {values.loginEnabledBtn && (
                        <Button variant="success" type="submit">
                          Enviar
                        </Button>
                      )}
                      {!values.loginEnabledBtn && (
                        <Button variant="success" type="submit" disabled>
                          Enviar
                        </Button>
                      )}
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          )}
          {isSend && (
            <Col md="6">
              <Card className="shadow-sm py-2 mb-3 bg-body rounded-0">
                <Card.Body>
                  <Card.Title className="text-center fs-1 mb-4">
                    <i className="fa-solid fa-coins"></i> Finance Pro
                  </Card.Title>

                  {showMessage && (
                    <p className="text-center mb-0 mt-3 text-success">
                      {message}
                    </p>
                  )}
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default ForgotPasswordForm;
