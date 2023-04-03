import React from "react";
import { useState, useContext } from "react";
import { Form, Button, Card } from "react-bootstrap";

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
      {error !== null && <Error error={error} />}
      <Card>
        <Card.Body>
          <Card.Title className="text-center">Finanzas</Card.Title>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                value={email}
                onChange={onChangeEmail}
                type="email"
                placeholder="lionelmessi@gmail.com"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                password={password}
                value={password}
                onChange={onChangePassword}
                type="password"
                placeholder="Ingresá tu contraseña"
                required
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Iniciar sesión
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <Card className="mt-3">
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
