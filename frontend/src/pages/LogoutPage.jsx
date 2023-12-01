import styled from "styled-components";
import Logout from "../components/Layout/Logout";

const LogOutPage = () => {
  return (
    <Dashboard className="general">
      <Container className="container-g ">
        <Logout />
      </Container>
    </Dashboard>
  );
};

export default LogOutPage;

const Dashboard = styled.div``;

const Container = styled.div``;
