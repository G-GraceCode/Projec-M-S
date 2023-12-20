import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import styled from "styled-components";
import { BsPlusCircleFill } from "react-icons/bs";
import { MdGridView } from "react-icons/md";
import { MdOutlineViewAgenda } from "react-icons/md";
import Cards from "../Cards";
import Tableview from "../Tableview";
import DeleteProject from "../../pages/DeleteProject";
import { IoIosSearch } from "react-icons/io";

const Projects = ({ present }) => {
  const [showType, setShowType] = useState("");
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [delet, setDelet] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const getProjects = async () => {
    try {
      const res = await fetch(
        `https://trrmmy-5000.csb.app/project/allprojects?&search=${searchTerm}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (res.status === 200) {
        res.json().then((userProjects) => {
          setPosts(userProjects);
        });
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, [searchTerm, loading]);

  return (
    <div className="content">
      <Navbar />

      <Searchproject>
        <Sortby>
          Sort by:
          <select>
            <option value="hide">Search For</option>
            <option>Complete</option>
            <option>Uncomplete</option>
            <option>Old Project</option>
            <option>New Projects</option>
            <option>Best Projects</option>
          </select>
          <select id="mounth">
            <option value="hide">-- Month --</option>
            <option value="january">January</option>
            <option value="february">February</option>
            <option value="march">March</option>
            <option value="april">April</option>
            <option value="may">May</option>
            <option value="june">June</option>
            <option value="july">July</option>
            <option value="august">August</option>
            <option value="september">September</option>
            <option value="october">October</option>
            <option value="november">November</option>
            <option value="december">December</option>
          </select>
          <select id="year">
            <option value="hide">-- Year --</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </Sortby>
        <form onSubmit={(e) => e.preventDefault()} className="searchbar">
          <IoIosSearch className="search_icon" />
          <input
            type="text"
            name="search"
            className="search"
            placeholder="Search by Project Category"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <Addproject onClick={present}>
          <BsPlusCircleFill className="icon" /> Add Project
        </Addproject>
      </Searchproject>

      {showType === "table" ? (
        <Tableview
          show={() => setDelet("active")}
          posts={posts}
          loading={loading}
        />
      ) : (
        <Cards
          show={() => setDelet("active")}
          posts={posts}
          loading={loading}
        />
      )}
      <Projectfooter>
        <h4>{`Total Project ${posts.length}`}</h4>
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

      {delet && (
        <DeleteProject close={() => (setDelet(""), setLoading(true))} />
      )}
    </div>
  );
};

export default Projects;

const Searchproject = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-flow: row wrap;
  text-align: center;
  margin: 0 1rem 2rem 1rem;
  padding: 0 1.5rem;
  gap: 0.7rem;

  & > .searchbar {
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
    position: relative;

    .search_icon {
      border-right: 2px doudle var(--color-bg);
      position: absolute;
      left: 5%;
      top: 30%;
    }

    input[type="text"] {
      width: 400px;
      min-width: 250px;
      flex: 1;
      padding: 0.5rem 0.7rem 0.5rem 2.3rem;
      outline: none;
      font-size: 14px;
      font-weight: 400;
      letter-spacing: 0.4px;
      background-color: var(--natural-white);
      outline: 2px solid transparent;
      border-radius: var(--border-radius-2);
    }
    input[type="text"]:focus {
      outline: 2px solid var(--color-green);
      outline-offset: 3px;
      width: 430px;
      transition: outline var(--transition);
      transition: width var(--transition);
    }
  }
`;

const Addproject = styled.button`
  border-radius: var(--border-radius-2);
  padding: 0.4rem 0.8rem;
  font-size: 14px;
  border: none;
  background-color: var(--color-green);
  color: var(--natural-white);
  .icon {
    font-size: 14px;
    margin-right: 0 3px 1px 0;
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
  position: fixed;
  background-color: var(--color-green);
  // width: calc(100% - 15%);
  padding: 1rem 0.8rem;
  bottom: 0%;
  left: 0%;
  right: 0;
  color: var(--natural-white);
  z-index: 100;

  h4 {
    color: var(--natural-white);
  }

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

const Sortby = styled.div`
  display: flex;
  gap: 0.5rem;
  // margin: auto;
  border: none;
  color: var(--natural-white);
  align-items: center;
  select {
    padding: 0.4rem 0.8rem;
    font-size: 12px;
    border: none;
    outline: none;
    border-radius: var(--border-radius);
    appearance: none;

    option {
      background-color: var(--natural-white);
    }
    option:selected {
      font-weight: bold;
    }
    &::-ms-expand {
      display: none;
    }

    &:hover {
      border-color: #ccc;
    }

    &:active {
      border-color: #bbb;
    }
  }

  select:hover {
    background-color: #ddd;
  }
`;
