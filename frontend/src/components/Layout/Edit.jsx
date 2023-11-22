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
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { id } = useParams();

  const editProject = async () => {
    try {
      const res = await fetch(`https://7wvkdh-5000.csb.app/project/${id}`, {
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
    // data.set("complete", complete);
    if (files) {
      data.set("file", files);
    }

    try {
      setLoading(true);
      const res = await fetch(
        `https://7wvkdh-5000.csb.app/project/editproject/${id}`,
        {
          method: "PUT",
          body: data,
          // credentials: "include",
          cors: "no-cors",
        },
      );
      if (res.status === 200) {
        res.json().then((pro) => {
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
            <label htmlFor="content" className="editorLabel">
              Write more about your project
              <Editor
                value={content}
                name="content"
                onChange={setContent}
                className="editor"
              />
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
              <button
                type="button"
                style={{ marginTop: "5px" }}
                onClick={() => navigate("/project")}
              >
                Cancle
              </button>
              <button style={{ marginTop: "5px" }} onClick={handleUpdate}>
                {loading ? (
                  <>
                    <AnimatedCircle /> Publishing...
                  </>
                ) : (
                  "Publish"
                )}
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
