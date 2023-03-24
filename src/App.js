import { useEffect, useContext } from "react";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";

import Login from "./components/Login";
import MainLayout from "./components/MainLayout";

import { UserContext } from "./context/UserContext";
import { BudgetContext } from "./context/BudgetContext";

import { ExpenseContextProvider } from "./context/ExpenseContext";

function App() {
  const { user, loadUserFromStorage, logout } = useContext(UserContext);

  const { handleShowBudgetForm } = useContext(BudgetContext);

  useEffect(() => {
    loadUserFromStorage();
    // eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {user !== null && (
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Finanzas App</Navbar.Brand>
            {user !== null && (
              <Nav className="justify-content-end">
                <Nav.Link onClick={() => handleShowBudgetForm(true)}>
                  Crear presupuesto
                </Nav.Link>
                <Nav.Link onClick={() => handleLogout()}>
                  Cerrar sesión
                </Nav.Link>
              </Nav>
            )}
          </Container>
        </Navbar>
      )}
      {user === null && (
        <Container>
          <Row
            className="m-auto align-items-center"
            style={{ height: "97vh", width: "50vw" }}
          >
            <Col>
              <Login />
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
