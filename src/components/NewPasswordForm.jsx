import {
  Form,
  Button,
  Card,
  Col,
  Row,
  FloatingLabel,
  Container,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

// formik
import { useFormik } from "formik";

// custom hooks
import { useMessageContext } from "../hooks/useMessageContext";
import { useAuthContext } from "../hooks/useAuthContext";

import loginService from "../services/login";

const NewPasswordForm = () => {
  const {
    handleSetMessage,
    handleSetType,
    handleSetRecordType,
    clearMessages,
  } = useMessageContext();

  const { logout } = useAuthContext();

  const navigate = useNavigate();

  const { token } = useParams("token");

  const onSubmit = async ({ password, confirmPassword }) => {
    try {
      const { isUpdated } = await loginService.newPassword({
        password,
        confirmPassword,
        token,
      });

      if (isUpdated) {
        logout();
        clearMessages();
        handleSetMessage("Clave actualizada correctamente.");
        handleSetType("success");
        handleSetRecordType("user");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const RegisterSchema = Yup.object().shape({
    password: Yup.string().min(6, "Muy corta!").required("Requerido"),
    confirmPassword: Yup.string()
      .min(6, "Muy corta!")
      .required("Requerido")
      .oneOf([Yup.ref("password")], "Clave deben coincidir"),
  });

  const { handleSubmit, values, setFieldValue, errors, touched } = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
      registerEnabledBtn: false,
    },
    validationSchema: RegisterSchema,
    onSubmit,
  });

  const onChangePassword = (e) => {
    setFieldValue("password", e.target.value);
    if (values.password && values.confirmPassword) {
      setFieldValue("registerEnabledBtn", true);
    }
  };

  const onChangeConfirmPassword = (e) => {
    setFieldValue("confirmPassword", e.target.value);
    if (values.password && values.confirmPassword) {
      setFieldValue("registerEnabledBtn", true);
    }
  };

  return (
    <>
      <Container>
        <Row
          className="justify-content-md-center align-items-center"
          style={{ height: "97vh" }}
        >
          <Col md="6">
            <Card
              style={{ borderRadius: 0, backgroundColor: "hsl(0, 0%, 97%)" }}
            >
              <Card.Body>
                <Card.Title className="text-center fs-1 mb-4">
                  <i className="fa-solid fa-coins"></i> Finance Pro
                </Card.Title>
                <Form noValidate onSubmit={handleSubmit}>
                  <Row className="g-2 mb-2">
                    <Col>
                      <FloatingLabel
                        controlId="floatingPassword"
                        label="Nueva clave"
                      >
                        <Form.Control
                          name="password"
                          value={values.password}
                          onChange={onChangePassword}
                          type="password"
                          placeholder="password"
                          required
                          isValid={touched.password && !errors.password}
                          isInvalid={errors.password}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Col>
                  </Row>
                  <Row className="g-2 mb-2">
                    <Col>
                      <FloatingLabel
                        controlId="floatingPassword"
                        label="Confirmar clave"
                      >
                        <Form.Control
                          name="confirmPassword"
                          value={values.confirmPassword}
                          onChange={onChangeConfirmPassword}
                          type="password"
                          placeholder="confirmPassword"
                          required
                          isValid={
                            touched.confirmPassword && !errors.confirmPassword
                          }
                          isInvalid={errors.confirmPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.confirmPassword}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Col>
                  </Row>

                  <div className="d-grid gap-2">
                    {values.registerEnabledBtn && (
                      <Button variant="success" type="submit">
                        Reestablecer
                      </Button>
                    )}
                    {!values.registerEnabledBtn && (
                      <Button variant="success" type="submit" disabled>
                        Reestablecer
                      </Button>
                    )}
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NewPasswordForm;
