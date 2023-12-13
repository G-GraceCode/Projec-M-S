import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
// import { FaSignOutAlt } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { userAuth } from "../ultContext/AuthContext";
import avater from "../assets/add.png";
import { BsPlusCircleFill } from "react-icons/bs";

const Navbar = () => {
  const { userInfo } = userAuth();
  // const { username } = user;
  // console.log("user", user);
  // assigning location variable
  const location = useLocation();
  // destructuring pathnamefrom loaction
  const { pathname } = location;
  //javascript split method to get name of path in array
  const splitLocation = pathname.split("/");

  return (
    <Nav>
      <Pagetitle>
        {splitLocation === "app" || pathname === "/app" ? (
          <h2>Dashboard</h2>
        ) : (
          <h2>{splitLocation}</h2>
        )}
      </Pagetitle>

      <User>
        <Link className="link" to="/project">
          Create
        </Link>

        <div className="userprofile">
          <div className="userimg">
            <img
              className="img"
              src={userInfo.profile ? userInfo.profile : avater}
              alt="user-photo"
              loading="lazy"
              title="Your Avater"
            />
          </div>
          <div className="info">
            <h4>{userInfo?.username}</h4>
            <small>{userInfo?.prof}</small>
          </div>
        </div>
      </User>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem 0.7rem 1rem;
  color: var(--natural-white);
  flex-wrap: nowrap;
  margin-bottom: 1.6rem;
  border-bottom: 1px solid var(--natural-white);
  position: sticky;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.06),
    rgba(255, 255, 255, 0.06)
  );
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  filter: drop-shadow(0 8px 32px rgba(0, 0, 0, 0.37));
  top: 0%;
  left: 0%;
  right: 0%;
  min-width: 85%;

  z-index: var(--z-modal);
`;
const Pagetitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 45px;
  letter-spacing: 1.4px;
  .icon {
    margin: 0 0.5rem 0.3rem 0;
    font-size: 35px;
    cursor: pointer;
  }
  h2 {
    text-transform: capitalize;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  gap: 1rem;

  & > .userprofile {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    cursor: pointer;
    .userimg {
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-bg-2);

      border-radius: 50%;
      overflow: hidden;
      outline: 1px solid var(--natural-white);
      outline-offset: 3px;

      .img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
      }
    }
    .info {
      display: flex;
      flex-flow: column nowrap;
      align-items: flex-start;
      justify-content: center;
      cursor: pointer;
      h4 {
        letter-spacing: 0.8px;
      }
      small {
        margin-top: -10px;
        font-size: 11px;
      }
    }
  }

  & > .link {
    background-color: var(--color-green);
    border: 1px solid transparent;
    color: var(--natural-white);
    text-decoration: none;
    margin-bottom: 0.2rem;
    margin-right: 16px;
    padding: 0.15rem 0.8rem;
    border-radius: var(--border-radius);

    .icon {
      margin-right: 0.2rem;
    }

    &:hover {
      background-color: var(--natural-white);
      border: 1px solid var(--color-green);
      color: var(--color-bg);
    }
  }
`;
