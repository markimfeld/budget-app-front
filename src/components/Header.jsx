import { useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";

import { useNavigate, Link } from "react-router-dom";

// custom hooks
import { useAuthContext } from "../hooks/useAuthContext";
import { useMessageContext } from "../hooks/useMessageContext";
import { useThemeContext } from "../hooks/useThemeContext";
import { useCurrencyContext } from "../hooks/useCurrencyContext";

const Header = () => {
  const { clearMessages } = useMessageContext();
  const { user, logout } = useAuthContext();
  const { theme, handleSetTheme } = useThemeContext();
  const { currencyType, handleSetCurrency } = useCurrencyContext();

  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleShowBudgetList = () => {
    clearMessages();
    navigate("/budgets");
  };

  const handleShowDebtList = () => {
    clearMessages();
    navigate("/debts");
  };

  const handleShowInvestmentList = () => {
    clearMessages();
    navigate("/investments");
  };

  const handleLogout = () => {
    logout();
  };

  const handleTheme = () => {
    if (theme === "light") {
      handleSetTheme("dark");
    } else {
      handleSetTheme("light");
    }
    handleClose();
  };

  const handleCurrency = () => {
    if (currencyType === "ARS") {
      handleSetCurrency("USD");
    } else {
      handleSetCurrency("ARS");
    }
    handleClose();
  };

  const handleSettings = () => {
    alert("Settings");
  };

  const handleProfile = () => {
    clearMessages();
    handleClose();
    navigate("/users/profile");
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Navbar
        key="md"
        expand="lg"
        className="bg-body-dark p-3"
        bg="dark"
        variant="dark"
      >
        <Container>
          <Navbar.Brand className="fs-4">
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              <i className="fa-solid fa-coins"></i> Finanzas claras
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-lg`}
            onClick={() => handleShow()}
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-="md"`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
            className="bg-body-dark"
            show={show}
            onHide={handleClose}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title
                id={`offcanvasNavbarLabel-expand-lg`}
                onClick={() => {
                  navigate("/");
                  handleClose();
                }}
              >
                <i className="fa-solid fa-coins"></i> Finanzas claras
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link
                  onClick={() => {
                    navigate("/incomes");
                    handleClose();
                  }}
                >
                  Ingresos
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigate("/");
                    handleClose();
                  }}
                >
                  Salidas
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    handleShowBudgetList();
                    handleClose();
                  }}
                >
                  Presupuestos
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    handleShowDebtList();
                    handleClose();
                  }}
                >
                  Deudas
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    handleShowInvestmentList();
                    handleClose();
                  }}
                >
                  Fondos
                </Nav.Link>
                <NavDropdown
                  title={`${user.firstName} ${user.lastName}`}
                  id={`offcanvasNavbarDropdown-expand-lg`}
                >
                  <NavDropdown.Item
                    onClick={() => handleSettings()}
                    className="text-wrap"
                  >
                    Iniciado como{" "}
                    <span style={{ fontWeight: "bold" }}>@{user.username}</span>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => handleProfile()}>
                    Tu perfil
                  </NavDropdown.Item>
                  {/* <NavDropdown.Item
                    onClick={() => {
                      navigate("/informes");
                      handleClose();
                    }}
                  >
                    Gráficos
                  </NavDropdown.Item> */}
                  <NavDropdown.Divider />
                  {/* <NavDropdown.Item onClick={() => handleTheme()}>
                    {theme === "dark" ? "Tema claro" : "Tema oscuro"}
                  </NavDropdown.Item> */}
                  <NavDropdown.Item onClick={() => handleCurrency()}>
                    {currencyType === "USD"
                      ? "Cambiar a pesos"
                      : "Cambiar a dólar"}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={() => handleLogout()}>
                    Cerrar sesión
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
