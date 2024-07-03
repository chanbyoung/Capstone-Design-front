import { useState } from "react";
import axios from "../lib/axios";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [values, setValues] = useState({
    loginId: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { loginId, password } = values;

    try {
      const response = await axios.post("/api/members/sign-in", {
        loginId,
        password,
      });
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;

      //로컬 스토리지에 토큰 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      navigate("/");
      //로그인 후 새로고침
      window.location.reload();
      //로그인 후 마이페이지로 이동
      alert("로그인 성공");
      console.log("resonse" + response);
      console.log("accessToken : " + accessToken);
      console.log("refreshToken : " + refreshToken);
    } catch (error) {
      alert("로그인 실패");
    }
  }

  // const handleKakaoLoginClick = () => {
  //   window.location.href = "http://localhost:8080/oauth/kakao"; //페이지 리다이렉트
  // };

  return (
    <>
      <div className={styles.loginPage}>
        <h1 className={styles.header}>로그인 &#128274;</h1>
        <section className={styles.formLogin}>
          <form onSubmit={handleSubmit}>
            <input
              id="loginId"
              name="loginId"
              type="text"
              placeholder="아이디"
              value={values.loginId}
              onChange={handleChange}
            />

            <input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호"
              value={values.password}
              onChange={handleChange}
            />
            <button type="submit">로그인</button>
            <button onClick={() => navigate("/FindPage")}>아이디/비밀번호 찾기</button>
          </form>
        </section>
      </div>
    </>
  );
}

export default LoginPage;
