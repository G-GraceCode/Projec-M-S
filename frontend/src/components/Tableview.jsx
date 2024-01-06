import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import AnimatedCircle from "../AnimatedCircle";
import { userAuth } from "../ultContext/AuthContext";
import { IoIosArrowBack } from "react-icons/io";
import DeleteProject from "../pages/DeleteProject";

const Tableview = ({ posts, loading, show, result, goBack }) => {
  const navigate = useNavigate();
  const [delet, setDelet] = useState("");
  const { userInfo } = userAuth();
  const [deleteProjectId, setDeleteProjectId] = useState(null);

  return (
    <>
      {delet && (
        <DeleteProject
          close={() => {
            setDelet(""), goBack();
          }}
          projectId={deleteProjectId}
        />
      )}
    
    <Tablecontent>
      {result.length > 0 && (
        <h5 className="text-white mx-2 my-3 cursor-pointer">
          <IoIosArrowBack onClick={goBack} /> {`Search Result for: ${result}`}
        </h5>
      )}
      {loading ? (
        <AnimatedCircle />
      ) : !posts ? (
        <h4> No Project Created</h4>
      ) : (
        <Table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Title</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Category
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                created Date
              </th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr className="h-8" key={post._id}>
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td
                  className="border border-slate-700 rounded-md text-left"
                  onClick={() => navigate("/viewing")}
                >
                  {post.title}
                </td>
                <td className="border border-slate-700 rounded-md text-left max-md:hidden">
                  {post.category}
                </td>
                <td className="border border-slate-700 rounded-md text-left max-md:hidden">
                  {new Date(post.createdAt).toDateString()}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {userInfo?._id === post.author._id ? (
                    <div className="flex justify-center gap-x-4">
                      <Link to={`/editproject/${post._id}`}>
                        <FiEdit className="text-2xl text-yellow" />
                      </Link>

                      <AiFillDelete
                        className="text-2xl text-red"
                        onClick={() => {
                          setDelet("active"), setDeleteProjectId(post._id);
                        }}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    
    </Tablecontent>

    </>
  );
};

export default Tableview;

const Tablecontent = styled.div`
  width: 85%;
  margin: 0 auto;
  align-items: center;
  z-index: 1;
`;
