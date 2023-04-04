import React, { useContext } from "react";
import { Alert } from "react-bootstrap";
import { UserContext } from "../context/UserContext";

const Error = () => {
  const { error } = useContext(UserContext);

  return (
    <Alert key="danger" variant="danger">
      {error.message}
    </Alert>
  );
};

export default Error;
