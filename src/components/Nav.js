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
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand className="fs-4">
          <i className="fa-solid fa-coins"></i> Finance Pro
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link onClick={() => handleShowBudgetFormOrList(true)}>
              Nuevo presupuesto
            </Nav.Link>
            <NavDropdown title={user.firstName} id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Preferencias
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => handleLogout()}>
                Cerrar sesión
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
