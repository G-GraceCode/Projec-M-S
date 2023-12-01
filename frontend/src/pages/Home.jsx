// import react from "react";
import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import Dashboard from "../components/Layout/Dashboard";

const Home = () => {
  return (
    <HomeDash className="general">
      <Container className="container-g">
        <Dashboard />
      </Container>
    </HomeDash>
  );
};

export default Home;

const HomeDash = styled.div``;

const Container = styled.div``;
