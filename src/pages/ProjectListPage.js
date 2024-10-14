import styles from "./ProjectListPage.module.css";
import SearchProject from "../components/SearchProject.js";
import ProjectSummary from "../components/ProjectSummary.js";

function ProjectListPage() {

  return (
    <>
      <div className={styles.ProjectListPage}>
        <h1 className={styles.mainletter}>&#128150; 관심 많은 프로젝트</h1>
        <div className={styles.likeProject}>
          <ProjectSummary />
        </div>
        <h1 className={styles.mainletter}>전체 프로젝트</h1>
        <div className={styles.searchProject}>
          <SearchProject />
        </div>
      </div>
    </>
  );
}

export default ProjectListPage;
