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
import { useState } from "react";

const Header = () => {
  const { clearMessages } = useMessageContext();
  const { user, logout } = useAuthContext();

  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const handleShowBudgetFormOrList = () => {
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

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Navbar
        key="md"
        expand="lg"
        className="bg-body-dark"
        bg="dark"
        variant="dark"
      >
        <Container>
          <Navbar.Brand className="fs-4">
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              <i className="fa-solid fa-coins"></i> Finance Pro
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
                <i className="fa-solid fa-coins"></i> Finance Pro
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link
                  onClick={() => {
                    navigate("/");
                    handleClose();
                  }}
                >
                  Gastos
                </Nav.Link>
                {/* <Nav.Link
                  onClick={() => {
                    navigate("/informes");
                    handleClose();
                  }}
                >
                  Informes
                </Nav.Link> */}
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
                    handleShowBudgetList();
                    handleClose();
                  }}
                >
                  Presupuestos
                </Nav.Link>
                {/* <Nav.Link
                  onClick={() => {
                    handleShowBudgetFormOrList();
                    handleClose();
                  }}
                >
                  Nuevo presupuesto
                </Nav.Link> */}
                <NavDropdown
                  title={`${user.firstName} ${user.lastName}`}
                  id={`offcanvasNavbarDropdown-expand-lg`}
                >
                  <NavDropdown.Item
                    onClick={() => handleSettings()}
                    className="text-wrap"
                  >
                    Iniciado como{" "}
                    <span style={{ fontWeight: "bold", color: "black" }}>
                      @{user.username}
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
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
  // return (
  //   <Navbar bg="dark" variant="dark" expand="lg">
  //     <Container className="py-1">
  //       <Navbar.Brand className="fs-4">
  //         <Link to="/" style={{ color: "white", textDecoration: "none" }}>
  //           <i className="fa-solid fa-coins"></i> Finance Pro
  //         </Link>
  //       </Navbar.Brand>
  //       <Navbar.Toggle aria-controls="basic-navbar-nav" />
  //       <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
  //         <Nav role="menu">
  //           <NavDropdown
  //             title={<i className="fa-sharp fa-solid fa-plus"></i>}
  //             id="collasible-nav-dropdown"
  //             align={"end"}
  //             menuVariant="dark"
  //           >
  //             <NavDropdown.Item onClick={() => navigate("/")}>
  //               Inicio
  //             </NavDropdown.Item>
  //             <NavDropdown.Item onClick={() => handleShowBudgetList()}>
  //               Presupuestos
  //             </NavDropdown.Item>
  //             <NavDropdown.Item
  //               onClick={() => handleShowBudgetFormOrList(true)}
  //             >
  //               Nuevo presupuesto
  //             </NavDropdown.Item>
  //           </NavDropdown>
  //           <NavDropdown
  //             title={
  //               <Image
  //                 src="../avatar.jpeg"
  //                 roundedCircle
  //                 style={{ width: "20px", height: "20px" }}
  //               />
  //             }
  //             id="collasible-nav-dropdown"
  //             align={"end"}
  //             menuVariant="dark"
  //           >
  //             <NavDropdown.Item
  //               onClick={() => handleSettings()}
  //               className="text-wrap"
  //             >
  //               Iniciado como{" "}
  //               <span style={{ fontWeight: "bold", color: "white" }}>
  //                 {user.username}
  //               </span>
  //             </NavDropdown.Item>
  //             <NavDropdown.Divider />
  //             <NavDropdown.Item onClick={() => handleSettings()}>
  //               Tu perfil
  //             </NavDropdown.Item>
  //             <NavDropdown.Divider />
  //             <NavDropdown.Item onClick={() => handleTheme()}>
  //               Configuración
  //             </NavDropdown.Item>
  //             <NavDropdown.Item onClick={() => handleTheme()}>
  //               Tema
  //             </NavDropdown.Item>
  //             <NavDropdown.Divider />
  //             <NavDropdown.Item onClick={() => handleLogout()}>
  //               Cerrar sesión
  //             </NavDropdown.Item>
  //           </NavDropdown>
  //         </Nav>
  //       </Navbar.Collapse>
  //     </Container>
  //   </Navbar>
  // );
};

export default Header;
