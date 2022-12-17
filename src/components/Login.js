import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

import Error from "./Error";

import loginService from "../services/login";

const Login = ({ onChangeUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const data = await loginService.login({ email, password });

      if (data.user !== null && data.user !== undefined) {
        onChangeUser(data.user);
      }
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      {error !== null && <Error error={error} />}
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            value={email}
            onChange={onChangeEmail}
            type="email"
            placeholder="lionelmessi@gmail.com"
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
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="primary" type="submit">
            Iniciar sesión
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Login;
