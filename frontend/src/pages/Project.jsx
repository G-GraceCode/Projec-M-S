import styled from "styled-components";
import Projects from "../components/Layout/Projects";

const Project = () => {
  return (
    <Dashboard className="">
      <Container>
        <Projects />
      </Container>
    </Dashboard>
  );
};

export default Project;

const Dashboard = styled.div`
  background-color: var(--color-bg-2);
  height: 100dvh;
  width: 100dvw;
  padding: var(--mb-1);
`;

const Container = styled.div`
  background-color: var(--color-bg);
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius);
  padding: 2%;
  .content {
    margin-left: 15%;
    position: relative;
    min-height: 100%;
  }
`;
