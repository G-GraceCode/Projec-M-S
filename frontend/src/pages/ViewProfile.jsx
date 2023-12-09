import styled from "styled-components";
import Profile from "../components/Layout/Profile";

const ViewProfile = () => {
  return (
    <Dashboard className="general">
      <Container className="container-g">
        <Profile />
      </Container>
    </Dashboard>
  );
};

export default ViewProfile;

const Dashboard = styled.div``;

const Container = styled.div``;
