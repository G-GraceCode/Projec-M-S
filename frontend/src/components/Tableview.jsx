import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import AnimatedCircle from "../AnimatedCircle";

const BookTable = ({ posts, loading, show }) => {
  const navigate = useNavigate();

  return (
    <>
      {" "}
      {loading ? (
        <AnimatedCircle />
      ) : (
        <Table
          className="w-full border-separate border-spacing-2"
          striped
          bordered
          hover
        >
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
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/editproject/${post._id}`}>
                      <FiEdit className="text-2xl text-yellow" />
                    </Link>
                    <Link to={``}>
                      <AiFillDelete
                        className="text-2xl text-red"
                        onClick={show}
                      />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default BookTable;
