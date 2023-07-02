import { Container, Navbar, Nav, NavDropdown, Image } from "react-bootstrap";

import { useNavigate, Link } from "react-router-dom";

// custom hooks
import { useAuthContext } from "../hooks/useAuthContext";
import { useMessageContext } from "../hooks/useMessageContext";

const Header = () => {
  const { clearMessages } = useMessageContext();
  const { user, logout } = useAuthContext();

  const navigate = useNavigate();

  const handleShowBudgetFormOrList = (showForm) => {
    clearMessages();
    navigate("/budgets/add");
  };

  const handleShowBudgetList = () => {
    clearMessages();
    navigate("/budgets");
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
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            <i className="fa-solid fa-coins"></i> Finance Pro
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav role="menu">
            <NavDropdown
              title={<i className="fa-sharp fa-solid fa-plus"></i>}
              id="collasible-nav-dropdown"
              align={"end"}
            >
              <NavDropdown.Item onClick={() => navigate("/")}>
                Inicio
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleShowBudgetList()}>
                Presupuestos
              </NavDropdown.Item>
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
