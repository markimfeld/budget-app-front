import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useContext } from "react";

import { UserContext } from "../context/UserContext";
import { BudgetContext } from "../context/BudgetContext";

const Menu = () => {
  const { user, logout } = useContext(UserContext);

  const { handleShowBudgetForm, handleShowBudgetList } =
    useContext(BudgetContext);

  const handleShowBudgetFormOrList = (showForm) => {
    handleShowBudgetForm(showForm);
    handleShowBudgetList(!showForm);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Finance Pro</Navbar.Brand>
        <Nav className="justify-content-end">
          <Nav.Link onClick={() => handleShowBudgetFormOrList(true)}>
            Nuevo presupuesto
          </Nav.Link>

          {/* <Nav.Link onClick={() => handleLogout()}>
            <i className="fa-solid fa-right-from-bracket"></i>
          </Nav.Link> */}
          <NavDropdown title={user.firstName} id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Preferencias</NavDropdown.Item>
            {/* <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item> */}
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4" onClick={() => handleLogout()}>
              Cerrar sesión
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Menu;
