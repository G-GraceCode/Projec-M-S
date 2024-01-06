import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { BsPlusCircleFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import AnimatedCircle from "../AnimatedCircle";
import poc from "../assets/pic.svg";
import { userAuth } from "../ultContext/AuthContext";
import AuserProfile from "./AuserProfile";
import { IoIosArrowBack } from "react-icons/io";
import DeleteProject from "../pages/DeleteProject";

const Cards = ({ posts, loading, search, result, goBack }) => {
  const navigate = useNavigate();
  const [delet, setDelet] = useState("");
  const [totalPost, setTotalPost] = useState([posts]);
  const [viewProfile, setViewProfile] = useState("");
  const [userId, setUserId] = useState(null);
  const [deleteProjectId, setDeleteProjectId]= useState(null);
  const { userInfo } = userAuth();

  return (
    <Projectlist>
      {result.length > 0 && (
        <h5 className="text-white mx-2 my-3 cursor-pointer">
          <IoIosArrowBack onClick={goBack} /> {`Search Result for: ${result}`}
        </h5>
      )}

      {loading ? (
        <div className="circle">
          <AnimatedCircle /> Searching ...
        </div>
      ) : !totalPost ? (
        <h4> No Project Created</h4>
      ) : (
        <div className="carts">
          {posts.map((post) => (
            <Card key={post._id}>
              <div className="image">
                <img
                  src={`${post?.coverImg}`}
                  onClick={() => navigate("/viewing/" + post._id)}
                  alt="img"
                  loading="lazy"
                />
              </div>
              <div className="category_text">
                <h4>{post.category}</h4>
              </div>

              <div
                className="Detail"
                onClick={() => navigate("/viewing/" + post._id)}
              >
                <h4>{post?.title}</h4>
              </div>

              <div className="profile">
                <div
                  className="user"
                  onClick={() => {
                    setUserId(post.author._id);
                    setViewProfile("active");
                  }}
                >
                  <img src={post.author.profile} />
                  <span>{`by ${post.author.username}`}</span>
                </div>

                {viewProfile && (
                  <AuserProfile
                    key={userId}
                    id={userId}
                    close={() => setViewProfile("")}
                  />
                )}

                {userInfo?._id === post.author._id ? (
                  <div className="Icons">
                    <FiEdit
                      className="icon"
                      onClick={() => navigate("/editproject/" + post._id)}
                    />

                    <AiFillDelete
                      className="icon-2"
                      onClick={() => {setDelet("active"), setDeleteProjectId(post._id)}}

                    />
                  </div>
                ) : (
                  ""
                )}

                {delet && (
                  <DeleteProject
                    key={post._id}
                    close={() => {
                      setDelet(""), goBack();
                    }}
                    projectId={deleteProjectId}
                  />
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </Projectlist>
  );
};

export default Cards;

const Projectlist = styled.div`
  padding: 0.4rem 1.5rem;
  margin-bottom: 5rem;
  text-align: left;
  & > .carts {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(300px), 1fr));
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 1rem;
  }
`;

const Card = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
  justify-content: space-around;
  text-align: center;
  color: var(--color-bg-2);
  cursor: pointer;
  border: 2px solid var(--color-sec);
  margin: 0.85rem;

  .image {
    width: inherit;
    height: 150px;
    overflow: hidden;

    img {
      display: block;
      width: 100%;
      object-fit: contain;
      object-position: center center;
      transform: Translate(0) scale(1);
      transition: transform var(--transition);
    }
  }

  .category_text {
    position: absolute;
    top: -10%;
    left: 5%;
    text-align: center;
    h4 {
      color: var(--color-sec);
      font-size: 12px;
      padding: 0.4rem;
      font-style: italic;
    }
  }
  .Detail {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    width: 100%;
    height: 80px;
    background-color: var(--color-bg-2);
    border-bottom: 2px double var(--color-bg);

    h4 {
      color: var(--natural-white);
      font-size: 20px;
      text-align: center;
      letter-spacing: 1px;
    }
    p {
      font-size: 14px;
      text-align: left;
      word-spacing: 1px;
    }
  }
  .profile {
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    justify-content: space-around;
    width: 100%;
    background-color: var(--color-bg-2);
    color: var(--natural-white);
    padding: 0.5rem 0;

    .user {
      display: inline-flex;
      gap: 0.4rem;
      img {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        border: 1px solid var(--natural-white);
        outline-offset: 3px;
      }
      span {
        text-decoration: underline;
      }
    }
    .Icons {
      font-size: 18px;
      padding: 0.1rem 0.5rem;
      border-radius: var(--border-radius);
      .icon {
        margin-right: 8px;
      }
      .icon-2 {
        color: red;
      }
    }
  }
`;
