import { useState, useEffect } from "react";
import styled from "styled-components";
import Navbar from "../Navbar";
import { userAuth } from "../../ultContext/AuthContext";
import AnimatedCircle from "../../AnimatedCircle";
import { useParams } from "react-router-dom";

const View = () => {
  const [loading, setLoading] = useState(true);
  const [projectInfo, setProjectInfo] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getTheProject();
  }, [id]);

  const getTheProject = async () => {
    try {
      const res = await fetch(`https://7wvkdh-5000.csb.app/project/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // credentials: "include",
        cors: "no-cors",
      });
      console.log("res", res);
    } catch (e) {
      console.log(e.message);
    } finally {
      setLoading(true);
    }
  };

  return (
    <div className="content">
      <Navbar />
      <AnimatedCircle />
    </div>
  );
};

export default View;
