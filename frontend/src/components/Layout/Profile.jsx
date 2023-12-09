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
import DeleteUser from "../../pages/DeleteUser";
import avatar from "../../assets/addAvatar.png";

const Profile = () => {
  const [userCredentail, setUserCredentail] = useState({
    username: "",
    email: "",
    password: "",
    profession: "",
    profile: "",
  });
  const [files, setFiles] = useState({});
  const [delet, setDelet] = useState("");
  const { userInfo, setUserInfo } = userAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { username, email, password, profession, profile } = userCredentail;

  const handleSuccess = () => {
    enqueueSnackbar("User Updated Successfully", { variant: "success" });
  };

  const handleError = () => {
    enqueueSnackbar("Error Login", { variant: "Error" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredentail({ ...userCredentail, [name]: value });
  };

  useEffect(() => {
    const getUser = async () => {
      try {
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
            setUserCredentail({
              ...userCredentail,
              username: user.username,
              email: user.email,
              profession: user.prof,
              profile: user.profile,
            });
          });
        }
      } catch (e) {
        console.log("Could Not Edit the User", e.message);
      }
    };
    getUser();
  }, [userInfo]);

  const HandleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("username", username);
    data.set("email", email);
    data.set("profession", profession);

    if (password) {
      data.set("password", password);
    }

    if (files) {
      data.set("file", files);
    }

    try {
      const res = await fetch(
        "https://trrmmy-5000.csb.app/projec/user/profile",
        {
          method: "PUT",
          body: data,
          credentials: "include",
          cors: "no-cors",
        },
      );
      if (res) {
        res.json().then((user) => {
          setUserInfo(user);
          handleSuccess();
          navigate("/profile");
        });
      } else {
        handleError();
      }
    } catch (e) {
      console.log("bat", e.message);
    }
  };

  return (
    <div className="content">
      <Navbar />
      <Edituser className="edituser">
        <Col className="image-replace">
          <div className="img-sec">
            <img
              src={profile ? `https://trrmmy-5000.csb.app/${profile}` : avatar}
              alt="avater"
            />
          </div>
          <Userinfo>
            <h4>John Doe</h4>
            <h6>A Full-stack-developer from usa</h6>
            <p className="bio">
              Bio:
              <span></span>
            </p>

            <div>
              Follow him on:
              <span>Linkedinedn</span>
              <span>Behance</span>
            </div>
          </Userinfo>
          <Link to="/edit">Edit profile</Link>
        </Col>
      </Edituser>
    </div>
  );
};

export default Profile;

const Edituser = styled.div`
  
  margin: 0 auto;
  color: var(--natural-white);
  width: min(calc(100% - 40%), 50%);
  background: var(--color-bg-2);
  padding: 1rem 1.5rem;
  gap: 1.2rem;
  border-radius: var(--border-radius);

 .image-replace {
background-color: red;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  background-color: transparent !important;
  color: var(--natural-white);
  border: none;
  margin: 0 auto;
  padding: 1rem 0rem;
  position: relative;
    .img-sec{
    width: 120px;
    height: 120px;
    overflow: hidden;
    border: 1px solid var(--color-bg);
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

`;

const Userinfo = styled.div`
  h4 {
    font-size: 30px;
    letter-spacing: 0.5px;
    font-weight: 600;
  }
  h6 {
    font-size: 16px;
  }
`;
