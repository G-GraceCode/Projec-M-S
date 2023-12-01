import { useState } from "react";
import styled from "styled-components";
import Projects from "../components/Layout/Projects";
import CreateProject from "./CreateProject";

const Project = () => {
  const [active, setActive] = useState("");

  return (
    <Dashboard className="general">
      <Container className="container-g">
        <Projects present={() => setActive("active")} />
      </Container>
      {active && <CreateProject close={() => setActive("")} />}
    </Dashboard>
  );
};

export default Project;

const Dashboard = styled.div``;

const Container = styled.div``;
