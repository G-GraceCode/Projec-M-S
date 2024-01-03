import styled from "styled-components";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../ultContext/AuthContext";
import { useSnackbar } from "notistack";

const AuserProfile = () => {
  const { userInfo, handleLogout } = userAuth();

  return (
    <>
      <User>
        <div className="logoutContent">
          <h3> Delete Project </h3>
          <p>{` ${userInfo?.username} delete by clicking the link below`}</p>
          <div className="btn-logout">
            <Button
              type="button"
              variant="primary"
              className="me-3"
            >
              Cancle
            </Button>
            <Button variant="danger">
              Delete
            </Button>
          </div>
        </div>
      </User>
    </>
  );
};

export default AuserProfile;

const User = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--natural-white);
  text-align: center;
  padding: 0rem 1rem;
  position: fixed;
  z-index: 1000;
  inset: 0%;
  background-color: rgba(0, 0, 0, 0.3);

  border-radius: var(--border-radius);
  & > .logoutContent {
    padding: 1.5rem;
    background-color: var(--color-bg-2);
    letter-spacing: 1.4px;
    width: max(300px, 350px);
    border-radius: 10px;

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
