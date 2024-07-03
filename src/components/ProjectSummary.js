//eslint-disable-next-line
import { Link, NavLink } from "react-router-dom";
import styles from "./ProjectSummary.module.css";
import { useState, useEffect } from "react";
import axios from "../lib/axios";

function ProjectSummary() {
  const [projectList, setProjectList] = useState([]);

  const getProjectList = async () => {
    const response = await axios.get("/api/posts", {
      params: {
        category: "PROJECT",
      },
    });
    setProjectList(response.data.content);
  };
  useEffect(() => {
    getProjectList();
  }, []);

  return (
    <>
      <div className={styles.inner}>
        {projectList.map((project) => (
          <div className={styles.projectSummary}>
            <Link
              to={`/ProjectInformation/${project.id}`}
              key={project.projectId}
            >
              <img
                className={styles.photo}
                alt="img"
                src={require(`../assets/DefaultProjectImg.png`)}
              />
              <p className={styles.mainletter}>{project.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProjectSummary;
