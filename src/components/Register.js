import React from "react";
import { useState, useContext } from "react";
import { Form, Button, Card } from "react-bootstrap";

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

    // register
    register({ firstName, lastName, username, email, password });
    console.log("register");
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
      {error !== null && <Error error={error} />}
      <Card>
        <Card.Body>
          <Card.Title className="text-center">Finanzas</Card.Title>
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                password={firstName}
                value={firstName}
                onChange={onChangeFirstName}
                type="text"
                placeholder="Ej: Lionel"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                password={lastName}
                value={lastName}
                onChange={onChangeLastName}
                type="text"
                placeholder="Ej: Messi"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                password={username}
                value={username}
                onChange={onChangeUsername}
                type="text"
                placeholder="Ej: lionelmessi"
                required
              />
            </Form.Group>
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
                Inscribir
              </Button>
              <Button variant="secondary" onClick={() => handleCancel()}>
                Cancelar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default Register;
