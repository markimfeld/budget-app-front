import { Container, Row, Col } from "react-bootstrap";

import { Routes, Route } from "react-router-dom";

// components
import Budgets from "./Budgets";
import Dashboard from "./Dashboard";
import Message from "./Message";
import Header from "./Header";
import BudgetForm from "./BudgetForm";
import ExpenseForm from "./ExpenseForm";
import Expenses from "./Expenses";
import Incomes from "./Incomes";
import Informes from "./Informes";
import IncomeForm from "./IncomeForm";

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
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Dashboard />{" "}
                    <Row>
                      <Col>
                        <Expenses />
                      </Col>
                    </Row>
                  </>
                }
              />
            </Routes>
            <Routes>
              <Route path="/expenses/add" element={<ExpenseForm />} />
              <Route path="/:expenseId/edit" element={<ExpenseForm />} />
              <Route path="/budgets" element={<Budgets />} />
              <Route path="/budgets/add" element={<BudgetForm />} />
              <Route path="/budgets/:budgetId/edit" element={<BudgetForm />} />
              <Route path="/informes" element={<Informes />} />
              <Route path="/incomes" element={<Incomes />} />
              <Route path="/incomes/add" element={<IncomeForm />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
