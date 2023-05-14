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

// formik
import { useFormik } from "formik";

// components
import Message from "./Message";

// custom hooks
import { useAuthContext } from "../hooks/useAuthContext";
import { useMessageContext } from "../hooks/useMessageContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/budgets";

  const {
    message,
    recordType,
    handleSetMessage,
    handleSetType,
    handleSetRecordType,
    clearMessages,
  } = useMessageContext();

  const { login, user } = useAuthContext();

  const onSubmit = async ({ email, password }) => {
    const response = await login(email, password);

    if (response && response.status === 200) {
      clearMessages();
      navigate(from, { replace: true });
    }
  };

  const { handleSubmit, values, setFieldValue } = useFormik({
    initialValues: {
      email: "",
      password: "",
      loginEnabledBtn: false,
    },
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
              {showMessage() && <Message />}
              <Card
                style={{ borderRadius: 0, backgroundColor: "hsl(0, 0%, 97%)" }}
              >
                <Card.Body>
                  <Card.Title className="text-center fs-1 mb-4">
                    <i className="fa-solid fa-coins"></i> Finance Pro
                  </Card.Title>
                  <Form onSubmit={handleSubmit}>
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
                          />
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
                          />
                        </FloatingLabel>
                      </Col>
                    </Row>

                    <div className="d-grid gap-2">
                      {values.loginEnabledBtn && (
                        <Button variant="success" type="submit">
                          Iniciar sesión
                        </Button>
                      )}
                      {!values.loginEnabledBtn && (
                        <Button variant="success" type="submit" disabled>
                          Iniciar sesión
                        </Button>
                      )}
                    </div>
                  </Form>
                </Card.Body>
              </Card>
              <Card className="mt-3" style={{ borderRadius: 0 }}>
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
