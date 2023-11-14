import Navbar from "../Navbar";
import styled from "styled-components";
import Slidar from "../Swiperslide/Slidar";

const Dashboard = () => {
  return (
    <div className="content">
      <Navbar />
      <HomeSlide>
      <Slidar />

      </HomeSlide>
    </div>
  );
};

export default Dashboard;

const HomeSlide =styled.div`

`
