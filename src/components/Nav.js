//eslint-disable-next-line
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import styles from "./Nav.module.css";

function Nav() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/LoginPage");
  }

  return (
    <div className={styles.navbar}>
      <ul>
        <li>
          <img
            className={styles.Logo}
            alt="Logo"
            src={require(`../assets/paletteLogo.png`)}
          />
        </li>
        <li className={styles.homeLogo}>
          <Link to="/">Dorikkiri</Link>
        </li>
        <li className={styles.navProject}>
          <Link to="/ProjectList">프로젝트</Link>
        </li>
        <li className={styles.navProject}>
          <Link to="/StudyList">스터디</Link>
        </li>
        <li className={styles.navFree}>
          <Link to="/FreeBoard">자유게시판</Link>
        </li>
        <div className={styles.userList}>
          {isLoggedIn ? (
            <>
              <li className={styles.appliesList}>
                {" "}
                {/* New Link */}
                <Link to="/appliesList/my">내 지원 내역</Link>
              </li>
              <li className={styles.appliesList}>
                {" "}
                {/* New Link */}
                <Link to="/appliesList">지원 목록</Link>
              </li>
              <li className={styles.conversation}>
                {" "}
                {/* New Link */}
                <Link to="/conversation">대화 목록</Link>
              </li>
              <li className={styles.myPage}>
                <Link to="/MyPage">내 정보</Link>
              </li>
              <li className={styles.logout}>
                <button onClick={handleLogout}>로그아웃</button>
              </li>
            </>
          ) : (
            <>
              <li className={styles.login}>
                <Link to="/LoginPage">로그인</Link>
              </li>
              <li className={styles.register}>
                <Link to="/RegisterPage">회원가입</Link>
              </li>
            </>
          )}
        </div>
      </ul>
    </div>
  );
}

export default Nav;
