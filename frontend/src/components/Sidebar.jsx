// import react from "react";
import React, { useState } from "react";
import styled from "styled-components";
// import { Container, Row, Col, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { MdContacts } from "react-icons/md";
import { BsDownload } from "react-icons/bs";
import "./Sidebar.css";
// import { FaBars } from "react-icons/fa";
// import { FaTimes } from "react-icons/fa";

const Sidebar = () => {
  // const [isCollapsed, setIsCollapsed] = useState(true);

  // const handleToggle = () => {
  //   setIsCollapsed((prevState) => !prevState);
  // };

  // assigning location variable
  const location = useLocation();
  // destructuring pathnamefrom loaction
  const { pathname } = location;
  //javascript split method to get name of path in array
  const splitLocation = pathname.split("/");
  // for mediaquery for screens

  return (
    <Menu className="nav-controler">
      <div className="logo"> Projec</div>

      <div className="content_hover">
        <div
          className={`control control-1 info ${
            splitLocation[1] === "app" ? "active-btn" : ""
          }`}
          // arial-content="home"
          data-id="home"
        >
          <Link className="font" to="/app">
            <AiFillHome />
            <p>Home</p>
          </Link>
        </div>
      </div>

      <div className="content_hover">
        <div
          className={`control control-1 ${
            splitLocation[1] === "project" ? "active-btn" : ""
          }`}
          arial-content="Project"
        >
          <Link to="/project" className="font">
            <FaBriefcase />
            <p> Projects </p>
          </Link>
        </div>
      </div>

      <div className="content_hover">
        <div
          className={`control control-1  ${
            splitLocation[1] === "profile" ? "active-btn" : ""
          }`}
          arial-content="About"
        >
          <Link to="/profile" className="font">
            <FaUserAlt />
            <p>Profile </p>
          </Link>
        </div>
      </div>

      <div className="content_hover">
        <div
          className={`control control-1  ${
            splitLocation[1] === "logout" ? "active-btn" : ""
          } resume`}
          arial-content="Resume"
        >
          <Link
            to="/logout"
            className="font"
            href="/images/Vitna.pdf"
            download={"/images/Vitna.pdf"}
          >
            <span className='icon'> <BsDownload /> </span>
            <p> Logout </p>
          </Link>
        </div>
      </div>
    </Menu>
  );
};

export default Sidebar;

const Menu = styled.div``;