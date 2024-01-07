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
import AnimatedCircle from "../../AnimatedCircle";

const Setting = () => {
  const [userCredentail, setUserCredentail] = useState({
    username: "",
    email: "",
    password: "",
    profession: "",
    profile: "",
    folioLink: "",
    bio: "",
    linkedin: "",
    behance: "",
  });
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState({});
  const [delet, setDelet] = useState("");
  const { userInfo, setUserInfo } = userAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const {
    username,
    email,
    password,
    profession,
    profile,
    bio,
    linkedin,
    behance,
    folioLink,
  } = userCredentail;

  const handleSuccess = () => {
    enqueueSnackbar("user edited", { variant: "success" });
  };

  const handleError = () => {
    enqueueSnackbar(`${error}`, { variant: "Error" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredentail({ ...userCredentail, [name]: value });
  };

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
            setUserCredentail({
              ...userCredentail,
              username: user.username,
              email: user.email,
              profession: user.prof,
              profile: user.profile,
              bio: user.bio,
              linkedin: user.linkedin,
              behance: user.behance,
              folioLink: user.folioLink
            });
          });
        }
      } catch (e) {
        handleError(e.message);
        console.log("Could Not Edit the User", e.message);
      } finally {
        setLoading(false);
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
    data.set("bio", bio);
    data.set("folioLink", folioLink);
    data.set("linkedin", linkedin);
    data.set("behance", behance);

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
      console.log("edit", res);
      if (res) {
        res.json().then((user) => {
          setUserInfo(user);
          handleSuccess();
          navigate("/setting");
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
          <label className="card" htmlFor="file">
            <div className="img-sec">
              {loading ? (
                <AnimatedCircle />
              ) : profile === "" ? (
                <div className="w-100 h-100 bg-success d-flex align-items-center justify-content-center text-uppercase font-weight-bold">
                  <h3>{username[0]}</h3>
                </div>
              ) : (
                <img src={profile ? profile : avatar} alt="avater" />
              )}
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
        <form className="form" onSubmit={HandleUpdate}>
          <h3>Update Your Info</h3>
          <Form.Group className="my-2 w-100%" controlId="username">
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter Name"
              value={username}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="email">
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter Email"
              value={email}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="profession">
            <select
              id="category"
              class="form-select"
              aria-label="Disabled select example"
              value={profession}
              onChange={handleChange}
            >
              <option selected>Select a Category</option>
              <option value="Graphic design">Graphic design</option>
              <option value="UX Design">UX Design</option>
              <option value="Web Design">Web Design</option>
              <option value="Web development">Web development</option>
              <option value="App development">App development</option>
              <option value="Full Stack Developement">
                Full Stack development
              </option>
              <option value="Web3">Web3</option>
            </select>
          </Form.Group>

          <Form.Group className="my-2 bio" controlId="bio">
            <Form.Label>Bio: </Form.Label>
            <textarea
              className="textArea"
              name="bio"
              value={bio}
              onChange={handleChange}
              placeholder="Write about you in 150 character word"
            ></textarea>
          </Form.Group>

          <Form.Group className="my-2" controlId="folioLink">
            <Form.Control
              type="text"
              name="folioLink"
              placeholder="Enter portfolio or website link"
              value={folioLink}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="linkedin">
            <Form.Label>Add Social Media Profiles Links:</Form.Label>
            <Form.Control
              type="text"
              name="linkedin"
              value={linkedin}
              onChange={handleChange}
              placeholder="Enter Linkedin profile link"
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="behance">
            <Form.Control
              type="text"
              name="behance"
              value={behance}
              onChange={handleChange}
              placeholder="Enter Behance profile link"
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="password">
            <Form.Label>password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Button
            disabled={!username || !email || !password}
            type="submit"
            variant="success"
            className="mt-3 mx-2"
          >
            {loading ? "Saving" : "Save Changes"}
          </Button>
        </form>
      </Edituser>
      <DeletetUser className="my-3 delet" onClick={() => setDelet("active")}>
        Delete Accout
      </DeletetUser>

      {delet && <DeleteUser close={() => setDelet("")} />}
    </div>
  );
};

export default Setting;

const Edituser = styled.div`
  display: grid;
  grid-template-columns: minmax(min(300px), 1fr) minmax(min(300px), 1fr);
  justify-content: center;
  align-items: center;
  // flex-flow: row wrap;
  margin: 0 auto;
  color: var(--natural-white);
  width: fit-content;
  background: var(--color-bg-2);
  padding: 1.5rem;
  gap: 1.2rem;
  border-radius: var(--border-radius);
    border: 2px dashed var(--natural-white);

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
    border: 2px solid var(--color-sec);
    border-radius: 50%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    outline-offset: 2px;
    font-size: 25px;
    color: var(--color-bg-2);
    
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

  .form {
    width: 100%;
    background-color: red;
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
