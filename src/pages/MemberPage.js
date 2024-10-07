import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "../lib/axios";
import styles from "./MyPage.module.css";
import heartBeforeImg from "../assets/heartBefore.png";
import heartAfterImg from "../assets/heartAfter.png";

function MemberPage() {
  const { nickname } = useParams(); // URL에서 닉네임 가져오기
  const [member, setMember] = useState(null);
  const [recruitproject, setRecruitProject] = useState([]);
  const [progressproject, setProgressProject] = useState([]);


  useEffect(() => {
    const fetchMemberData = async () => {
      // 닉네임을 requestParam으로 전달하는 GET 요청
      const response = await axios.get("/api/members/member/find", {
        params: {
          nickname: nickname, // 닉네임을 requestParam으로 전달
        },
      });

      setMember(response.data);
      setRecruitProject(response.data.recruitingProject);
      setProgressProject(response.data.progressProject);

    };
    fetchMemberData();
  }, []);

  return (
    <div className={styles.MyPage}>
      <div
        className={`${styles.profile} ${styles.flexColumn} ${styles.flexCenter}`}
      >
        <div className={styles.profileInfo}>
          <section className={styles.section1}>
            <h2>{member?.nickname}</h2>
            <p className={styles.major}>(전공자)</p>
          </section>
          <section className={styles.section2}>
            <p className={styles.info}></p>
          </section>
          <section className={styles.section3}>
            <h2>내 전공</h2>
            <p>{member?.major}</p>
          </section>
          <section className={styles.section4}>
            <h2>내 기술스택</h2>
            <img alt="reactImg" src={require(`../assets/react.png`)} />
          </section>
        </div>
      </div>

      <div className={styles.memberProject}>
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
          <h3>진행중인 프로젝트</h3>
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

export default MemberPage;