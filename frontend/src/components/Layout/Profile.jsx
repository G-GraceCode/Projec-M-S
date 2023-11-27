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

const Profile = () => {
  const [userCredentail, setUserCredentail] = useState({
    username: "",
    email: "",
    password: "",
    profession: "",
  });
  const [delet, setDelet] = useState("");
  const { userInfo, setUserInfo } = userAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { username, email, password, profession } = userCredentail;
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
            setUserCredentail({
              ...userCredentail,
              username: user.username,
              email: user.email,
              profession: user.prof,
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
    try {
      const res = await fetch(
        "https://trrmmy-5000.csb.app/projec/user/profile",
        {
          method: "PUT",
          body: JSON.stringify({ ...userCredentail }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          cors: "no-cors",
        },
      );
      console.log("respon", res);
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
          <Card className="card">
            <div className="img-sec">
              <img src="" alt="" />
            </div>

            <Row className="row">
              <input
                type="file"
                // onChange={(ev) => setFiles(ev.target.files[0])}
              />
              <p>Replace Image</p>
            </Row>
          </Card>
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
          <Button type="submit" ariant="success" className="mt-3">
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
  flex-flow: row wrap;
  margin: 0 auto;
  color: var(--natural-white);
  width: max(600px, 350px);
  background: var(--color-bg-2);
  padding: 1.5rem;
  gap: 1.2rem;


 .image-replace{
  display: flex;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  text-align: center;
  & > .card{
    background-color: transparent !important;
    color: var(--natural-white);
    border: 1px solid var(--natural-white);
    padding: 1rem 0rem;
    .img-sec{
    width: 100px;
    height: 100px;
    background-color: red;
      border-radius: 50%;
      margin: 0 auto;
  }
  .row{
    margin-top: 1.5rem;
    
    input[type="file"]{
    color: red;
    background-color: blue !important;
    // display: none;

    }

    & > &input#file-upload-button{
      color: red !important;
      background-color: blue !important:
      display: none;
      
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
  width: 32%;
  cursor: pointer;
  border-radius: var(--border-radius);
`;
