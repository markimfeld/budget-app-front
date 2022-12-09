import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Navbar } from "react-bootstrap";

import Login from "./components/Login";
import BudgetList from "./components/BudgetList";

function App() {
  const [budgets, setBudgets] = useState([]);

  const [accessToken, setAccessToken] = useState(null);

  const getBudgets = async () => {
    if (window.localStorage.getItem("auth-token") !== null) {
      axios.defaults.headers.common["auth-token"] =
        window.localStorage.getItem("auth-token");
      const { data } = await axios.get("http://localhost:3001/api/v1/budgets");
      setBudgets(data.data);
      console.log(data);
    }
  };

  useEffect(() => {
    getBudgets();
  }, []);

  const getAccessToken = (token) => {
    if (token !== null) {
      setAccessToken(token);

      window.localStorage.setItem("auth-token", token);
      window.location.reload();
    }
  };

  const onLogout = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="#home">Mis Finanzas</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {window.localStorage.getItem("auth-token") !== null && (
                <a href="#logout" onClick={() => onLogout()}>
                  Cerrar sesión
                </a>
              )}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col>
            {window.localStorage.getItem("auth-token") === null && (
              <Login onGetAccessToken={getAccessToken} />
            )}
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            {window.localStorage.getItem("auth-token") !== null && (
              <BudgetList budgets={budgets} />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
