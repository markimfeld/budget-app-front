import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { QueryClientProvider, QueryClient } from "react-query";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { UserContextProvider } from "./context/UserContext";
import { BudgetContextProvider } from "./context/BudgetContext";
import { IncomeContextProvider } from "./context/IncomeContext";
import { MessageContextProvider } from "./context/MessageContext";
import { ExpenseContextProvider } from "./context/ExpenseContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import { DebtContextProvider } from "./context/DebtContext";
import { InvestmentContextProvider } from "./context/InvestmentContext";
import { CurrencyContextProvider } from "./context/CurrencyContext";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <ThemeContextProvider>
      <MessageContextProvider>
        <UserContextProvider>
          <CurrencyContextProvider>
            <InvestmentContextProvider>
              <DebtContextProvider>
                <IncomeContextProvider>
                  <BudgetContextProvider>
                    <ExpenseContextProvider>
                      <BrowserRouter>
                        <Routes>
                          <Route path="/*" element={<App />} />
                        </Routes>
                      </BrowserRouter>
                    </ExpenseContextProvider>
                  </BudgetContextProvider>
                </IncomeContextProvider>
              </DebtContextProvider>
            </InvestmentContextProvider>
          </CurrencyContextProvider>
        </UserContextProvider>
      </MessageContextProvider>
    </ThemeContextProvider>
  </QueryClientProvider>
  // </React.StrictMode>
);
