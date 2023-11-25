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
              <Link to={`/editproject/${id}`} className="edit">
                <FiEdit /> Edit
              </Link>
            </div>
            <div className="title">
              <h1>{projectInfo.title}</h1>
              <span>
                {`A ${projectInfo.category} project, Created on  `}
                <time>{new Date(projectInfo.createdAt).toDateString()}</time>
              </span>
            </div>
            <div className="imgContainer">
              <img
                src={`https://trrmmy-5000.csb.app/${projectInfo.coverImg}`}
                alt=""
                loading="lazy"
              />
            </div>
            <div
              className="text"
              dangerouslySetInnerHTML={{ __html: projectInfo.content }}
            />
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
  text-align: center;
  width: 100%;
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
  .title {
    margin: 0.8rem 0;

    h1 {
      font-size: 40px;
      font-weight: 600;
      text-transform: uppercase;
    }
  }
  .imgContainer {
    height: 400px;
    overflow: hidden; 
    border-radius: var(--border-radius);
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
`;
