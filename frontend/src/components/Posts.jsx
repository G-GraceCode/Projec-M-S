import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { BsPlusCircleFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import AnimatedCircle from "../AnimatedCircle";
import post from "../assets/pic.svg";
import { FaShareFromSquare } from "react-icons/fa6";

const Posts = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(false);

  const getProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://trrmmy-5000.csb.app/project/projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        cors: "no-cors",
      });
      if (res.status === 200) {
        res.json().then((userProjects) => {
          setProjects(userProjects);
        });
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <Projectlist>
      <h4 className="my-2 text-left text-[14px]">List of Projects</h4>
      <div className="carts">
        {loading
          ? "Loading Content..."
          : projects === null
            ? "No Post Created"
            : projects.map((project) => (
                <Card key={project._id}>
                  <img src={post} className="image" alt="img" loading="lazy" />
                  <div className="Category">
                    <h4>{project.category}</h4>
                  </div>
                  <div className="Icons-i">
                    <FaShareFromSquare className="icon share" />
                    <FiEdit className="icon" />
                    <AiFillDelete className="icon-2" />
                  </div>
                  <div className="Detail">
                    <h4>{project.title}</h4>
                  </div>
                </Card>
              ))}
      </div>
    </Projectlist>
  );
};

export default Posts;

const Projectlist = styled.div`
  padding: 0.4rem 0.7rem;
  text-align: center;
  margin: 0 auto;
  width: 70%;
  & > .carts {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(250px), 1fr));
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 0.8rem;
    margin: 0.85rem;
  }
  h4 {
    color: var(--natural-white);
  }
  .Icons-i {
    display: flex;
    align-items: center;
    position: absolute;
    right: 5%;
    // left: 0%;
    bottom: 5%;
    z-index: 1000;
    font-size: 14px;
    background-color: var(--color-bg-2);
    border-radius: var(--border-radius);
    color: var(--natural-white);
    padding: 0.3rem 0.4rem;

    .share,
    .icon,
    .icon-2 {
      margin-right: 8px;
    }

    &:hover {
      .share,
      .icon,
      .icon-2 {
        color: var(--color-sec);
      }
    }
    .icon-2 {
      color: red;
    }
  }
`;

const Card = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-around;
  // flex-flow: column nowrap;
  text-align: center;
  background-color: var(--natural-white);
  color: var(--color-bg-2);
  height: 240px;
  max-height: 240px;
  min-height: 150px;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: var(--border-radius);
  z-index: 1;
  box-shadow: 0px 4px 8px 2px rgba(0, 0, 0, 0.2);

  .image {
    display: block;
    width: 100%;
    object-fit: contain;
    transform: Translate(0) scale(1);
    transition: transform var(--transition);
  }

  &:hover {
    .image {
      transform: scale(1.19);
      transition: transform var(--transition);
    }
  }

  .Category {
    position: absolute;
    top: 2%;
    text-align: center;
    background-color: var(--color-green);
    padding: 0.4rem 0.5rem 0 0.5rem;
    border-radius: var(--border-radius);
    h4 {
      color: var(--natural-white);
      font-size: 18px;
    }
  }
  .Icons {
    position: absolute;
    right: 5%;
    bottom: 5%;
    z-index: 1000;
    font-size: 18px;
    padding: 0.1rem 0.5rem;
    background-color: var(--color-bg-2);
    color: var(--natural-white);
    border-radius: var(--border-radius);
    .icon {
      margin-right: 8px;
    }
    .icon-2 {
      color: red;
    }
  }
  .Detail {
    position: absolute;
    bottom: -200%;
    left: 0;
    right: 0;
    z-index: 10;
    padding: 0.8rem;
    border-radius: 10px 10px 0 0;
    background-color: var(--natural-white);
    transition: bottom var(--transition);
    h4 {
      font-size: 18px;
      text-align: left;
      letter-spacing: 1px;
    }
    p {
      font-size: 14px;
      text-align: left;
      word-spacing: 1px;
    }
  }

  &:hover {
    box-shadow: 0px 4px 6px 1px rgba(0, 0, 0, 0.15);
    border: 2px solid var(--color-green);
    transition: border var(--transition);

    .Detail {
      bottom: 0;
      transition: bottom var(--transition);
    }
  }
`;
