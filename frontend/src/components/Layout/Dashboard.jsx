import Navbar from "../Navbar";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { userAuth } from "../../ultContext/AuthContext";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { RiArrowRightSLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import poc from "../../assets/pic.svg";

const Dashboard = () => {
  const { userInfo } = userAuth();

  return (
    <div className="content">
      <Navbar />
      <HomeSlide>
        <Recentpost>
          <h4 className="text-left text-[18px] text-[var(--natural-white)]">
            Top Recent Pojects
          </h4>
          <div className="cards">
            <div className="carts">
              <Col className="p-4 card-text">
                <h2>
                  How to create public shareable link for private user resources
                  in MERN application
                </h2>
                <h6>
                  Now, I want to add a feature where the user can share their
                  created list with anyone through a shareable link just like
                  how we give access to files on google drive
                </h6>
                <button className="btn">
                  Read More <RiArrowRightSLine />
                </button>
              </Col>
              <div className="image">
                <img src={poc} />
              </div>
            </div>
            <div className="carts">
              <Col className="p-4 card-text">
                <h2 className="text-left text-[18px] text-[var(--natural-white)]">
                  How to create public shareable link for private user resources
                  in MERN application
                </h2>
                <h6>
                  Now, I want to add a feature where the user can share their
                  created list with anyone through a shareable link just like
                  how we give access to files on google drive
                </h6>
                <button className="btn">
                  Read More <RiArrowRightSLine />
                </button>
              </Col>
              <div className="image">
                <img src={poc} />
              </div>
            </div>
          </div>
        </Recentpost>

        <Mostrecent>
          <div>
            <h3>Most Projects</h3>
            <Link to="/project">See more</Link>
          </div>

          <div className="cart-list">
            <div className="card">
              <div>
                <img src={poc} className="image" alt="img" loading="lazy" />
              </div>
              <div className="Category">
                <h4>
                  {" "}
                  How to create public shareable link for private user resources
                  in MERN application...
                </h4>
                <p>
                  {" "}
                  Now, I want to add a feature where the user can share their
                  created list with anyone through a shareable link just like
                </p>
              </div>
              <div className="profile">
                <span>
                  <img />
                </span>
                <small>
                  by <Link>Gody</Link>
                </small>
              </div>
            </div>
          </div>
        </Mostrecent>
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
  h4 {
    color: var(--natural-white);
    font-size: 25px !important;
    font-weight: 600;
    letter-spacing: 0.7px;
    margin-bottom: 0.9rem !important;
  }
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(460px), 1fr));
    align-items: center;
    justify-content: center;
    gap: 0.8rem;

    .carts {
      display: flex;
      align-items: flex-end;
      flex-direction: row;
      flex-wrap: wrap-reverse;
      background: var(--natural-white);
      border-radius: 10px;
      overflow: hidden;
      height: 350px;
      max-height: 350px;
      box-shadow: 0px 4px 8px 2px rgba(0, 0, 0, 0.2);

      .card-text {
        display: flex;
        flex-flow: column nowrap;
        height: 100%;
        h2 {
          font-size: 20px;
          font-weight: 600;
          letter-spacing: 0.5px;
          word-spacing: 0.6px;
          margin-bottom: 0.8rem;
        }
        h6 {
          font-size: 14px;
          font-weight: 400;
          word-spacing: 0.6px;
          margin-bottom: 0.8rem;
          text-align: justify;
        }
        .btn {
          margin-top: auto;
          align-self: flex-start;
          border-radius: 20px;
          color: var(--natural-white);
          background-color: var(--natural-bk);
          padding: 0.7rem 1rem;
          text-align: left;
        }
        &:hover {
          .btn {
            text-align: left;
            letter-spacing: 0.5px;
            transition: letter-spacing var(--transition);
          }
        }
      }

      .image {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
`;

const Mostrecent = styled.div``;
