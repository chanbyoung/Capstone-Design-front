import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../lib/axios";
import styles from "./MyPage.module.css";
import heartBeforeImg from "../assets/heartBefore.png";
import heartAfterImg from "../assets/heartAfter.png";

function MyPage() {
  const [user, setUser] = useState(null);
  //하트 이미지
  const [imageSrc, setImageSrc] = useState(heartBeforeImg);
  const [isClicked, setIsClicked] = useState(false);
  const [recruitproject, setRecruitProject] = useState([]);
  const [applyproject, setApplyProject] = useState([]);
  const [progressproject, setProgressProject] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        //로컬 스토리지에서 토큰 가져오기
        const token = localStorage.getItem("accessToken");
        console.log(token);

        if (token) {
          //토큰이 있다면 서버에 GET 요청 보내 유저 정보 가져옴
          const response = await axios.get("/api/members/member", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          //서버에서 받아온 유저 정보로 상태 변경. 컴포넌트 리렌더링
          setUser(response.data);
          setRecruitProject(response.data.recruitingProject);
          setApplyProject(response.data.myApplyProject);
          setProgressProject(response.data.progressProject);
        } else {
          alert("토큰이 없음");
        }
      } catch (error) {
        alert("유저 정보 불러오기 실패", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className={styles.MyPage}>
      <div
        className={`${styles.profile} ${styles.flexColumn} ${styles.flexCenter}`}
      >
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
                <Link to={`/ProjectInformation/${project.id}`}>
                  <img
                    className={styles.photo}
                    alt="img"
                    src={require(`../assets/DefaultProjectImg.png`)}
                  />
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
                <Link to={`/ProjectInformation/${project.id}`}>
                  <img
                    className={styles.photo}
                    alt="img"
                    src={require(`../assets/DefaultProjectImg.png`)}
                  />
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
                <Link to={`/ProjectInformation/${project.id}`}>
                  <img
                    className={styles.photo}
                    alt="img"
                    src={require(`../assets/DefaultProjectImg.png`)}
                  />
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