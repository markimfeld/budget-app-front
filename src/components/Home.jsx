import { Container, Row, Col } from "react-bootstrap";

import { Routes, Route } from "react-router-dom";

// components
import Budgets from "./Budgets";
import Dashboard from "./Dashboard";
import Message from "./Message";
import Header from "./Header";
import BudgetForm from "./BudgetForm";
import ExpenseList from "./ExpensesList";
import ExpenseForm from "./ExpenseForm";

// custom hooks
import { useAuthContext } from "../hooks/useAuthContext";
import { useMessageContext } from "../hooks/useMessageContext";

const Home = () => {
  const { message } = useMessageContext();

  const { user } = useAuthContext();

  return (
    <>
      {user !== null && <Header />}
      <div>{message && <Message />}</div>
      <Container>
        <Row className="mt-4">
          <Col>
            <Dashboard />
            <Routes>
              <Route path="/budgets" element={<Budgets />} />
              <Route path="/budgets/add" element={<BudgetForm />} />
              <Route path="/budgets/:budgetId/edit" element={<BudgetForm />} />
              <Route
                path="/budgets/:budgetId/expenses"
                element={<ExpenseList />}
              />
              <Route
                path="/budgets/:budgetId/expenses/add"
                element={<ExpenseForm />}
              />
              <Route
                path="/budgets/:budgetId/expenses/:expenseId/edit"
                element={<ExpenseForm />}
              />
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
