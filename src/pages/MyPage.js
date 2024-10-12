import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../lib/axios";
import styles from "./MyPage.module.css";
import heartBeforeImg from "../assets/heartBefore.png";
import heartAfterImg from "../assets/heartAfter.png";

function MyPage() {
  const [user, setUser] = useState(null);
  const [imageSrc, setImageSrc] = useState(heartBeforeImg);
  const [isClicked, setIsClicked] = useState(false);
  const [recruitproject, setRecruitProject] = useState([]);
  const [applyproject, setApplyProject] = useState([]);
  const [progressproject, setProgressProject] = useState([]);
  const [likeproject, setLikeProject] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        console.log(token);

        if (token) {
          const response = await axios.get("/api/members/member", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
          setRecruitProject(response.data.recruitingProject);
          setApplyProject(response.data.myApplyProject);
          setProgressProject(response.data.progressProject);
          setLikeProject(response.data.myLikeProject);
        } else {
          alert("토큰이 없음");
        }
      } catch (error) {
        alert("유저 정보 불러오기 실패", error);
      }
    };
    fetchUserData();
  }, []);

  const getLinkPath = (project) => {
    return project.category === "스터디"
      ? `/StudyInformation/${project.id}`
      : `/ProjectInformation/${project.id}`;
  };

  const getImageSrc = (project) => {
    return require(`../assets/${
      project.category === "스터디" ? "DefaultStudyImg.png" : "DefaultProjectImg.png"
    }`);
  };

  return (
    <div className={styles.MyPage}>
      <div className={`${styles.profile} ${styles.flexColumn} ${styles.flexCenter}`}>
        <div className={styles.profileInfo}>
          <section className={styles.section1}>
            <h2>{user?.nickname}</h2>
            <p className={styles.major}>(전공자)</p>
          </section>
          <section className={styles.section2}>
            <p className={styles.info}></p>
          </section>
          <section className={styles.section3}>
            <h2>내 전공</h2>
            <p>{user?.major}</p>
          </section>
          <section className={styles.section4}>
            <h2>내 기술스택</h2>
            <img alt="reactImg" src={require(`../assets/react.png`)} />
          </section>
        </div>
      </div>

      <div className={styles.userProject}>
        <div className={styles.presentProject}>
          <h3>구인중인 프로젝트</h3>
          <div className={styles.inner}>
            {recruitproject.map((project) => (
              <div className={styles.projectSummary} key={project.projectId}>
                <Link to={getLinkPath(project)}>
                  <img className={styles.photo} alt="img" src={getImageSrc(project)} />
                  <p className={styles.pmainletter}>{project.title}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.pastProject}>
          <h3>지원한 프로젝트</h3>
          <div className={styles.inner}>
            {applyproject.map((project) => (
              <div className={styles.projectSummary} key={project.projectId}>
                <Link to={getLinkPath(project)}>
                  <img className={styles.photo} alt="img" src={getImageSrc(project)} />
                  <p className={styles.pmainletter}>{project.title}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.pastProject}>
          <h3>관심있는 게시글</h3>
          <div className={styles.inner}>
            {likeproject.map((project) => (
              <div className={styles.projectSummary} key={project.projectId}>
                <Link to={getLinkPath(project)}>
                  <img className={styles.photo} alt="img" src={getImageSrc(project)} />
                  <p className={styles.pmainletter}>{project.title}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.pastProject}>
          <h3>종료된 프로젝트</h3>
          <div className={styles.inner}>
            {progressproject.map((project) => (
              <div className={styles.projectSummary} key={project.projectId}>
                <Link to={getLinkPath(project)}>
                  <img className={styles.photo} alt="img" src={getImageSrc(project)} />
                  <p className={styles.pmainletter}>{project.title}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;