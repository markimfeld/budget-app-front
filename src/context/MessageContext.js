import { createContext } from "react";
import { useState } from "react";

export const MessageContext = createContext();

export const MessageContextProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const [type, setType] = useState(null);
  const [recordType, setRecordType] = useState(null);

  const handleSetMessage = (message) => {
    setMessage(message);
  };

  const handleSetType = (type) => {
    setType(type);
  };

  const handleSetRecordType = (recordType) => {
    setRecordType(recordType);
  };

  const clearMessages = () => {
    setMessage(null);
    setType(null);
    setRecordType(null);
  };

  return (
    <MessageContext.Provider
      value={{
        message,
        handleSetMessage,
        type,
        handleSetType,
        recordType,
        handleSetRecordType,
        clearMessages,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};
