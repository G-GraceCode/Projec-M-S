import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { BsPlusCircleFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import AnimatedCircle from "../AnimatedCircle";

const Cards = ({ posts, show, loading }) => {
  const navigate = useNavigate();
  const [totalPost, setTotalPost] = useState([posts]);

  return (
    <Projectlist>
      <div className="carts">
        {loading ? (
          <div className="circle">
            <AnimatedCircle /> Searching ...
          </div>
        ) : !totalPost.length ? (
          <h4> No Project Created</h4>
        ) : (
          posts.map((post) => (
            <Card key={post._id}>
              <img
                src={`https://trrmmy-5000.csb.app/${post?.coverImg}`}
                onClick={() => navigate("/viewing/" + post._id)}
                className="image"
                alt="img"
                loading="lazy"
              />
              <div className="Category">
                <h4>{post.category}</h4>
              </div>
              <div className="Icons">
                <FiEdit
                  className="icon"
                  onClick={() => navigate("/editproject/" + post._id)}
                />
                <AiFillDelete className="icon-2" onClick={show} />
              </div>
              <div
                className="Detail"
                onClick={() => navigate("/viewing/" + post._id)}
              >
                <h4>{post?.title}</h4>
                <p>{post.summary}</p>
              </div>
            </Card>
          ))
        )}
      </div>
    </Projectlist>
  );
};

export default Cards;

const Projectlist = styled.div`
  padding: 0.4rem 1.5rem;
  text-align: center;
  & > .carts {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(250px), 1fr));
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 0.8rem;
    margin: 0.85rem;
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

  .image {
    display: block;
    width: 100%;
    object-fit: contain;
    transform: Translate(0) scale(1);
    transition: transform var(--transition);
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
