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
  const { user } = userAuth();
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
    axios
      .get(`https://dtv62c-5000.csb.app/projec/user/profile`, {
        withCredentials: true,
      })
      .then(({ data }) => {
        const { provedUser } = data;
        setUserCridentail({
          ...userCridential,
          username: provedUser.user.username,
          email: provedUser.user.email,
        });
        console.log("res", data);
      })
      .catch((e) => {
        console.log("Could Not Edit the User", e.message);
      });
  }, []);

  const HandleUpdate = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        "https://dtv62c-5000.csb.app/projec/user/profile",
        { ...userCridential },
        { withCredentials: true },
      );

      // const { success, message } = res;
      console.log("data", data);
      if (data) {
        handleSuccess();
        navigate("/profile");
      } else {
        handleError();
      }
    } catch (e) {
      console.log("bat", e.message);
    }

    console.log("cri", userCridential);
    // setUserCridentail({
    //   username: "",
    //   email: "",
    //   password: "",
    // });
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
