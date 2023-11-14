import styled from "styled-components";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import Editor from "../components/Editor";

const CreateProject = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");

  return (
    <Create>
      <Content>
        <div className="header">
          <h2>
            <FaArrowLeftLong /> Create Project
          </h2>
          <Link to="/home" className="logo">
            Projec
          </Link>
        </div>
        <form>
          <input
            type="title"
            placeholder={"Title"}
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
          <input
            type="summary"
            placeholder={"Summary"}
            value={summary}
            onChange={(ev) => setSummary(ev.target.value)}
          />
          <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
          <Editor value={content} onChange={setContent} />
          <button style={{ marginTop: "5px" }}>Create Project</button>
        </form>
      </Content>
    </Create>
  );
};

export default CreateProject;

const Create = styled.div`
  position: absolute;
  // inset: 0%; //the correct value

  left: -100%;
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
`;
