import styles from "./ProjectListPage.module.css";
import SearchProject from "../components/SearchProject.js";
import ProjectSummary from "../components/ProjectSummary.js";

function ProjectListPage() {
  // const [projectList, setProjectList] = useState([]);

  // const getProjectList = async () => {
  //   const response = await axios.get("/api/posts", {
  //     params: {
  //       category: "PROJECT",
  //     },
  //   });
  //   setProjectList(response.data.content);
  // };
  // useEffect(() => {
  //   getProjectList();
  // }, []);

  return (
    <>
      <div className={styles.ProjectListPage}>
        <h1 className={styles.mainletter}>&#128150; 관심 많은 프로젝트</h1>
        <div className={styles.likeProject}>
          <ProjectSummary />
        </div>
        <h1 className={styles.mainletter}>검색</h1>
        <div className={styles.searchProject}>
          <SearchProject />
        </div>
      </div>
    </>
  );
}

export default ProjectListPage;
