// import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { Navbar, Nav, Container, NavDropdown, Row } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  return (
    <header>
      <Navbar
        style={{ backgroundColor: "var(--color-bg-2)" }}
        variant="dark"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to={"/"} className="H-logo">
            <Navbar.Brand>Projec</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <div className="navLink">
                <LinkContainer to="/login" className="butn">
                  <Nav.Link>
                    <FaSignInAlt /> Sign In
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register" className="butn">
                  <Nav.Link>
                    <FaSignOutAlt /> Sign Up
                  </Nav.Link>
                </LinkContainer>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
