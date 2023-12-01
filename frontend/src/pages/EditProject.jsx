import styled from "styled-components";
import Edit from "../components/Layout/Edit";

const LogOutPage = () => {
  return (
    <Dashboard className="general">
      <Container className="container-g">
        <Edit />
      </Container>
    </Dashboard>
  );
};

export default LogOutPage;

const Dashboard = styled.div``;

const Container = styled.div``;
