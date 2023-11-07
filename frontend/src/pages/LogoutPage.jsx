import styled from "styled-components";
import Logout from "../components/Layout/Logout";

const LoginPage = () => {
  return (
    <Dashboard className="">
      <Container>
        <Logout />
      </Container>
    </Dashboard>
  );
};

export default LoginPage;

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
  opacity: 0.7;
  padding: 2%;
  & .Homecontent {
    margin-left: 15%;
    background-color: white;
  }
`;
