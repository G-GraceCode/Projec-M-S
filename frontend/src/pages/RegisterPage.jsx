import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
// import FormContainer from "../components/FormContainer";
import axios from "axios";
import { useSnackbar } from "notistack";
// import { ToastContainer, toast } from "react-toastify";

const RegisterPage = () => {
  const [userCredentail, setUserCredentail] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { username, email, password } = userCredentail;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredentail({ ...userCredentail, [name]: value });
  };

  const handleSuccess = () => {
    enqueueSnackbar("user Successfully Login", { variant: "success" });
  };

  const handleError = (err) => {
    enqueueSnackbar("Error Login", { variant: "Error" });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://dtv62c-5000.csb.app/projec/user/register",
        { ...userCredentail },
        { withCredentials: true },
      );

      console.log("result", res.data);

      if (res.data) {
        handleSuccess();
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (e) {
      console.log("bat", e);
    }
    setUserCredentail({
      ...userCredentail,
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <form onSubmit={submitHandler}>
      <h1>Sign Up</h1>
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

      <Button
        disabled={!username || !email || !password}
        type="submit"
        variant="primary"
        className="mt-3"
      >
        Sign Up
      </Button>

      <Row className="py-3">
        <Col>
          Already a User? <Link to="/login">Login</Link>
        </Col>
      </Row>
    </form>
  );
};

export default RegisterPage;
