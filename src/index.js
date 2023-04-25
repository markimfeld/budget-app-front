import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { UserContextProvider } from "./context/UserContext";
import { BudgetContextProvider } from "./context/BudgetContext";
import { MessageContextProvider } from "./context/MessageContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <MessageContextProvider>
    <UserContextProvider>
      <BudgetContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </BudgetContextProvider>
    </UserContextProvider>
  </MessageContextProvider>
  // </React.StrictMode>
);
