import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { userAuth } from "../../ultContext/AuthContext";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { RiArrowRightSLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import poc from "../../assets/pic.svg";

const Dashboard = () => {
  const { userInfo } = userAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [topRecent, setTopRecent] = useState([]);
  const [categoryProject, setCategoryProject] = useState([]);

  const dashboardProject = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://trrmmy-5000.csb.app/project`, {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (res.status === 200) {
        res.json().then((project) => {
          setTopRecent(project.topRecent);
          setCategoryProject(project.topProjectByPro);
          console.log(project);
        });
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dashboardProject();
  }, [userInfo._id]);

  return (
    <div className="content">
      <Navbar />
      <HomeSlide>
        <Recentpost>
          <h4 className="text-left text-[18px] text-[var(--natural-white)]">
            Top Recent Pojects
          </h4>
          <div className="cards">
            {topRecent.map((project) => (
              <div className="carts" key={project._id}>
                <Col className="p-4 card-text">
                  <h2 className="text-left text-[18px] text-[var(--natural-white)]">
                    {project.title}
                  </h2>
                  <h6>{project.summary}</h6>
                  <button
                    className="btn"
                    onClick={() => navigate("/viewing/" + project._id)}
                  >
                    Read More <RiArrowRightSLine />
                  </button>
                </Col>
                <div className="image">
                  <img src={project.coverImg} />
                </div>
              </div>
            ))}
          </div>
        </Recentpost>

        <Mostrecent>
          <div className="most-title">
            <h3>Projects By Category</h3>
            <Link to="/project" className="link">
              See more
            </Link>
          </div>

          <div className="cart-list">
            {categoryProject.map((project) => (
              <div className="cart" key={project._id}>
                <div className="image">
                  <img src={project.coverImg} alt="img" loading="lazy" />
                </div>
                <div className="Category">
                  <h4>{project.title}...</h4>
                  <p>{project.summery}...</p>
                </div>
                <div className="profile">
                  <span>
                    <img src={project.author.profile} />
                  </span>
                  <small>
                    by <Link>{project.author.username}</Link>
                  </small>
                </div>
              </div>
            ))}
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
  margin-bottom: 4rem;
  @media screen and (max-width: 599px), (max-width: 769px) {
    .cards {
      .carts {
        flex-direction: column;
        .image {
          height: 40% !important;
        }
        .card-text {
          max-height: 55%;
        }
      }
    }
  }
  h4 {
    color: var(--natural-white);
    font-size: 22px !important;
    font-weight: 600;
    letter-spacing: 0.7px;
    // margin-left: -5px;
    margin-bottom: 0.9rem !important;
  }
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(450px), 1fr));
    align-items: center;
    justify-content: center;
    gap: 1rem;

    .carts {
      display: flex;
      flex-wrap: wrap-reveser;
      border: 2px double var(--natural-white);
      border-radius: 15px;
      overflow: hidden;
      min-width: 450px;
      height: 350px;
      max-height: 350px;
      box-shadow: 0px 4px 8px 2px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      position: relative;
      z-index: -1;

      .card-text {
        display: flex;
        flex-flow: column nowrap;
        height: 100%;
        color: var(--natural-white);
        cursor: pointer;
        z-index: 2;
        h2 {
          font-size: 20px;
          font-weight: 600;
          letter-spacing: 0.5px;
          word-spacing: 0.6px;
          margin-bottom: 0.8rem;
        }
        h6 {
          font-size: 12px;
          font-weight: 400;
          word-spacing: 0.6px;
          margin-bottom: 0.8rem;
          text-align: left;
          color: var(--color-sec);
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
      }

      .image {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        height: 100%;
        min-height: 80%;
        width: 100%;

        img {
          margin: 0.1px;
          border-radius: 13px;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
`;

const Mostrecent = styled.div`
  .most-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    border-bottom: 2px double var(--natural-white);
    color: var(--natural-white);
    .link {
      text-decoration: none;
      color: var(--natural-white);
    }
  }

  .cart-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(300px), 1fr));
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 4rem;

    .cart {
      padding: 0.6rem 0.6rem;
      border: 2px double var(--natural-white);
      border-radius: var(--border-radius);
      height: 310px;
      box-shadow: 0px 4px 8px 2px rgba(0, 0, 0, 0.2);

      min-height: 270px;
      .image {
        height: 120px;
        overflow: hidden;
        border-radius: var(--border-radius);
        img {
          width: 100%;
          object-fit: cover;
        }
      }
      .Category {
        padding: 0.4rem;
        color: var(--color-sec);
        h4 {
          font-size: 16px;
          font-weight: 500;
          margin: 0.7rem 0;
          color: var(--natural-white);
        }
        p {
          font-size: 12px;
          word-spacing: 0.5px;
        }
      }
      .profile {
        margin-bottom: 1.1rem;
        padding-left: 0.7rem;
        display: flex;
        align-items: center;
        gap: 0.3rem;
        color: var(--natural-white);
        width: 100%;
        margin-top: auto;

        & > span {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          overflow: hidden;
          margin-left: 0.2rem;

          img {
            width: 100%;
            object-fit: cover;
            object-position: center center;
          }
        }
      }
    }
  }
`;
