import { useState } from "react";
import styled from "styled-components";
import Projects from "../components/Layout/Projects";
import CreateProject from "./CreateProject";

const Project = () => {
  const [active, setActive] = useState('');

  return (
    <Dashboard className="">
      <Container>
        <Projects present = {() => setActive('active')} />
      </Container>
      {active && <CreateProject close={() => setActive('')} />}
    </Dashboard>
  );
};

export default Project;

const Dashboard = styled.div`
  background-color: var(--color-bg-2);
  height: 100dvh;
  width: 100dvw;
  padding: var(--mb-1);
  position: relative;
`;

const Container = styled.div`
  background-color: var(--color-bg);
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius);
  padding: 1.2%;
  overflow-y: hidden;
  .content {
    margin-left: 15%;
    position: relative;
    height: 100%;
  }
`;
