import React, { useContext } from "react";
import { Alert } from "react-bootstrap";

import { MessageContext } from "../context/MessageContext";

const Message = () => {
  const {
    message,
    type,
    handleSetMessage,
    handleSetRecordType,
    handleSetType,
  } = useContext(MessageContext);

  const handleClose = () => {
    handleSetMessage(null);
    handleSetRecordType(null);
    handleSetType(null);
  };

  return (
    <>
      <Alert key="success" variant={type} onClose={handleClose} dismissible>
        {message}
      </Alert>
    </>
  );
};

export default Message;
