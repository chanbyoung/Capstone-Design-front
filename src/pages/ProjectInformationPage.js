import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProjectInformationPage.module.css";
import { getProjectBySlug } from "../api";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function ProjectInformation() {
  /*현재 URL에서 추출한 동적으로 설정된 파라미터 값
  ex) URL이 "/ProjectInformation/couple-app" 인 경우
  projectSlug에는 couple-app이 들어감 */

  /*<Route
      path="/ProjectInformation/:projectSlug"
      element={<ProjectInformationPage />}
    />
    Main.js에서 내가 동적 매개변수의 값을 :projectSlug로 지정했기 때문*/
  const { projectSlug } = useParams();
  const project = getProjectBySlug(projectSlug);

  //하트 이미지 관련 useState
  const InitialIcon = <FavoriteBorderIcon />;
  const [icon, setIcon] = useState(InitialIcon);
  const [isClicked, setIsClicked] = useState(false);

  //하트 이미지 클릭 함수
  const handleClick = () => {
    if (isClicked) {
      setIcon(<FavoriteBorderIcon />);
      setIsClicked(false); //초기 상태로
    } else {
      setIcon(<FavoriteIcon />);
      setIsClicked(true);
    }
  };

  const iconStyle = {
    color: isClicked ? "red" : "black", // 예시로 클릭 시 빨간색으로 변경
    cursor: "pointer", // 마우스 커서를 포인터로 변경
  };

  return (
    <>
      <div className={styles.projectInformation}>
        <div className={styles.recru}>
          <p>{project.recruitStatus}</p>
        </div>
        <header className={styles.projectInfoHeader}>
          <img alt="projectImg" src={require(`../assets/${project.image}`)} />
          <div className={styles.headerInfo}>
            <div className={styles.headerInfoTitle}>
              <h1>{project.title}</h1>
              <div>
                <span
                  className={styles.heartIcon}
                  onClick={handleClick}
                  style={iconStyle}
                >
                  {icon}
                </span>
              </div>
            </div>
            <p>사용자 정보</p>
          </div>
        </header>
        <main className={styles.projectInfoMain}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>프로젝트 소개 및 기간</h3>
            <hr />
            <div className={styles.contents}>
              <p className={styles.period}>기간 : {project.period}</p>
              <p>{project.introduction}</p>
            </div>
          </div>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>현재 모집 현황</h3>
            <hr />
            <div className={styles.contents}>
              <div className={styles.recruitmentDiv}>
                <p>{project.recruitment}</p>
                <button>지원</button>
              </div>
            </div>
          </div>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>기술</h3>
            <hr />
            <div className={styles.contents}>
              <p>기술 이미지</p>
            </div>
          </div>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>참고 링크</h3>
            <hr />
            <div className={styles.contents}>{project.Reference}</div>
          </div>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>댓글</h3>
            <hr />
            <div className={styles.contents}>
              <p>{project.comment}</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default ProjectInformation;
