import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import styled from "styled-components";
import { Form, Button, Row, Col } from "react-bootstrap";
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
          console.log("res", user);

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

        <DeletetUser className="my-3" onClick={() => setDelet("active")}>
          Delete Accout
        </DeletetUser>

        {delet && <DeleteUser close={() => setDelet("")} />}
      </Edituser>
    </div>
  );
};

export default Profile;

const Edituser = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  color: var(--natural-white);

  & form {
    background: var(--color-bg-2);
    padding: 1.5rem;
    margin-top: 1rem;
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
