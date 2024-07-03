//eslint-disable-next-line
import { Link, NavLink } from "react-router-dom";
import styles from "./StudySummary.module.css";
import { useState, useEffect } from "react";
import axios from "../../lib/axios";

function StudySummary() {
  const [studyList, setStudyList] = useState([]);

  //스터디 리스트 받아오는 함수
  const getStudyList = async () => {
    const response = await axios.get("/api/posts", {
      params: {
        category: "STUDY",
      },
    });
    setStudyList(response.data.content);
  };
  useEffect(() => {
    getStudyList();
  }, []);

  return (
    <>
      <div className={styles.inner}>
        {studyList.map((study) => (
          <div className={styles.projectSummary}>
            <Link to={`/StudyInformation/${study.id}`} key={study.id}>
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
