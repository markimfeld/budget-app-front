import { useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";

import Login from "./components/Login";
import Register from "./components/Register";
import MainLayout from "./components/MainLayout";
import Header from "./components/Header";
import Message from "./components/Message";

import { UserContext } from "./context/UserContext";

import { ExpenseContextProvider } from "./context/ExpenseContext";
import { MessageContext } from "./context/MessageContext";

function App() {
  const {
    user,
    loadUserFromStorage,
    showRegisterForm,
    showLoginForm,
    isLoading,
  } = useContext(UserContext);

  const { message } = useContext(MessageContext);

  useEffect(() => {
    loadUserFromStorage();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {user !== null && <Header />}
      {user === null && showLoginForm && !isLoading && (
        <Container>
          <Row
            className="justify-content-md-center align-items-center"
            style={{ height: "97vh" }}
          >
            <Col md="6">
              <Login />
            </Col>
          </Row>
        </Container>
      )}

      {user === null && showRegisterForm && !isLoading && (
        <Container>
          <Row
            className="justify-content-md-center align-items-center"
            style={{ height: "97vh" }}
          >
            <Col md="6">
              <Register />
            </Col>
          </Row>
        </Container>
      )}

      {user !== null && !isLoading && (
        <Container>
          {message && <Message />}

          <Row className="mt-4">
            <Col>
              <ExpenseContextProvider>
                <MainLayout />
              </ExpenseContextProvider>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default App;
