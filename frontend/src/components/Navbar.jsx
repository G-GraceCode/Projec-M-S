import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

const Navbar = () => {
  // const image = require("./image.png");
  return (
    <Nav>
      <Pagetitle>
        <FiMenu className="icon" />
        <h2> Profile </h2>
      </Pagetitle>

      <User>
        <div classNamae="userprofile">
          <div className="userimg">
            {/* <img
              className="img"
              src="/images/yan.jpg"
              alt="user-photo"
              loading="lazy"
            /> */}
          </div>
          <h4>Clarinda</h4>
        </div>

        <Link className="link" to="/logout">
          <FaSignOutAlt className="icon" /> Logout
        </Link>
      </User>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 1rem 0.7rem 1rem;
  color: var(--natural-white);
  flex-wrap: nowrap;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--natural-white);
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
    gap: 1rem;
  }

  & > .link {
    background-color: transparent;
    border: 1px solid var(--natural-white);
    color: var(--natural-white);
    text-decoration: none;
    margin-bottom: 0.36rem;
    padding: 0.3rem 0.6rem;
    border-radius: var(--border-radius);

    .icon {
      margin-right: 0.5rem;
    }

    &:hover {
      background-color: var(--natural-white);
      border: 1px solid transparent;
      color: var(--color-bg);
    }
  }
`;
