import React from "react";
import { Alert } from "react-bootstrap";

const Success = ({ message }) => {
  return (
    <Alert key="success" variant="success">
      {message}
    </Alert>
  );
};

export default Success;
