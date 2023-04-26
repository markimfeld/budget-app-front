import { useState, useContext } from "react";
import {
  Form,
  Button,
  Card,
  Row,
  Col,
  FloatingLabel,
  Container,
} from "react-bootstrap";

import Message from "./Message";

import { useAuthContext } from "../hooks/useAuthContext";
import { MessageContext } from "../context/MessageContext";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginEnabledBtn, setLoginEnabledBtn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    message,
    recordType,
    handleSetMessage,
    handleSetType,
    handleSetRecordType,
    clearMessages,
  } = useContext(MessageContext);

  const { login } = useAuthContext();

  const handleLogin = async (event) => {
    event.preventDefault();

    await login(email, password);

    clearMessages();
    navigate(from, { replace: true });
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    if (email && password) {
      setLoginEnabledBtn(true);
    }
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);

    if (email && password) {
      setLoginEnabledBtn(true);
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
                <Form onSubmit={handleLogin}>
                  <Row className="g-2 mb-2">
                    <Col md>
                      <FloatingLabel controlId="floatingEmail" label="Email">
                        <Form.Control
                          name="email"
                          value={email}
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
                          password={password}
                          value={password}
                          onChange={onChangePassword}
                          type="password"
                          placeholder="Ingresá tu contraseña"
                          required
                        />
                      </FloatingLabel>
                    </Col>
                  </Row>

                  <div className="d-grid gap-2">
                    {loginEnabledBtn && (
                      <Button variant="success" type="submit">
                        Iniciar sesión
                      </Button>
                    )}
                    {!loginEnabledBtn && (
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
    </>
  );
};

export default Login;
