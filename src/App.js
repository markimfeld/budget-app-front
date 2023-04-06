import { useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";

import Login from "./components/Login";
import Register from "./components/Register";
import MainLayout from "./components/MainLayout";
import Menu from "./components/Nav";

import { UserContext } from "./context/UserContext";

import { ExpenseContextProvider } from "./context/ExpenseContext";

function App() {
  const {
    user,
    loadUserFromStorage,
    showRegisterForm,
    showLoginForm,
    isLoading,
  } = useContext(UserContext);

  useEffect(() => {
    loadUserFromStorage();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {user !== null && <Menu />}
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

      {user !== null && (
        <Container>
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
