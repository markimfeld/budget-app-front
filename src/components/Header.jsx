import { Container, Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import { useContext } from "react";

import { BudgetContext } from "../context/BudgetContext";
import { MessageContext } from "../context/MessageContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Header = () => {
  const { clearMessages } = useContext(MessageContext);
  const { user, logout } = useAuthContext();

  const { handleShowBudgetForm, handleShowBudgetList, handleIsEditing } =
    useContext(BudgetContext);

  const handleShowBudgetFormOrList = (showForm) => {
    handleShowBudgetForm(showForm);
    handleShowBudgetList(!showForm);
    clearMessages();
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
          <Nav role="menu">
            <NavDropdown
              title={<i className="fa-sharp fa-solid fa-plus"></i>}
              id="collasible-nav-dropdown"
              align={"end"}
            >
              <NavDropdown.Item
                onClick={() => handleShowBudgetFormOrList(true)}
              >
                Nuevo presupuesto
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={
                <Image
                  src="../avatar.jpeg"
                  roundedCircle
                  style={{ width: "20px", height: "20px" }}
                />
              }
              id="collasible-nav-dropdown"
              align={"end"}
            >
              <NavDropdown.Item
                onClick={() => handleSettings()}
                className="text-wrap"
              >
                Iniciado como{" "}
                <span style={{ fontWeight: "bold", color: "#606060" }}>
                  {user.username}
                </span>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => handleSettings()}>
                Tu perfil
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => handleTheme()}>
                Configuración
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleTheme()}>
                Tema
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

export default Header;
