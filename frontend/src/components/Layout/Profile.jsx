import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import styled from "styled-components";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
// import FormContainer from "../components/FormContainer";
import { userAuth } from "../../ultContext/AuthContext";
import { FiEdit } from "react-icons/fi";
import DeleteUser from "../../pages/DeleteUser";
import avatar from "../../assets/addAvatar.png";
import Posts from "../Posts";
import linke from "../../assets/linkedin.png";
import instagrm from "../../assets/instagrm.png";
import { CiShare1 } from "react-icons/ci";
import AnimatedCircle from "../../AnimatedCircle";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { userInfo, setUserInfo } = userAuth();
  const { enqueueSnackbar } = useSnackbar();

  const { username, profession, profile, bio, linkedin, behance, folioLink } =
    userInfo;

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://trrmmy-5000.csb.app/projec/user/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );
        if (res.ok) {
          res.json().then((user) => {
            console.log("user", user);
            setUserInfo({
              ...userInfo,
              username: user.username,
              email: user.email,
              profession: user.prof,
              profile: user.profile,
              bio: user.bio,
              linkedin: user.linkedin,
              behance: user.behance,
              folioLink: user.folioLink,
            });
          });
        }
      } catch (e) {
        console.log("Could Not Edit the User", e.message);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  return (
    <div className="content">
      <Navbar />
      <Userprofile className="edituser">
        <Col className="image-replace">
          <div className="img-sec">
            {loading ? (
              <AnimatedCircle />
            ) : profile === "" ? (
              <div className="w-100 h-100 bg-success d-flex align-items-center justify-content-center text-uppercase font-weight-bold">
                <span className="text-bold">
                  {!username ? "" : username[0]}
                </span>
              </div>
            ) : (
              <img src={profile} alt="avater" />
            )}
          </div>
          <Userinfo>
            <h4>{username}</h4>
            <h6>{profession}</h6>
            <p className="bio">{bio}</p>
            <p>
              Link to site:{" "}
              <a href={folioLink} target="_blank">
                {folioLink} <CiShare1 />
              </a>
            </p>
            <div className="social">
              <p className="mb-2"> Follow him on: </p>

              <div className="social-img">
                <span>
                  <img src={linke} />
                </span>
                <span>
                  <img src={instagrm} />
                </span>
              </div>
            </div>
          </Userinfo>
          <Link to="/setting" className="edit">
            <FiEdit className="icon" /> Edit
          </Link>
        </Col>
      </Userprofile>
      <Posts />
    </div>
  );
};

export default Profile;

const Userprofile = styled.div`
  
  margin: 0 auto;
  width: 69%;
  border-radius: 10px 10px 0 0;
  color: var(--natural-white);
  background-color: var(--color-bg-2);
  padding: .7rem;
  gap: 1.2rem;
  border-bottom: 2px dashed var(--natural-white);
  box-shadow: 0px 4px 8px 2px rgba(0, 0, 0, 0.2);

 .image-replace {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.6rem;
  background-color: transparent !important;
  color: var(--natural-white);
  border: none;
  // margin: 0 auto;
  padding: 1rem 0rem;
  position: relative;

    .img-sec{
    display: flex;
    justify-content:center;
    align-items: center;
    align-self: flex-start;
    width: 120px;
    height: 120px;
    overflow: hidden;
    border: 2px double var(--natural-white);
    outline-offset: 2px;
    border-radius: 50%;
    cursor: pointer;
    
    img{
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
    }
  }

  div span{
    font-size: 25px;
  }
  
  .edit {
    position: absolute;
    top: 5%;
    right: 3.5%;
  }

  @media screen and (max-width: 599px){
    .image-replace {
text-align:  center;
    }
  }
`;

const Userinfo = styled.div`
  width: 50%;

  @media screen and (max-width: 599px), (max-width: 769px){   
    text-align: center !important;
    width: 100% !important;
    h4{
      font-size: 32px;
    }
    .social {
      align-items: center;
      justify-content: center;
    }
  }


  h4 {
    font-size: 30px;
    letter-spacing: 0.5px;
    font-weight: 600;
  }
  h6 {
    font-size: 10px;
    margin-top: -6px;
  }
  .bio {
    font-size: 12px;
    word-spacing: 0.3px;
    letter-spaing: 0.4px;
    margin: 0.7rem 0;
    padding-left: 4px;
    &:fistletter {
      text-transform: uppercase;
      font-size: 13px;
    }
  }

  .social {
    display: flex;
    flex-direction: column;

    .social-img{
      display: flex;
      span{
        display: flex;
        width: 30px;
        height: 30px;
        overflow: hidden;
        border: 2px double var(--natural-white);
        outline-offset: 2px;
        border-radius: 50%;
        cursor: pointer;
        margin-right: 6px;
        
        img{
          display: block;
          width: 100%;
          object-fit: cover;
          object-position: center center;
        }
      
    }
  }

  
`;
