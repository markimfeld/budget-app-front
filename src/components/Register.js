import React from "react";
import { useState, useContext } from "react";
import { Form, Button, Card, Col, Row, FloatingLabel } from "react-bootstrap";

import Error from "./Error";

import { UserContext } from "../context/UserContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");

  const { error, register, handleShowLoginForm, handleShowRegisterForm } =
    useContext(UserContext);

  const handleRegister = (event) => {
    event.preventDefault();

    register({ firstName, lastName, username, email, password });
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const onChangeUsername = (e) => {
    setUserName(e.target.value);
  };

  const handleCancel = () => {
    handleShowRegisterForm(false);
    handleShowLoginForm(true);
  };

  return (
    <>
      {error !== null && <Error />}
      <Card style={{ borderRadius: 0 }}>
        <Card.Body>
          <Card.Title className="text-center fs-1 mb-4">
            <i className="fa-solid fa-coins"></i> Finance Pro
          </Card.Title>
          <Form onSubmit={handleRegister}>
            <Row className="g-2 mb-2">
              <Col md>
                <FloatingLabel controlId="floatingFirstname" label="Nombre">
                  <Form.Control
                    name={firstName}
                    value={firstName}
                    onChange={onChangeFirstName}
                    type="text"
                    placeholder="Ej: Lionel"
                    required
                  />
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel controlId="floatingLastname" label="Apellido">
                  <Form.Control
                    name={lastName}
                    value={lastName}
                    onChange={onChangeLastName}
                    type="text"
                    placeholder="Ej: Messi"
                    required
                  />
                </FloatingLabel>
              </Col>
            </Row>

            <Row className="g-2 mb-2">
              <Col>
                <FloatingLabel controlId="floatingUsername" label="Usuario">
                  <Form.Control
                    name={username}
                    value={username}
                    onChange={onChangeUsername}
                    type="text"
                    placeholder="Ej: lionelmessi"
                    required
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
                    required
                  />
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel controlId="floatingPassword" label="Contraseña">
                  <Form.Control
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    type="password"
                    placeholder="password"
                    required
                  />
                </FloatingLabel>
              </Col>
            </Row>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Inscribir
              </Button>
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
              onClick={() => handleCancel()}
            >
              Iniciar sesión
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Register;
