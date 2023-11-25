import { Container, Nav, Card, Button } from "react-bootstrap";
import Header from "../components/Header";
import pro from "../assets/pic.svg";
import { LinkContainer } from "react-router-bootstrap";

const Landingpage = () => {
  return (
    <>
      <Header />
      <div className=" py-3">
        <Container className="container-box">
          <div className="p-5 d-flex flex-column align-items-center hero-div">
            <h1 className="text-center mb-4 text-bold">MERN PROJEC</h1>
            <p className="text-center mb-4">
              This is a boilerplate for MERN authentication that stores a JWT in
              an HTTP-Only cookie. It also uses react Context the React
              Bootstrap library
            </p>
            <LinkContainer to="/register" className="start">
              <Nav.Link>Get Start</Nav.Link>
            </LinkContainer>
          </div>

          <div className="d-flex image-H">
            <img src={pro} loading="lazy" />
          </div>
        </Container>
      </div>
    </>
  );
};

export default Landingpage;
