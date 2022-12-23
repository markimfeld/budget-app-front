import { useState, useEffect } from "react";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";

import Login from "./components/Login";
import BudgetList from "./components/BudgetList";

import budgetService from "./services/budget";

function App() {
  const [user, setUser] = useState(null);
  const [budgets, setBudgets] = useState([]);
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [showBudgetList, setShowBudgetList] = useState(true);

  const getBudgets = async () => {
    if (user !== null) {
      const config = {
        headers: {
          Authorization: `${user.accessToken}`,
        },
      };

      try {
        const data = await budgetService.getAll(config);

        setBudgets(data.data);
      } catch (err) {
        if (err.response.data.status === 400) {
          window.localStorage.clear();
          window.location.reload();
        }
      }
    }
  };

  useEffect(() => {
    getBudgets();
  }, [user]);

  useEffect(() => {
    const userLogged = window.localStorage.getItem("user");
    if (userLogged) {
      const user = JSON.parse(userLogged);
      setUser(user);
    }
  }, []);

  const handleChangeUser = (newUser) => {
    if (newUser !== null) {
      setUser(newUser);
      window.localStorage.setItem("user", JSON.stringify(newUser));
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.clear();
  };

  const handleRenderNewBudgetForm = (showForm) => {
    if (showForm) {
      setShowBudgetForm(true);
      setShowBudgetList(false);
    } else {
      setShowBudgetForm(false);
      setShowBudgetList(true);
    }
  };

  const handleUpdateBudgets = (newBudget) => {
    setBudgets([...budgets, newBudget]);
  };

  return (
    <>
      {user !== null && (
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Finanzas App</Navbar.Brand>
            {user !== null && (
              <Nav className="justify-content-end">
                <Nav.Link onClick={() => handleRenderNewBudgetForm(true)}>
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
              <Login onChangeUser={handleChangeUser} />
            </Col>
          </Row>
        </Container>
      )}

      {user !== null && (
        <Container>
          <Row className="mt-4">
            <Col>
              <BudgetList
                budgets={budgets}
                showBudgetForm={showBudgetForm}
                showBudgetList={showBudgetList}
                onHandleRenderBudgetForm={handleRenderNewBudgetForm}
                user={user}
                handleUpdateBudgets={handleUpdateBudgets}
              />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default App;
