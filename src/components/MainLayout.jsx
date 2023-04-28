import { Container, Row, Col } from "react-bootstrap";

// components
import BudgetList from "./BudgetList";
import Dashboard from "./Dashboard";
import Message from "./Message";
import Header from "./Header";

// custom hooks
import { useAuthContext } from "../hooks/useAuthContext";
import { useMessageContext } from "../hooks/useMessageContext";

const MainLayout = () => {
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
            <BudgetList />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MainLayout;
