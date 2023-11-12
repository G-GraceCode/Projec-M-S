import Navbar from "../Navbar";
import styled from "styled-components";
import { BsPlusCircleFill } from "react-icons/bs";
import { MdGridView } from "react-icons/md";
import { MdOutlineViewAgenda } from "react-icons/md";

const Projects = () => {
  return (
    <div className="content">
      <Navbar />
      <Searchproject>
        <div className="searchbar">
          <input
            type="search"
            name="search"
            className="search"
            placeholder="Search by Project Category"
          />
        </div>
        <Addproject>
          <BsPlusCircleFill className="icon" /> Add Project
        </Addproject>
      </Searchproject>
      {/* <Projectlist>
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
      </Projectlist> */}
      <Projectfooter>
        <h4>Total Project 3</h4>
        <div className="viewIcon">
          <MdGridView className="icon first" />
          <MdOutlineViewAgenda className="icon" />
        </div>
      </Projectfooter>
    </div>
  );
};

export default Projects;

// const Projectlist = styled.div`
//   padding: 0 1.5rem;
// `;

const Card = styled.div`
  display: flex;
  align-items: center;
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

const Searchproject = styled.div`
  display: flex;
  align-items: cemter;
  justify-content: center;
  flex-flow: row nowrap;
  text-align: center;
  filter: drop-shadow(0px 2px 5px rgba(0, 0, 0, 0.1));
  & > .searchbar {
    input[type="search"] {
      width: 450px;
      min-width: 200px;
      max-width: 470px;
      flex: 1;
      padding: 0.7rem 1rem;
      outline: none;
      border-radius: var(--border-radius-2) 0 0 var(--border-radius-2);
    }
  }
`;

const Addproject = styled.button`
  border-radius: 0 var(--border-radius-2) var(--border-radius-2) 0;
  padding: 0 1rem;
  border: none;
  background-color: var(--color-green);
  color: var(--natural-white);
  .icon {
    font-size: 20px;
    transform: rotate(180deg);
    transition: transform var(--transition);
  }
`;

const Projectfooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding: 0 1.5rem;
  position: absolute;
  bottom: -2%;
  left: 0;
  right: 0;
  color: var(--natural-white);

  & > .viewIcon {
    color: var(--color-bg-2);
    border-radius: var(--border-radius);
    border: 1px solid var(--color-bg-2);
    background-color: var(--color-bg-2);

    .icon {
      margin: 0.4rem 0.7rem;
      font-size: 30px;
      color: var(--color-sec);
    }
  }
`;
