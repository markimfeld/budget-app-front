import React from "react";
import { Alert } from "react-bootstrap";

const Error = ({ error }) => {
  return (
    <Alert key="danger" variant="danger">
      {error.message}
    </Alert>
  );
};

export default Error;
