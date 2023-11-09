import Navbar from "../Navbar";
import styled from "styled-components";
import { BsPlusCircleFill } from "react-icons/bs";

const Projects = () => {
  return (
    <div className="content">
      <Navbar />
      <Projectlist>
        <div className="carts">
          <Card>
            <div>
              <BsPlusCircleFill className="icon" />
            </div>
            <div>
              <h4>Create Projects</h4>
            </div>
          </Card>
        </div>
      </Projectlist>
    </div>
  );
};

export default Projects;

const Projectlist = styled.div`
  padding: 0 1.5rem;
`;

const Card = styled.div`
  display: flex;
  align-items: cemter;
  justify-content: space-around;
  flex-flow: column nowrap;
  text-align: center;
  padding: 1rem;
  background-color: var(--color-bg-2);
  width: 230px;
  color: var(--natural-white);
  height: 200px;
  max-height: 200px;
  min-height: 150px;
  border-radius: var(--border-radius);
  cursor: pointer;

  .icon {
    font-size: 50px;
  }
  h4 {
    font-size: 20px;
    letter-spacing: 1.4px;
  }
  &:hover {
    box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, 0.15);
    .icon {
      transform: rotate(180deg);
      transition: transform var(--transition);
    }
  }
`;
