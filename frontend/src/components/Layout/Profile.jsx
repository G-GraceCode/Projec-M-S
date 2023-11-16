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

const Profile = () => {
  const [userCridential, setUserCridentail] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { userInfo, setUserInfo } = userAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSuccess = () => {
    enqueueSnackbar("User Updated Successfully", { variant: "success" });
  };

  const handleError = () => {
    enqueueSnackbar("Error Login", { variant: "Error" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCridentail({ ...userCridential, [name]: value });
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(
          "https://tnmwcq-5000.csb.app/projec/user/profile",
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
            setUserCridentail({
              ...userCridential,
              username: user.username,
              email: user.email,
            });
          });
        }
      } catch (e) {
        console.log("Could Not Edit the User", e.message);
      }
    };
    getUser();
  }, []);

  const HandleUpdate = async (e) => {
    e.preventDefault();
    // const data = new FormData();
    // data.set("username", userCridential.username);
    // data.set("email", userCridential.email);
    // data.set("password", userCridential.password);

    try {
      const res = await fetch(
        "https://dtv62c-5000.csb.app/projec/user/profile",
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(userCridential),
        },
      );

      // const { success, message } = res;
      if (res) {
        res.json().then((user) => {
          console.log("res", user);

          // setUserInfo(user);
          // handleSuccess();
          // navigate("/profile");
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
              value={userCridential.username}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter Email"
              value={userCridential.email}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="password">
            <Form.Label>password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={userCridential.password}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3 btn">
            Cancle
          </Button>
          <Button type="submit" variant="primary" className="mt-3">
            Save Changes
          </Button>
        </form>
      </Edituser>
    </div>
  );
};

export default Profile;

const Edituser = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
