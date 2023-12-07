import Navbar from "../Navbar";
import styled from "styled-components";
import Slidar from "../Swiperslide/Slidar";
import { Link } from "react-router-dom";
import { userAuth } from "../../ultContext/AuthContext";

const Dashboard = ({ bar }) => {
  const { userInfo } = userAuth();

  return (
    <div className="content">
      <Navbar />
      <HomeSlide>
        <Slidar />
        <div className="Userinfo">
          <div>
            <h1>{`Welcome Back ${userInfo.username}`}</h1>
            <p>What New do you love adding today in Projectject</p>
            <Link to="/project" className="proj">
              Create a New Project
            </Link>
          </div>
        </div>
      </HomeSlide>
    </div>
  );
};

export default Dashboard;

const HomeSlide = styled.div`
  position: relative;
  margin-top: -1.5rem;
  padding: 0 1rem;
  .Userinfo {
    position: absolute;
    bottom: 4%;
    top: 4%;
    left: 7%;
    right: 7%;
    padding: 0 1rem;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    & > div {
      text-align: center;
      border-radius: var(--border-radius);
      padding: 1.5rem 2rem;
      background-color: var(--natural-white);
      filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.35));
      h1 {
        margin-bottom: 1rem;
      }
      .proj {
        text-decoration: none;
      }
    }
  }
`;
