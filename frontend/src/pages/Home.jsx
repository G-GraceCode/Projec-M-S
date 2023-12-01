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

const HomeDash = styled.div`
  background-color: var(--color-bg-2);
  height: 100dvh;
  width: 100dvw;
`;

const Container = styled.div`
  background-color: var(--color-bg);
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  // padding: 1.2%;
  & .content {
    margin-left: 15%;
    z-index: 1;
  }
`;
