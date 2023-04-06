import React from "react";
import { useState, useContext } from "react";
import { Form, Button, Card, Row, Col, FloatingLabel } from "react-bootstrap";

import Error from "./Error";

import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, handleShowRegisterForm, handleShowLoginForm } =
    useContext(UserContext);

  const handleLogin = (event) => {
    event.preventDefault();

    login(email, password);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleShowRegister = () => {
    handleShowRegisterForm(true);
    handleShowLoginForm(false);
  };

  return (
    <>
      {error !== null && <Error />}
      <Card style={{ borderRadius: 0 }}>
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
                <FloatingLabel controlId="floatingPassword" label="Contraseña">
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
              <Button variant="primary" type="submit">
                Iniciar sesión
              </Button>
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
    </>
  );
};

export default Login;
