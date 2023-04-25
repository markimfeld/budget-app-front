import { useState, useContext } from "react";
import {
  Form,
  Button,
  Card,
  Col,
  Row,
  FloatingLabel,
  Container,
} from "react-bootstrap";

import Message from "./Message";

import { useAuthContext } from "../context/UserContext";
import { MessageContext } from "../context/MessageContext";
import { useNavigate, Navigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [registerEnabledBtn, setRegisterEnabledBtn] = useState(false);

  const navigate = useNavigate();

  const {
    message,
    handleSetMessage,
    handleSetType,
    handleSetRecordType,
    clearMessages,
  } = useContext(MessageContext);

  const { user, register, isLoading } = useAuthContext();

  const handleRegister = (event) => {
    event.preventDefault();

    register({ firstName, lastName, username, email, password });
    clearMessages();

    navigate("/");
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    if (email && password && firstName && lastName && username) {
      setRegisterEnabledBtn(true);
    }
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    if (email && password && firstName && lastName && username) {
      setRegisterEnabledBtn(true);
    }
  };

  const onChangeFirstName = (e) => {
    setFirstName(e.target.value);
    if (email && password && firstName && lastName && username) {
      setRegisterEnabledBtn(true);
    }
  };

  const onChangeLastName = (e) => {
    setLastName(e.target.value);
    if (email && password && firstName && lastName && username) {
      setRegisterEnabledBtn(true);
    }
  };

  const onChangeUsername = (e) => {
    setUserName(e.target.value);
    if (email && password && firstName && lastName && username) {
      setRegisterEnabledBtn(true);
    }
  };

  const handleLogin = () => {
    handleSetMessage(null);
    handleSetType(null);
    handleSetRecordType(null);
    navigate("/login");
  };

  return (
    <>
      {user && !isLoading && <Navigate to="/" />}
      {!user && (
        <Container>
          <Row
            className="justify-content-md-center align-items-center"
            style={{ height: "97vh" }}
          >
            <Col md="6">
              {message !== null && <Message />}
              <Card
                style={{ borderRadius: 0, backgroundColor: "hsl(0, 0%, 97%)" }}
              >
                <Card.Body>
                  <Card.Title className="text-center fs-1 mb-4">
                    <i className="fa-solid fa-coins"></i> Finance Pro
                  </Card.Title>
                  <Form onSubmit={handleRegister}>
                    <Row className="g-2 mb-2">
                      <Col md>
                        <FloatingLabel
                          controlId="floatingFirstname"
                          label="Nombre"
                        >
                          <Form.Control
                            name={firstName}
                            value={firstName}
                            onChange={onChangeFirstName}
                            type="text"
                            placeholder="Ej: Lionel"
                            // required
                          />
                        </FloatingLabel>
                      </Col>
                      <Col md>
                        <FloatingLabel
                          controlId="floatingLastname"
                          label="Apellido"
                        >
                          <Form.Control
                            name={lastName}
                            value={lastName}
                            onChange={onChangeLastName}
                            type="text"
                            placeholder="Ej: Messi"
                            // required
                          />
                        </FloatingLabel>
                      </Col>
                    </Row>

                    <Row className="g-2 mb-2">
                      <Col>
                        <FloatingLabel
                          controlId="floatingUsername"
                          label="Usuario"
                        >
                          <Form.Control
                            name={username}
                            value={username}
                            onChange={onChangeUsername}
                            type="text"
                            placeholder="Ej: lionelmessi"
                            // required
                          />
                        </FloatingLabel>
                      </Col>
                    </Row>
                    <Row className="g-2 mb-3">
                      <Col md>
                        <FloatingLabel controlId="floatingEmail" label="Email">
                          <Form.Control
                            name="email"
                            value={email}
                            onChange={onChangeEmail}
                            type="email"
                            placeholder="lionelmessi@gmail.com"
                            // required
                          />
                        </FloatingLabel>
                      </Col>
                      <Col md>
                        <FloatingLabel
                          controlId="floatingPassword"
                          label="Contraseña"
                        >
                          <Form.Control
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            type="password"
                            placeholder="password"
                            // required
                          />
                        </FloatingLabel>
                      </Col>
                    </Row>

                    <div className="d-grid gap-2">
                      {registerEnabledBtn && (
                        <Button variant="success" type="submit">
                          Inscribir
                        </Button>
                      )}
                      {!registerEnabledBtn && (
                        <Button variant="success" type="submit" disabled>
                          Inscribir
                        </Button>
                      )}
                    </div>
                  </Form>
                </Card.Body>
              </Card>
              <Card className="mt-3" style={{ borderRadius: 0 }}>
                <Card.Body>
                  <Card.Text className="text-center">
                    ¿Ya tenes cuenta?{" "}
                    <Button
                      variant="link"
                      className="m-0 p-0"
                      onClick={() => handleLogin()}
                    >
                      Iniciar sesión
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

export default Register;
