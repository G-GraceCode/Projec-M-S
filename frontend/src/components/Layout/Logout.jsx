import styled from "styled-components";
import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import Navbar from "../Navbar";

const Logout = () => {
  return (
    <div className="content">
      <Navbar />

      <Signout>
        <div className="logoutContent">
          <h3> Sign Out </h3>
          <p> user logout by clicking the link below </p>
          <div className="btn-logout">
            <Button variant="primary" href="/" className="me-3">
              Cancle
            </Button>
            <Button variant="danger" href="/register">
              Logout
            </Button>
          </div>
        </div>
      </Signout>
    </div>
  );
};

export default Logout;

const Signout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--natural-white);
  text-align: center;
  background-color: var(--color-bg-2);
  padding: 0rem 1rem;

  border-radius: var(--border-radius);
  & > .logoutContent {
    padding: 1.5rem;
    background-color: var(--color-bg-2);
    letter-spacing: 1.4px;

    h3 {
      text-transform: uppercase;
      font-size: 25px;
      margin-bottom: 1rem;
    }
    p {
      margin-bottom: 1rem;
    }
  }
`;
