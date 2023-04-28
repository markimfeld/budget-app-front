import { useContext } from "react";

import { MessageContext } from "../context/MessageContext";

export function useMessageContext() {
  return useContext(MessageContext);
}
