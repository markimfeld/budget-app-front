import { useEffect, useContext } from "react";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";

import Login from "./components/Login";
import Register from "./components/Register";
import MainLayout from "./components/MainLayout";

import { UserContext } from "./context/UserContext";
import { BudgetContext } from "./context/BudgetContext";

import { ExpenseContextProvider } from "./context/ExpenseContext";

function App() {
  const {
    user,
    loadUserFromStorage,
    logout,
    showRegisterForm,
    showLoginForm,
    isLoading,
  } = useContext(UserContext);

  const { handleShowBudgetForm, handleShowBudgetList } =
    useContext(BudgetContext);

  useEffect(() => {
    loadUserFromStorage();
    // eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    logout();
  };

  const handleShowBudgetFormOrList = (showForm) => {
    handleShowBudgetForm(showForm);
    handleShowBudgetList(!showForm);
  };

  return (
    <>
      {user !== null && (
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Finance Pro</Navbar.Brand>
            {user !== null && (
              <Nav className="justify-content-end">
                <Nav.Link onClick={() => handleShowBudgetFormOrList(true)}>
                  Crear presupuesto
                </Nav.Link>

                <Nav.Link>
                  {user.firstName} {user.lastName}
                </Nav.Link>
                <Nav.Link onClick={() => handleLogout()}>
                  Cerrar sesión
                </Nav.Link>
              </Nav>
            )}
          </Container>
        </Navbar>
      )}
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
