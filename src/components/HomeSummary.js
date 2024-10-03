import styles from "./ProjectSummary.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../lib/axios";

function HomeSummary() {
  const [projectList, setProjectList] = useState([]);

  const getProjectList = async () => {
    const response = await axios.get("/api/homes", {
      params:{
        category: "PROJECT",
      },
    }); 
    // 새로운 엔드포인트 호출
    setProjectList(response.data); // 리스트 데이터 설정
  };

  useEffect(() => {
    getProjectList();
  }, []);

  return (
    <>
      <div className={styles.inner}>
        {projectList.map((project) => (
          <div className={styles.projectSummary} key={project.id}>
            <Link to={`/ProjectInformation/${project.id}`}>
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

export default HomeSummary;