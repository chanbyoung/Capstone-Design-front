//eslint-disable-next-line
import { Link } from "react-router-dom";
import styles from "./StudySummary.module.css";
import { useState, useEffect } from "react";
import axios from "../../lib/axios";

function StudySummary() {
  const [studyList, setStudyList] = useState([]);

  // 스터디 리스트 받아오는 함수
  const getStudyList = async () => {
    const response = await axios.get("/api/posts/likePosts", {
      params: {
        category: "STUDY",
      },
    });
    setStudyList(response.data); // 데이터 형식을 ProjectSummary와 동일하게 변경
  };

  useEffect(() => {
    getStudyList();
  }, []);

  return (
    <>
      <div className={styles.inner}>
        {studyList.map((study) => (
          <div className={styles.projectSummary} key={study.id}>
            <Link to={`/StudyInformation/${study.id}`}>
              <img
                className={styles.photo}
                alt="img"
                src={require(`../../assets/DefaultStudyImg.png`)}
              />
              <p className={styles.mainletter}>{study.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default StudySummary;