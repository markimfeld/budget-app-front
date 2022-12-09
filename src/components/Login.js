import React from "react";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const Login = ({ onGetAccessToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getToken = async () => {
    const endpoint = "http://localhost:3001/api/v1/users/login";
    const credentials = {
      email,
      password,
    };

    const { data } = await axios.post(endpoint, credentials);

    if (data.user.accessToken !== null && data.user.accessToken !== undefined) {
      onGetAccessToken(data.user.accessToken);
    }
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitData = (e) => {
    e.preventDefault();
    getToken();
  };

  return (
    <Form onSubmit={onSubmitData}>
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
  );
};

export default Login;
