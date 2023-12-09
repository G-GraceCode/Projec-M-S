import styled from "styled-components";
import Setting from "../components/Layout/Setting";

const SettingProfile = () => {
  return (
    <Dashboard className="general">
      <Container className="container-g">
        <Setting />
      </Container>
    </Dashboard>
  );
};

export default SettingProfile;

const Dashboard = styled.div``;

const Container = styled.div``;
