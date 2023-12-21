import styled from "styled-components";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import Editor from "../components/Editor";
import { useSnackbar } from "notistack";
import AnimatedCircle from "../AnimatedCircle";

const CreateProject = ({ close }) => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [complete, setComplete] = useState(true);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [files, setFiles] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSuccess = () => {
    enqueueSnackbar("new Project created", { variant: "success" });
  };

  const handleError = () => {
    enqueueSnackbar("Failed Project not created", { variant: "error" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("category", category);
    data.set("content", content);
    data.set("comProject", complete);
    data.set("toDate", toDate);
    data.set("fromDate", fromDate);
    data.set("file", files);

    try {
      const res = await fetch("https://trrmmy-5000.csb.app/project/create", {
        method: "POST",
        body: data,
        credentials: "include",
        cors: "no-cors",
      });

      if (res.ok) {
        setLoading(false);
        setTimeout(() => {
          handleSuccess();
        }, 1500);
        return;
      } else {
        setLoading(false);
        setTimeout(() => {
          handleError();
        }, 1500);
      }
    } catch (e) {
      console.log("message", e);
    } finally {
      navigate("/app");
    }
  };

  return (
    <Create>
      <Content style={{ right: `${close ? "-100%" : "0"}` }}>
        <div className="header">
          <h2>
            <FaArrowLeftLong onClick={close} /> Create Project
          </h2>
          <Link to="/home" className="logo">
            Projec
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">
            Title
            <input
              type="title"
              name="title"
              placeholder={"Title"}
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
            />
          </label>
          <label htmlFor="category">
            Project Category
            <input
              type="category"
              name="category"
              placeholder={"Example, Graphic design, UI/UX Design"}
              value={category}
              onChange={(ev) => setCategory(ev.target.value)}
            />
          </label>
          <label htmlFor="summary">
            Summarise your Project
            <input
              type="summary"
              name="summary"
              placeholder={"Summary of the project"}
              value={summary}
              onChange={(ev) => setSummary(ev.target.value)}
            />
          </label>
          <label htmlFor="file">
            Cover Image
            <input
              type="file"
              onChange={(ev) => setFiles(ev.target.files[0])}
            />
          </label>
          <label htmlFor="content">
            <Editor value={content} name="content" onChange={setContent} />
          </label>
          <label htmlFor="complete">
            <input
              type="checkbox"
              name="radio"
              className="mx-2"
              onChange={() => setComplete(!complete)}
            />
            I am currently working on this Projec
          </label>

          <label htmlFor="date">
            <p>
              <span>
                Start Date
                <input
                  type="date"
                  name="from"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </span>
              <span className="ml-2">
                Ended
                <input
                  disabled={complete === false}
                  type="date"
                  name="to"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </span>
            </p>
          </label>

          <div className="btn">
            <button type="button" style={{ marginTop: "5px" }} onClick={close}>
              Cancle
            </button>
            <button
              disabled={!title || !category || !summary || !content}
              type="submit"
              style={{ marginTop: "5px" }}
            >
              {loading ? "Creating..." : "Create Project"}
            </button>
          </div>
        </form>
      </Content>
    </Create>
  );
};

export default CreateProject;

const Create = styled.div`
  position: absolute;
  left: 0%;
  bottom: 0%;
  top: 0%;
  right: 0%;
  transition: right var(--transition);
  z-index: 1001;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Content = styled.div`
  border-radius: var(--border-radius) 0 0 var(--border-radius);
  background-color: var(--natural-white);
  margin-left: 0rem;
  width: 90%;
  height: 100%;
  padding: 2rem;
  overflow-y: scroll;

  .header {
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 0 0.5rem;
    h2 {
      font-size: 20px;
    }
    .logo {
      text-decoration: none;
      font-size: 30px;
      color: var(--color-green);
      font-weight: 600;
    }
  }
  form {
    display: flex;
    align-items: flex-start;
    flex-flow: column nowrap;
    row-gap: 1rem;
    width: 100%;
    padding: 2rem;
    label {
      display: flex;
      flex-flow: column nowrap;
      flex: 1;
      width: inherit;
      input {
        outline: none;
        border: 0.8px solid var(--color-bg);
        padding: 0.7rem;
        border-radius: 5px;
      }
      &:nth-child(06) {
        display: flex;
        flex-flow: row nowrap;
      }
    }
    .btn {
      display: flex;
      align-self: flex-end;
      button {
        padding: 0.5rem 1.3rem;
        outline: none;
        border-radius: 10px;
      }
      & > button:first-child {
        margin-right: 0.4rem;
        background: transparent;
        border: 1px solid var(--color-green);
      }
      & > button:nth-child(2) {
        background: var(--color-green);
        color: var(--natural-white);
      }
    }
  }

  @media (max-width: 769px) {
    width: 100%;
    padding: 1rem;

    form {
      padding: 1rem;
    }
  }
`;
