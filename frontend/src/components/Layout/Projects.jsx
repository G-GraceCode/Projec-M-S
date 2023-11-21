import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import styled from "styled-components";
import { BsPlusCircleFill } from "react-icons/bs";
import { MdGridView } from "react-icons/md";
import { MdOutlineViewAgenda } from "react-icons/md";
import Cards from "../Cards";
import Tableview from "../Tableview";
import DeleteProject from "../../pages/DeleteProject";

const Projects = ({ present }) => {
  const [showType, setShowType] = useState("");
  const [posts, setPosts] = useState([]);
  const [delet, setDelet] = useState("");

  useEffect(() => {
    const getProjects = async () => {
      try {
        const res = await fetch(
          "https://7wvkdh-5000.csb.app/project/projects",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            cors: "no-cors",
          },
        );
        if (res.status === 200) {
          res.json().then((userProjects) => {
            setPosts(userProjects);
            console.log("user", userProjects);
          });
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    getProjects();
  }, []);

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
        <Addproject onClick={present}>
          <BsPlusCircleFill className="icon" /> Add Project
        </Addproject>
      </Searchproject>
      {showType === "table" ? (
        <Tableview show={() => setDelet("active")} />
      ) : (
        posts.map((post) => (
          <Cards key={post._id} show={() => setDelet("active")} post={post} />
        ))
      )}
      <Projectfooter>
        <h4>Total Project 3</h4>
        <div className="viewIcon">
          <MdGridView
            className={`icon first ${showType === "" ? "color" : ""}`}
            onClick={() => setShowType("")}
          />
          <MdOutlineViewAgenda
            className={`icon ${showType === "table" ? "color" : ""}`}
            onClick={() => setShowType("table")}
          />
        </div>
      </Projectfooter>

      {delet && <DeleteProject close={() => setDelet("")} />}
    </div>
  );
};

export default Projects;

const Searchproject = styled.div`
  display: flex;
  align-items: cemter;
  justify-content: center;
  flex-flow: row nowrap;
  text-align: center;
  margin-bottom: 2rem;
  filter: drop-shadow(0px 2px 5px rgba(0, 0, 0, 0.1));
  & > .searchbar {
    input[type="search"] {
      width: 450px;
      min-width: 120px;
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
  bottom: 0%;
  left: 0;
  right: 0;
  color: var(--natural-white);
  z-index: 100;

  & > .viewIcon {
    color: var(--color-bg-2);
    border-radius: var(--border-radius);
    border: 1px solid var(--color-bg-2);
    background-color: var(--color-bg-2);
    cursor: pointer;

    .icon {
      margin: 0.4rem 0.7rem;
      font-size: 30px;
      color: var(--color-sec);
    }
    .color {
      color: var(--color-green);
    }
  }
`;
