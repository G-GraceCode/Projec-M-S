import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import styled from "styled-components";
import { BsPlusCircleFill } from "react-icons/bs";
import { MdGridView } from "react-icons/md";
import { MdOutlineViewAgenda } from "react-icons/md";
import Cards from "../Cards";
import Tableview from "../Tableview";
import { IoIosSearch } from "react-icons/io";
import Search from "../Search";
import { userAuth } from "../../ultContext/AuthContext";

const Projects = ({ present }) => {
  const [showType, setShowType] = useState("");
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [sort, setSort] = useState("");
  const [resultSearch, setResultSearch] = useState("");
  const [goBack, setGoBack] = useState("");
  const [filter, setFilter] = useState([]);
  const { userInfo } = userAuth();

  console.log(month, year, sort);

  const getProjects = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `https://trrmmy-5000.csb.app/project/projectsearched?&search=${searchTerm}`,
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
      setResultSearch(searchTerm);
      setSearchTerm("");
    }
  };

  const loadedProject = async () => {
    try {
      const res = await fetch(
        `https://trrmmy-5000.csb.app/project/allprojects?&sort=${sort}&month=${month}&year=${year}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          cors: "no-cors",
        },
      );
      if (res.status === 200) {
        res.json().then((userProjects) => {
          setPosts(userProjects);
        });
      }
      setGoBack("");
    } catch (e) {
      console.log(e.message);
    }
  };

  // const filterResult = () => {
  //   if (month) {
  //     const filterByMonth = posts.filter((project) => project.toFrom);
  //   }
  // };

  useEffect(() => {
    loadedProject();
  }, [month, year, sort, userInfo, goBack]);

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
        <Tableview posts={posts} loading={loading} />
      ) : (
        <Cards
          result={resultSearch}
          search={searchTerm}
          posts={posts}
          loading={loading}
          goBack={() => {
            setGoBack("go"), setSearchTerm(""), setResultSearch("");
          }}
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
    </div>
  );
};

export default Projects;

const Projectfooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  position: fixed;
  background-color: var(--color-green);
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
      margin: 0.4rem 0.5rem;
      font-size: 25px;
      color: var(--color-sec);
    }
    .color {
      color: var(--color-green);
    }
  }
`;
