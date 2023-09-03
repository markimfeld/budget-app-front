import { Alert, Container } from "react-bootstrap";

// custom hooks
import { useMessageContext } from "../hooks/useMessageContext";

const Message = () => {
  const {
    message,
    type,
    handleSetMessage,
    handleSetRecordType,
    handleSetType,
  } = useMessageContext();

  const handleClose = () => {
    handleSetMessage(null);
    handleSetRecordType(null);
    handleSetType(null);
  };

  return (
    <Alert
      style={{ borderRadius: 0 }}
      key={type}
      variant={type}
      onClose={handleClose}
      dismissible
    >
      <Container>
        <span className="ms-md-3">{message}</span>
      </Container>
    </Alert>
  );
};

export default Message;
