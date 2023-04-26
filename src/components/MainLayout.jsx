import { useContext } from "react";

import { Container, Row, Col } from "react-bootstrap";

import BudgetList from "./BudgetList";
import Dashboard from "./Dashboard";
import Message from "./Message";
import Header from "./Header";

import { ExpenseContextProvider } from "../context/ExpenseContext";
import { MessageContext } from "../context/MessageContext";
import { useAuthContext } from "../hooks/useAuthContext";

const MainLayout = () => {
  const { message } = useContext(MessageContext);

  const { user } = useAuthContext();

  return (
    <>
      {user !== null && <Header />}
      <div>{message && <Message />}</div>
      <Container>
        <Row className="mt-4">
          <Col>
            <ExpenseContextProvider>
              <Dashboard />
              <BudgetList />
            </ExpenseContextProvider>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MainLayout;
