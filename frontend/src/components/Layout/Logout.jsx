import styled from "styled-components";
import { Container, Card, Button } from "react-bootstrap";

const Logout = () => {
  return (
    <Signout>
      <div>
        <h3> Sign Out </h3>
        <p> user logout by clicking the link below </p>
        <div>
          <Button variant="primary" href="/" className="me-3">
            Sign In
          </Button>
          <Button variant="secondary" href="/register">
            Register
          </Button>
        </div>
      </div>
    </Signout>
  );
};

export default Logout;

const Signout = styled.div`
  margin-left: 15%;
  background-color: white;
`;
