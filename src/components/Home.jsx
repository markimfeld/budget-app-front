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
import BudgetDetails from "./BudgetDetails";
import ExpenseDetails from "./ExpenseDetails";
import ProfileDetails from "./ProfileDetails";
import DebtDetails from "./DebtDetails";
import Debts from "./Debts";
import DebtForm from "./DebtForm";
import Investments from "./Investments";
import InvestmentForm from "./InvestmentForm";

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
              <Route path="/:expenseId/details" element={<ExpenseDetails />} />
              <Route path="/budgets" element={<Budgets />} />
              <Route path="/budgets/add" element={<BudgetForm />} />
              <Route path="/budgets/:budgetId/edit" element={<BudgetForm />} />
              <Route
                path="/budgets/:budgetId/details"
                element={<BudgetDetails />}
              />
              <Route path="/informes" element={<Informes />} />
              <Route path="/incomes" element={<Incomes />} />
              <Route path="/incomes/add" element={<IncomeForm />} />
              <Route path="/incomes/:incomeId/edit" element={<IncomeForm />} />
              <Route path="/debts" element={<Debts />} />
              <Route path="/debts/:debtId/details" element={<DebtDetails />} />
              <Route path="/debts/add" element={<DebtForm />} />
              <Route path="/debts/:debtId/edit" element={<DebtForm />} />

              <Route path="/investments" element={<Investments />} />
              <Route path="/investments/add" element={<InvestmentForm />} />

              <Route path="/users/profile" element={<ProfileDetails />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
