import React, { useContext } from "react";
import { Alert } from "react-bootstrap";

import { MessageContext } from "../context/MessageContext";

const Success = () => {
  const { message, handleSetMessage } = useContext(MessageContext);

  return (
    <>
      <Alert
        key="success"
        variant="success"
        onClose={() => handleSetMessage(null)}
        dismissible
      >
        {message}
      </Alert>
    </>
  );
};

export default Success;
