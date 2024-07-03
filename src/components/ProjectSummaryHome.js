//eslint-disable-next-line
import { Link, NavLink } from "react-router-dom";
import styles from "./ProjectSummaryHome.module.css";
import jsondata from "../api/mock.json";

function ProjectSummaryHome() {
  const data = jsondata;
  const p = data.projects;

  return p
    .filter((project) => {
      if (project.projectId <= 5) {
        return project;
      } else return 0;
    })
    .map((project) => (
      <Link to={`/ProjectInformation/${project.slug}`} key={project.projectId}>
        <div className={styles.projectSummaryHome}>
          <img
            className={styles.photo}
            alt="img"
            src={require(`../assets/${project.image}`)}
          />
          <h1 className={styles.mainletter}>{project.title}</h1>
        </div>
      </Link>
    ));
}

export default ProjectSummaryHome;
