import styled from "styled-components";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../ultContext/AuthContext";
import { useSnackbar } from "notistack";


const DeleteProject = ({ close }) => {
  const { userInfo, handleLogout } = userAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();


  const handleDelete = async (e) => {
   e.preventDefault();
   try{
    const res = await fetch(
      `https://trrmmy-5000.csb.app/project/deleteproject/${userInfo?._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );
    if (res.ok) {
      res.json().then((info) => {
        setTimeout(() => {
          enqueueSnackbar(`${info.message}`, {
            variant: "success",
          });
        }, 2000);
        
      });
    } else {
      res.json().then((info) => {
        setTimeout(() => {
          enqueueSnackbar(`${info.message}`, {
            variant: "error",
          });
        }, 2000);
      });
    }
    console.log("res", res);
   }catch(e){
    setTimeout(() => {
      enqueueSnackbar(`${e.message}`, {
        variant: "error",
      });
    }, 2000);
   } final
  };

  return (
    <>
      <Delete>
        <div className="logoutContent">
          <h3> Delete Project </h3>
          <p>{` ${userInfo?.username} delete by clicking the link below`}</p>
          <div className="btn-logout">
            <Button type="button" variant="primary" className="me-3" onClick={close}>
              Cancle
            </Button>
            <Button variant="danger" onClick={handleDelete}>
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
