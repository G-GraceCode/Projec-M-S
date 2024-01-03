import { useState, useEffect } from "react";
import styled from "styled-components";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { userAuth } from "../ultContext/AuthContext";
import { useSnackbar } from "notistack";
import { CiShare1 } from "react-icons/ci";
import avatar from "../assets/addAvatar.png";
import instagrm from "../assets/instagrm.png";
import linke from "../assets/linkedin.png";
import { IoCloseSharp } from "react-icons/io5";

const AuserProfile = ({ username, profession, close }) => {
  const [loading, setLoading] = useState(false);

  const { userInfo, handleLogout } = userAuth();

  return (
    <>
      <User className="edituser">
        <div className="image-replace">
          <div className="img-sec">
            {loading ? (
              ""
            ) : //   <AnimatedCircle />
            true ? (
              <div className="w-100 h-100 bg-success d-flex align-items-center justify-content-center text-uppercase font-weight-bold">
                <span className="text-bold">Y</span>
              </div>
            ) : (
              <img src={avatar} alt="avater" />
            )}
          </div>
          <Userinfo>
            <h4>{username}</h4>
            <h6>{profession}</h6>
            <p className="bio">bio</p>
            <p>
              Link to site:{" "}
              <a href="folioLink" target="_blank">
                folioLink <CiShare1 />
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
          <p onClick={close} className="edit">
            <IoCloseSharp className="icon" />
          </p>
        </div>
      </User>
    </>
  );
};

export default AuserProfile;

// const User = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: var(--natural-white);
//   text-align: center;
//   padding: 0rem 1rem;
//   position: fixed;
//   z-index: 1000;
//   inset: 0%;
//   background-color: rgba(0, 0, 0, 0.3);

//   border-radius: var(--border-radius);
//   & > .logoutContent {
//     padding: 1.5rem;
//     background-color: var(--color-bg-2);
//     letter-spacing: 1.4px;
//     width: max(300px, 350px);
//     border-radius: 10px;

//     h3 {
//       text-transform: uppercase;
//       font-size: 25px;
//       margin-bottom: 1rem;
//     }
//     p {
//       margin-bottom: 1rem;
//     }
//   }
// `;

const User = styled.div`

  margin: 0 auto;
  border-radius: 10px 10px 0 0;
  color: var(--natural-white);
  padding: .7rem;
  gap: 1.2rem;
  box-shadow: 0px 4px 8px 2px rgba(0, 0, 0, 0.2);
  padding: 0rem 1rem;
  position: fixed;
  z-index: 1000;
  inset: 0%;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;

 .image-replace {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.6rem;
  background-color: var(--color-bg-2);
  color: var(--natural-white);
  border: none;
  margin: 0 auto;
  padding: 1.5rem;
  position: relative;
  width: fit-content;
  min-height: 300px;
  border-radius: 10px;


    .img-sec{
    display: flex;
    justify-content:center;
    align-items: center;
    width: 100px;
    height: 100px;
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
    color: var(--natural-white);
    font-size: 16px;
  }

  @media screen and (max-width: 599px){
    .image-replace {
text-align:  center;
    }
  }
`;

const Userinfo = styled.div`
text-align: left !important;

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
    align-items: center;

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
