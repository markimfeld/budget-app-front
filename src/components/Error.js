import React, { useContext } from "react";
import { Alert } from "react-bootstrap";
import { MessageContext } from "../context/MessageContext";

const Error = () => {
  const { message, handleSetMessage } = useContext(MessageContext);
  return (
    <Alert
      key="danger"
      variant="danger"
      onClose={() => handleSetMessage(null)}
      dismissible
    >
      {message}
    </Alert>
  );
};

export default Error;
