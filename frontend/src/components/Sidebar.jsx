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
import { FiMenu } from "react-icons/fi";
import "./Sidebar.css";
import { FaSignOutAlt } from "react-icons/fa";
import { userAuth } from "../ultContext/AuthContext";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";

// import { FaBars } from "react-icons/fa";
// import { FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const { userInfo } = userAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  // assigning location variable
  const location = useLocation();
  // destructuring pathnamefrom loaction
  const { pathname } = location;
  //javascript split method to get name of path in array
  const splitLocation = pathname.split("/");
  // for mediaquery for screens

  return (
    <>
      {userInfo ? (
        <>
          {isCollapsed ? (
            <Menu
              className="nav-controler"
              style={{
                left: `${isCollapsed ? "0%" : "2.8%"}`,
                backgroundColor: `${isCollapsed ? "" : "var(--color-bg-2)"}`,
              }}
            >
              <div className="logo"> Projec</div>
              <div className="content_hover">
                {splitLocation[1] === "app" && <span></span>}

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
                {splitLocation[1] === "app" && <span className="span"></span>}
              </div>
              <div className="content_hover">
                {splitLocation[1] === "project" && <span></span>}

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
                {splitLocation[1] === "project" && (
                  <span className="span"></span>
                )}
              </div>
              <div className="content_hover">
                {splitLocation[1] === "profile" && <span></span>}

                <div
                  className={`control control-1  ${
                    splitLocation[1] === "profile" ? "active-btn" : ""
                  }`}
                  arial-content="profile"
                >
                  <Link to="/profile" className="font">
                    <FaUserAlt />
                    <p>Profile </p>
                  </Link>
                </div>
                {splitLocation[1] === "profile" && (
                  <span className="span"></span>
                )}
              </div>
              <div className="content_hover">
                {splitLocation[1] === "setting" && <span></span>}

                <div
                  className={`control control-1  ${
                    splitLocation[1] === "setting" ? "active-btn" : ""
                  }`}
                  arial-content="setting"
                >
                  <Link to="/setting" className="font">
                    <IoMdSettings />

                    <p> Setting </p>
                  </Link>
                </div>
                {splitLocation[1] === "setting" && (
                  <span className="span"></span>
                )}
              </div>
              <div className="content_hover">
                {splitLocation[1] === "logout" && <span></span>}

                <div
                  className={`control control-1  ${
                    splitLocation[1] === "logout" ? "active-btn" : ""
                  }`}
                  arial-content="logout"
                >
                  <Link to="/logout" className="font">
                    <FaSignOutAlt />

                    <p> Logout </p>
                  </Link>
                </div>
                {splitLocation[1] === "logout" && (
                  <span className="span"></span>
                )}
              </div>

              <div className="sidebar">
                <IoIosArrowDropleft className="icon" onClick={handleToggle} />
              </div>
            </Menu>
          ) : (
            <div className="sidebar sideclose">
              <IoIosArrowDropright className="icon" onClick={handleToggle} />
            </div>
          )}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Sidebar;

const Menu = styled.aside``;
