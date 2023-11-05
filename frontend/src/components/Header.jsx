// import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { userAuth } from "../ultContext/AuthContext";

const Header = () => {
  const { user, handleLogout } = userAuth();
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to={user ? "/app" : "/"}>
            <Navbar.Brand>Projec</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {user ? (
                <LinkContainer
                  to="/"
                  onClick={async () => await handleLogout()}
                >
                  <Nav.Link>
                    <FaSignInAlt />
                    Log Out
                  </Nav.Link>
                </LinkContainer>
              ) : (
                <div>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
