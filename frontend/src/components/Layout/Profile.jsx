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
      <Edituser>
        <Col className="image-replace">
          <label className="card" htmlFor="file">
            <div className="img-sec">
              <img
                src={
                  profile ? `https://trrmmy-5000.csb.app/${profile}` : avatar
                }
                alt="avater"
              />
            </div>

            <Row className="row">
              <input
                type="file"
                name="file"
                id="file"
                onChange={(e) => setFiles(e.target.files[0])}
              />
              <label htmlFor="file" className="file-input">
                Replace Image
              </label>
            </Row>
          </label>
        </Col>
        <form onSubmit={HandleUpdate}>
          <h1>Update Your Info</h1>
          <Form.Group className="my-2" controlId="username">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter Name"
              value={username}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter Email"
              value={email}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="profession">
            <Form.Label>Profession</Form.Label>
            <Form.Control
              type="profession"
              name="profession"
              placeholder="Enter profession"
              value={profession}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="password">
            <Form.Label>password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Button type="button" variant="primary" className="mt-3 btn">
            Cancle
          </Button>
          <Button type="submit" variant="success" className="mt-3 mx-2">
            Save Changes
          </Button>
        </form>
      </Edituser>
      <DeletetUser className="my-3" onClick={() => setDelet("active")}>
        Delete Accout
      </DeletetUser>

      {delet && <DeleteUser close={() => setDelet("")} />}
    </div>
  );
};

export default Profile;

const Edituser = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: wrap;
  margin: 0 auto;
  color: var(--natural-white);
  width: max(600px, 350px);
  background: var(--color-bg-2);
  padding: 1.5rem;
  gap: 1.2rem;
  border-radius: var(--border-radius);

 .image-replace {

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  & > .card{
    background-color: transparent !important;
    color: var(--natural-white);
    border: none;
    padding: 1rem 0rem;
    .img-sec{
    width: 120px;
    height: 120px;
    overflow: hidden;
    border: 1px solid var(--color-bg);
    border-radius: 50%;
    margin: 0 auto;
    cursor: pointer;
    img{
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      // object-position: center center;
    }
  }
  .row {
    margin-top: 1.5rem;
    
    input[type="file"]{
    text-align:center;
    width: 100px;
    margin: 0 auto;

    }  

    input[type="file"]::file-selector-button{
      display: none;
      color: red !important;
      background-color: blue !important:
    }

   .file-input{
    background-color: var(--natural-white);
    color: var(--color-bg-2);
    padding: .4rem .7rem;
    cursor: pointer;
    border-radius: 15px;
    font-size: 14px;
    margin: 0 auto;
    }
  }
 
 }

  & form {
    // margin-top: 1rem;
    border-radius: var(--border-radius);
    .btn {
      margin-right: 0.5rem;
    }
  }
`;

const DeletetUser = styled.div`
  background: red;
  padding: 0.5rem 1.5rem;
  width: min(40%, 25%);
  cursor: pointer;
  border-radius: var(--border-radius);
  margin: 0 auto;
  color: var(--natural-white);
`;
