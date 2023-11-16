import styled from "styled-components";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { userAuth } from "../ultContext/AuthContext";

const DeleteProject = ({ close }) => {
  const { userInfo, handleLogout } = userAuth();
  const navigate = useNavigate();

  const handleCancle = ({ close }) => {
    navigate("/app");
  };

  return (
    <>
      <Delete>
        <div className="logoutContent">
          <h3> Delete Project </h3>
          <p>{` ${userInfo?.username} delete by clicking the link below`}</p>
          <div className="btn-logout">
            <Button variant="primary" className="me-3" onClick={close}>
              Cancle
            </Button>
            <Button variant="danger" onClick={handleLogout}>
              Delete
            </Button>
          </div>
        </div>
      </Delete>
    </>
  );
};

export default DeleteProject;

const Delete = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--natural-white);
  text-align: center;
  padding: 0rem 1rem;
  position: absolute;
  z-index: 1000;
  inset: 0%;
  background-color: rgba(0, 0, 0, 0.3);

  border-radius: var(--border-radius);
  & > .logoutContent {
    padding: 1.5rem;
    background-color: var(--color-bg-2);
    letter-spacing: 1.4px;

    h3 {
      text-transform: uppercase;
      font-size: 25px;
      margin-bottom: 1rem;
    }
    p {
      margin-bottom: 1rem;
    }
  }
`;
