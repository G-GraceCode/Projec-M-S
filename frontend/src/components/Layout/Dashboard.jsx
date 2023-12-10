import Navbar from "../Navbar";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { userAuth } from "../../ultContext/AuthContext";

const Dashboard = ({ bar }) => {
  const { userInfo } = userAuth();

  return (
    <div className="content">
      <Navbar bar={bar} />
      <HomeSlide></HomeSlide>
    </div>
  );
};

export default Dashboard;

const HomeSlide = styled.div`
  position: relative;
  padding: 0 1rem;
  width: 80%;
  margin: 0 auto;
  padding: 0.4rem 0.6rem;
`;
