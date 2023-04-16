import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useContext } from "react";

import { UserContext } from "../context/UserContext";
import { BudgetContext } from "../context/BudgetContext";
import { MessageContext } from "../context/MessageContext";

const Header = () => {
  const { handleSetMessage } = useContext(MessageContext);
  const { user, logout } = useContext(UserContext);

  const { handleShowBudgetForm, handleShowBudgetList, handleIsEditing } =
    useContext(BudgetContext);

  const handleShowBudgetFormOrList = (showForm) => {
    handleShowBudgetForm(showForm);
    handleShowBudgetList(!showForm);
    handleSetMessage(null);
    handleIsEditing(false);
  };

  const handleLogout = () => {
    logout();
  };

  const handleTheme = () => {
    alert("Cambiando tema");
  };

  const handleSettings = () => {
    alert("Settings");
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
            <NavDropdown
              title={<i className="fa-solid fa-circle-user fa-xl"></i>}
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item onClick={() => handleSettings()}>
                <i className="fa-solid fa-circle-user fa-xl"></i>{" "}
                {user.firstName}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => handleSettings()}>
                <i className="fa-solid fa-gear"></i> Preferencias
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleTheme()}>
                <i className="fa-solid fa-moon"></i> Tema
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => handleLogout()}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i> Cerrar
                sesión
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
