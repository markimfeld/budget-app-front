import {
  Form,
  Button,
  Card,
  Row,
  Col,
  FloatingLabel,
  Container,
} from "react-bootstrap";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import * as Yup from "yup";

// formik
import { useFormik } from "formik";

// custom hooks
import { useAuthContext } from "../hooks/useAuthContext";
import { useMessageContext } from "../hooks/useMessageContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    message,
    recordType,
    type,
    handleSetMessage,
    handleSetType,
    handleSetRecordType,
    clearMessages,
  } = useMessageContext();

  const { login, user, isLoading } = useAuthContext();

  const onSubmit = async ({ email, password }) => {
    const response = await login(email, password);
    if (response && response.status === 200) {
      clearMessages();
      navigate(from, { replace: true });
    }
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Usá el formato usuario@dominio.com")
      .required("Requerido"),
    password: Yup.string().min(6, "Muy corta!").required("Requerido"),
  });

  const { handleSubmit, values, setFieldValue, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
      loginEnabledBtn: false,
    },
    validationSchema: LoginSchema,
    onSubmit,
  });

  const onChangeEmail = (e) => {
    setFieldValue("email", e.target.value);
    if (values.email && values.password) {
      setFieldValue("loginEnabledBtn", true);
    }
  };

  const onChangePassword = (e) => {
    setFieldValue("password", e.target.value);
    if (values.email && values.password) {
      setFieldValue("loginEnabledBtn", true);
    }
  };

  const handleShowRegister = () => {
    handleSetMessage(null);
    handleSetType(null);
    handleSetRecordType(null);
    navigate("/register");
  };

  const handleRecoverPassword = () => {
    handleSetMessage(null);
    handleSetType(null);
    handleSetRecordType(null);
    navigate("/forgot-password");
  };

  const showMessage = () => {
    return message !== null && recordType === "user";
  };

  return (
    <>
      {user && <Navigate to={from} replace />}
      {!user && (
        <Container>
          <Row
            className="justify-content-md-center align-items-center"
            style={{ height: "97vh" }}
          >
            <Col md="6">
              <Card className="shadow-sm py-2 mb-3 bg-body rounded-0">
                <Card.Body>
                  <Card.Title className="text-center fs-1 mb-4">
                    <i className="fa-solid fa-coins"></i> Finance Pro
                  </Card.Title>
                  <Form noValidate onSubmit={handleSubmit}>
                    <Row className="g-2 mb-2">
                      <Col md>
                        <FloatingLabel controlId="floatingEmail" label="Email">
                          <Form.Control
                            name="email"
                            value={values.email}
                            onChange={onChangeEmail}
                            type="email"
                            placeholder="lionelmessi@gmail.com"
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
                    <Row className="g-2 mb-2">
                      <Col md>
                        <FloatingLabel
                          controlId="floatingPassword"
                          label="Contraseña"
                        >
                          <Form.Control
                            name="password"
                            value={values.password}
                            onChange={onChangePassword}
                            type="password"
                            placeholder="Ingresá tu contraseña"
                            required
                            isValid={touched.password && !errors.password}
                            isInvalid={touched.password && errors.password}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.password}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Col>
                    </Row>

                    <div className="d-grid gap-2">
                      {values.loginEnabledBtn && !isLoading && (
                        <Button variant="success" type="submit">
                          Iniciar sesión
                        </Button>
                      )}
                      {!values.loginEnabledBtn && !isLoading && (
                        <Button variant="success" type="submit" disabled>
                          Iniciar sesión
                        </Button>
                      )}
                      {values.loginEnabledBtn && isLoading && (
                        <Button variant="success" type="submit" disabled>
                          Iniciando sesión ...
                        </Button>
                      )}
                      {showMessage() && type === "danger" && (
                        <p className="text-center mb-0 mt-3 text-danger">
                          {message}
                        </p>
                      )}
                      {showMessage() && type === "success" && (
                        <p className="text-center mb-0 mt-3 text-success">
                          {message}
                        </p>
                      )}
                      <Button
                        variant="link"
                        className="m-0 p-0"
                        onClick={() => handleRecoverPassword()}
                      >
                        ¿Olvidaste tu clave?
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
              <Card className="shadow-sm py-2 mb-3 bg-body rounded-0">
                <Card.Body>
                  <Card.Text className="text-center">
                    ¿No tenes cuenta?{" "}
                    <Button
                      variant="link"
                      className="m-0 p-0"
                      onClick={() => handleShowRegister()}
                    >
                      Crear una cuenta
                    </Button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Login;
