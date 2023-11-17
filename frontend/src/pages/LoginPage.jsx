import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
import { useSnackbar } from "notistack";
import { Link, useNavigate, Navigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { userAuth } from "../ultContext/AuthContext";

const LoginPage = () => {
  const [userCridential, setUserCridentail] = useState({
    email: "",
    password: "",
  });
  const { setUserInfo } = userAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);

  const handleSuccess = () => {
    enqueueSnackbar("user Successfully Login", { variant: "success" });
  };

  const handleError = (err) => {
    enqueueSnackbar("Error Login", { variant: "error" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCridentail({ ...userCridential, [name]: value });
  };

  const Handler = async (e) => {
    e.preventDefault();

    try {
      const data = await fetch("https://7wvkdh-5000.csb.app/projec/user/auth", {
        method: "POST",
        body: JSON.stringify({ ...userCridential }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      // const { success, message } = res;
      console.log("data", data);
      if (data.ok) {
        data.json().then((user) => {
          console.log("succ", user);
          handleSuccess();
          setUserInfo(user);
          setRedirect(true);
          navigate("/app");
        });
      } else {
        handleError();
      }
    } catch (e) {
      console.log("bat", e.message);
    }

    setUserCridentail({
      email: "",
      password: "",
    });
  };

  if (redirect) {
    return <Navigate to="/app" />;
  }

  return (
    <form onSubmit={Handler}>
      <h1>Sign In</h1>
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

      <Button type="submit" variant="primary" className="mt-3">
        Sign In
      </Button>

      <Row className="py-3">
        <Col>
          New User? <Link to="/register">Register</Link>
        </Col>
      </Row>
    </form>
  );
};

export default LoginPage;
