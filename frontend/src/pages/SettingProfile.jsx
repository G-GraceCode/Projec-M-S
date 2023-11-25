import styled from "styled-components";
import Profile from "../components/Layout/Profile";

const SettingProfile = () => {
  return (
    <Dashboard className="">
      <Container>
        <Profile />
      </Container>
    </Dashboard>
  );
};

export default SettingProfile;

const Dashboard = styled.div`
  background-color: var(--color-bg-2);
  height: 100dvh;
  width: 100dvw;
  padding: var(--mb-1);
`;

const Container = styled.div`
  background-color: var(--color-bg);
  width: 100%;
  min-height: 100%;
  border-radius: var(--border-radius);
  padding: 1.2%;
  & .content {
    margin-left: 15%;
    position: relative;
    height: 100%;
    overflow-y: scroll;
  }
`;
