import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
// import FormContainer from "../components/FormContainer";
// import axios from "axios";
import { useSnackbar } from "notistack";

const RegisterPage = () => {
  const [userCredentail, setUserCredentail] = useState({
    username: "",
    email: "",
    profession: "",
    password: "",
  });

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { username, email, password, profession } = userCredentail;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredentail({ ...userCredentail, [name]: value });
  };

  const handleSuccess = () => {
    enqueueSnackbar("user Successfully Login", { variant: "success" });
  };

  const handleError = () => {
    enqueueSnackbar("Error Login", { variant: "error" });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const data = await fetch(
        "https://trrmmy-5000.csb.app/projec/user/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...userCredentail }),
          // credentials: "include",
        },
      );
      console.log("data", data.json().then(), data);
      if (data.status === 201) {
        handleSuccess();
        navigate("/login");
      } else {
        handleError();
      }
    } catch (e) {
      console.log("message Error", e.message, e);
    }
    setUserCredentail({
      ...userCredentail,
      username: "",
      email: "",
      password: "",
      profession: "",
    });
  };

  return (
    <form
      onSubmit={submitHandler}
      className="d-flex align-items-center justify-content-md-center mt-5"
    >
      <Col xs={12} md={6} className="card p-5">
        <h1 className="text-center">Sign Up</h1>
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

          <select
            id="category"
            class="form-select"
            aria-label="Default select example"
            name="profession"
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
          // variant="primary"
          className="mt-3"
          style={{ backgroundColor: "var(--color-bg-2)" }}
        >
          Sign Up
        </Button>

        <Row className="py-3">
          <Col>
            Already a User? <Link to="/login">Login</Link>
          </Col>
        </Row>
        <Row className="py-3">
          <Col>
            <Link to="/">
              {" "}
              <FaArrowLeftLong /> Back
            </Link>
          </Col>
        </Row>
      </Col>
    </form>
  );
};

export default RegisterPage;
