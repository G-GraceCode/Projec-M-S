import React from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";

const BookTable = () => {
  return (
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
        <tr className="h-8">
          <td className="border border-slate-700 rounded-md text-center">1</td>
          <td className="border border-slate-700 rounded-md text-left">
            How I Design My first UX
          </td>
          <td className="border border-slate-700 rounded-md text-left max-md:hidden">
            Category
          </td>
          <td className="border border-slate-700 rounded-md text-left max-md:hidden">
            2023
          </td>
          <td className="border border-slate-700 rounded-md text-center">
            <div className="flex justify-center gap-x-4">
              <Link to={`/books/editbook/`}>
                <FiEdit className="text-2xl text-yellow" />
              </Link>
              <Link to={`/books/deletebook/`}>
                <AiFillDelete className="text-2xl text-red" />
              </Link>
            </div>
          </td>
        </tr>
        <tr className="h-8">
          <td className="border border-slate-700 rounded-md text-center">2</td>
          <td className="border border-slate-700 rounded-md text-left">
            How I Design My first UX
          </td>
          <td className="border border-slate-700 rounded-md text-left max-md:hidden">
            Category
          </td>
          <td className="border border-slate-700 rounded-md text-left max-md:hidden">
            2023
          </td>
          <td className="border border-slate-700 rounded-md text-center">
            <div className="flex justify-center gap-x-4">
               <Link to={`/books/editbook/`}>
                <FiEdit className="text-2xl text-yellow" />
              </Link>
              <Link to={`/books/deletebook/`}>
                <AiFillDelete className="text-2xl text-red" />
              </Link>
            </div>
          </td>
        </tr>
        <tr className="h-8">
          <td className="border border-slate-700 rounded-md text-center">3</td>
          <td className="border border-slate-700 rounded-md text-left">
            How I Design My first UX
          </td>
          <td className="border border-slate-700 rounded-md text-left max-md:hidden">
            Category
          </td>
          <td className="border border-slate-700 rounded-md text-left max-md:hidden">
            2023
          </td>
          <td className="border border-slate-700 rounded-md text-center">
            <div className="flex justify-center gap-x-4">
              <Link to={`/books/editbook/`}>
                <FiEdit className="text-2xl text-yellow" />
              </Link>
              <Link to={`/books/deletebook/`}>
                <AiFillDelete className="text-2xl text-red" />
              </Link>
            </div>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default BookTable;
