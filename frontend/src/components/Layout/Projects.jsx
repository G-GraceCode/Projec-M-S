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
import Search from "../Search";

const Projects = ({ present }) => {
  const [showType, setShowType] = useState("");
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [delet, setDelet] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [sort, setSort] = useState("");

  console.log(month, year, sort);

  const getProjects = async () => {
    let uri = `?&sort=${searchTerm}&search=${sort}&month=${month}&year=${year}`;
    try {
      const res = await fetch(
        `https://trrmmy-5000.csb.app/project/allprojects${uri}`,
        {
          method: "GET",
          credentials: "include",
          cors: "no-cors",
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

  // useEffect(() => {
  //   getProjects();
  // }, [searchTerm, loading]);

  return (
    <div className="content">
      <Navbar />
      <Search
        present={present}
        search={searchTerm}
        year={year}
        month={month}
        sort={sort}
        seachValue={(e) => setSearchTerm(e.target.value)}
        sortValue={(e) => setSort(e.target.value)}
        yearValue={(e) => setYear(e.target.value)}
        monthValue={(e) => setMonth(e.target.value)}
        clicktosearch={getProjects}
      />

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
