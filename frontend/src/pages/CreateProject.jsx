import styled from "styled-components";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import Editor from "../components/Editor";

const CreateProject = ({ close }) => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [complete, setComplete] = useState("");
  const [files, setFiles] = useState("");

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
        <form>
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
            <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
          </label>
          <label htmlFor="content">
            <Editor value={content} name="content" onChange={setContent} />
          </label>
          <label htmlFor="complete">
            Choose whether your is a complete project or it a new Project
            <p>
              Complete Project
              <input
                type="radio"
                name="radio"
                value={"complete"}
                onChange={(e) => setComplete(e.target.value)}
              />
              New Project
              <input
                type="radio"
                name="radio"
                value={"New"}
                onChange={(e) => setComplete(e.target.value)}
              />
            </p>
          </label>

          <label htmlFor="date">
            {complete === "complete" ? (
              <p>
                <span>sset start and End Date of the Project</span>
                Started <input type="date" name="from" />
                Ended <input type="date" name="to" />
              </p>
            ) : complete === "New" ? (
              <p>
                <span>set start only of the Project</span>
                <input type="date" name="to" />
              </p>
            ) : (
              ""
            )}
          </label>

          <div className="btn">
            <button style={{ marginTop: "5px" }} onClick={close}>
              Cancle
            </button>
            <button style={{ marginTop: "5px" }}>Create Project</button>
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
`;
