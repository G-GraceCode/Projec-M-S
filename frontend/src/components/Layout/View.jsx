import { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../Navbar";
import { userAuth } from "../../ultContext/AuthContext";
import AnimatedCircle from "../../AnimatedCircle";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { useParams, Link } from "react-router-dom";

const View = () => {
  const [loading, setLoading] = useState(true);
  const [projectInfo, setProjectInfo] = useState({});
  const { id } = useParams();
  const { userInfo } = userAuth();
  const { username } = userInfo;

  const getTheProject = async () => {
    try {
      const res = await fetch(`https://trrmmy-5000.csb.app/project/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // credentials: "include",
        cors: "no-cors",
      });
      if (res.status === 200) {
        res.json().then((pro) => {
          setProjectInfo(pro);
          console.log("res", pro);
        });
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTheProject();
  }, [id]);

  return (
    <div className="content">
      <Navbar />
      <Section>
        {loading ? (
          <AnimatedCircle />
        ) : (
          <Content>
            <div className="header">
              <Link to="/project" className="h2">
                <FaArrowLeftLong /> Back
              </Link>
              {userInfo?._id === projectInfo.author && (
                <Link to={`/editproject/${id}`} className="edit">
                  <FiEdit /> Edit
                </Link>
              )}
            </div>
            <div className="text-info">
              <div className="title">
                <h1>{projectInfo.title}</h1>
                <div className="userprofile">
                  <div className="userimg">
                    {!projectInfo.author.profile ? (
                      <div className="w-100 h-100 bg-success text-uppercase font-weight-bold d-flex align-items-center justify-content-center">
                        <span>{`${projectInfo.author?.username[0]}`}</span>
                      </div>
                    ) : (
                      <img
                        className="img"
                        src={projectInfo?.author.profile}
                        alt="user-photo"
                        loading="lazy"
                        title="Your Avater"
                      />
                    )}
                  </div>
                  <div className="info">
                    <h4>{projectInfo.author?.username}</h4>
                    <small>
                      {`A ${projectInfo.category} project, Created on  `}{" "}
                      <time>
                        {new Date(projectInfo.createdAt).toDateString()}
                      </time>
                    </small>
                  </div>
                </div>
              </div>
              <div className="imgContainer">
                <img
                  src={`${projectInfo.coverImg}`}
                  alt=""
                  loading="lazy"
                />
              </div>
              <div
                className="text"
                dangerouslySetInnerHTML={{ __html: projectInfo.content }}
              />
            </div>
          </Content>
        )}
      </Section>
    </div>
  );
};

export default View;

const Section = styled.section``;

const Content = styled.div`
  border-radius: var(--border-radius);
  color: var(--natural-white);
  padding: 0.5rem 1.7rem;
  width: 70%;
  margin: 0 auto;
  .header {
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 0 0.5rem;
    .h2 {
      color: var(--natural-white);
      font-size: 18px;
    }
    .edit {
      text-decoration: none;
      font-size: 16px;
      color: var(--color-green);
      font-weight: 600;
      background-color: var(--natural-white);
      padding: 0.4rem;
    }
  }
  .text-info {
    .title {
      margin: 1rem 0;
      text-align: left;

      h1 {
        font-size: 50px;
        font-weight: 600;
        text-transform: uppercase;
        margin-bottom: 1rem 0;
      }

      & > .userprofile {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: flex-start;
        gap: 0.6rem;
        cursor: pointer;
        margin-left: 0.6rem;
        .userimg {
          width: 2rem;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;

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
            font-size: 14px;
            letter-spacing: 0.8px;
          }
          small {
            margin-top: -10px;
            font-size: 10px;
          }
        }
      }
    }
    .imgContainer {
      height: 400px;
      overflow: hidden;
      border-radius: var(--border-radius);
      margin: 2rem 0;
      img {
        object-position: center center;
      }
    }
    .text {
      text-align: left;
      padding: 0.7rem;
      line-height: 1.4rem;
      text-align: justify;
      font-size: 16px;
      word-spacing: 1.4px;
      letter-spacing: 0.8px;
    }
  }
`;
