import Navbar from "../Navbar";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { userAuth } from "../../ultContext/AuthContext";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { RiArrowRightSLine } from "react-icons/ri";
import poc from "../../assets/poc.jpg";

const Dashboard = () => {
  const { userInfo } = userAuth();

  return (
    <div className="content">
      <Navbar />
      <HomeSlide>
        <Recentpost>
          <h4 className="my-3 text-left text-[18px] text-[var(--natural-white)]">
            Top Recent Pojects
          </h4>
          <div className="cards">
            <div className="card">
              <Col className="p-3">
                <h2>
                  How to create public shareable link for private user resources
                  in MERN application
                </h2>
                <h6>
                  Now, I want to add a feature where the user can share their
                  created list with anyone through a shareable link just like
                  how we give access to files on google drive without the person
                  requiring to login
                </h6>
                <button className="px-1 py-3">
                  Read More <RiArrowRightSLine />
                </button>
              </Col>
              <div className="image">
                <img src={poc} />
              </div>
            </div>
          </div>
        </Recentpost>
      </HomeSlide>
    </div>
  );
};

export default Dashboard;

const HomeSlide = styled.div`
  position: relative;
  padding: 0 1rem;
  width: 85%;
  margin: 0 auto;
  padding: 0.4rem 0.6rem;
`;

const Recentpost = styled.div`
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(450px), 1fr));
    align-items: center;
    justify-content: center;

    .card {
      display: flex;
      align-items: center;

      .image {
        img {
          width: 100%;
          object-fit: cover;
        }
      }
    }
  }
`;
