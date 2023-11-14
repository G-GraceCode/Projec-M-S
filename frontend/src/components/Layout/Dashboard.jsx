import Navbar from "../Navbar";
import styled from "styled-components";
import Slidar from "../Swiperslide/Slidar";

const Dashboard = () => {
  return (
    <div className="content">
      <Navbar />
      <HomeSlide>
        <Slidar />
        <div className="Userinfo">
          <div>
            <h1>Welcome Back Yanmick</h1>
            <p>What New do you love adding today in Projectject</p>
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

      padding: 1rem;
      background-color: var(--natural-white);
    }
  }
`;
