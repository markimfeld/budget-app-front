import { createContext } from "react";
import { useState } from "react";

export const MessageContext = createContext();

export const MessageContextProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const [type, setType] = useState(null);

  const handleSetMessage = (message) => {
    setMessage(message);
  };

  const handleSetType = (type) => {
    setType(type);
  };

  return (
    <MessageContext.Provider
      value={{ message, handleSetMessage, type, handleSetType }}
    >
      {children}
    </MessageContext.Provider>
  );
};
