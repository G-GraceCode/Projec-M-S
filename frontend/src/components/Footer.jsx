import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Footerside>
      <p>
        {" "}
        &copy; 2023 G-GraceCode,{" "}
        <Link to={"https://github.com/G-GraceCode/Projec-M-S"} className="Link">
          {" "}
          Github
        </Link>
      </p>
    </Footerside>
  );
};

export default Footer;

const Footerside = styled.footer`
  // padding: auto 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-bg-2);
  color: var(--natural-white);
  p {
    margin-top: 0.7rem;
    padding-bottom: -0.1rem;
    .Link {
      text-decoration: none;
    }
  }
`;
