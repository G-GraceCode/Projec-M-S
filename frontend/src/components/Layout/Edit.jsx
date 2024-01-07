import styled from "styled-components";
import Navbar from "../Navbar";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import Editor from "../../components/Editor";
import { useSnackbar } from "notistack";
import AnimatedCircle from "../../AnimatedCircle";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [complete, setComplete] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [url, setUrl] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { id } = useParams();

  const editProject = async () => {
    try {
      const res = await fetch(`https://trrmmy-5000.csb.app/project/${id}`, {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
        },
        cors: "no-cors",
      });
      if (res.status === 200) {
        res.json().then((pro) => {
          setTitle(pro.title);
          setSummary(pro.summary);
          setCategory(pro.category);
          setContent(pro.content);
          setComplete(pro.comProject);
          setFromDate(pro.fromDate);
          setToDate(pro.toDate);
          setUrl(pro.projectUrl);
          setFiles(pro.coverImg);
        });
      }
    } catch (e) {}
  };

  useEffect(() => {
    editProject();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("category", category);
    data.set("content", content);
    data.set("comProject", complete);
    data.set("toDate", toDate);
    data.set("fromDate", fromDate);
    data.set("projectUrl", url);
    if (files) {
      data.set("file", files);
    }

    try {
      setLoading(true);
      const res = await fetch(
        `https://trrmmy-5000.csb.app/project/editproject/${id}`,
        {
          method: "PUT",
          body: data,
          // credentials: "include",
          cors: "no-cors",
        },
      );
      console.log("edit", res);
      if (res.status === 200) {
        res.json().then(() => {
          setRedirect(true);
          setTimeout(() => {
            enqueueSnackbar("Project updated successful", {
              variant: "success",
            });
          }, 2000);
        });
      }
    } catch (e) {
      enqueueSnackbar(e.message, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (redirect) {
    navigate("/project");
  }

  return (
    <div className="content">
      <Navbar />
      <Create>
        <Content>
          <div className="header">
            <Link to="/project" className="h2">
              <FaArrowLeftLong /> Edit Project
            </Link>
            <Link to="/home" className="logo">
              Publish
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
              <select
                id="category"
                value={category}
                onChange={(ev) => setCategory(ev.target.value)}
              >
                <option value="hide">Select a Category</option>
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
            </label>
            <label htmlFor="summary">
              Summarise your Project
              <input
                type="summary"
                name="summary"
                placeholder={
                  "Summary of the project, Please in 150 character words max"
                }
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
            <label htmlFor="url">
              Project URL Link
              <input
                type="url"
                name="url"
                placeholder={"Live project url Link"}
                value={url}
                onChange={(ev) => setUrl(ev.target.value)}
              />
            </label>
            <label htmlFor="content" className="editorLabel">
              <Editor
                value={content}
                name="content"
                onChange={setContent}
                className="editor"
              />
            </label>

            <label
              htmlFor="complete"
              className="d-flex align-items-center flex-row"
            >
              <input
                type="checkbox"
                name="radio"
                className="mx-2"
                onChange={() => setComplete(!complete)}
              />
              <span> I am currently working on this Project </span>
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
              <button
                type="button"
                style={{ marginTop: "5px", color: "var(--natural-white)" }}
                onClick={() => navigate("/project")}
              >
                Cancle
              </button>
              <button style={{ marginTop: "5px" }} onClick={handleUpdate}>
                {loading ? <>Publishing...</> : "Publish"}
              </button>
            </div>
          </form>
        </Content>
      </Create>
    </div>
  );
};

export default Edit;

const Create = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.2rem;
`;

const Content = styled.div`
  border-radius: var(--border-radius);
  background-color: var(--color-bg-2);
  padding: 1rem 0.6rem;
  width: 100%;
  height: 100%;
  .header {
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 0 0.5rem;
    .h2 {
      color: var(--natural-white);
      font-size: 18px;
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
      color: var(--natural-white);

      input {
        outline: none;
        border: 0.8px solid var(--color-bg);
        padding: 0.7rem;
      }
      .editor {
        background: white;
      }


      select {
        padding: 0.7rem;
        font-size: 12px;
        border: none;
        outline: none;
        appearance: none;
        border: 0.8px solid var(--color-bg);
  
        option {
          background-color: var(--natural-white);
        }
        option:selected {
          font-weight: bold;
        }
        &::-ms-expand {
          display: none;
        }
  
        &:hover {
          border-color: #ccc;
        }
  
        &:active {
          border-color: #bbb;
        }
      }
  
      select:hover {
        background-color: #ddd;
      }
    }
    }
    .editorLabel {
      color: var(--natural-black);
    }
    .btn {
      display: flex;
      // align-self: flex-end;
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
