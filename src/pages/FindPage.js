import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import styles from "./FindPage.module.css";

function FindPage() {
  const [isFindingId, setIsFindingId] = useState(true);
  const [values, setValues] = useState({
    email: "",
    username: "",
    loginId: "",
    newPassword: "",
    verificationCode: "",
  });
  const [verificationSent, setVerificationSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [loginId, setLoginId] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  async function sendVerificationCode() {
    const { email, username, loginId } = values;
    try {
      await axios.post("/api/members/find", { email, username, loginId });
      alert("인증번호가 이메일로 전송되었습니다.");
      setVerificationSent(true);
    } catch (error) {
      console.error("Error during request:", error);
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        alert("인증번호 전송 중 오류가 발생했습니다.");
      }
    }
  }

  async function verifyCode() {
    const { email, username, loginId, verificationCode } = values;
    try {
      const response = await axios.post("/api/members/exists/code", {
        email,
        username,
        loginId,
        code: verificationCode,
      });
      if (response.data.verified) {
        setIsVerified(true);
        alert("이메일 인증 성공!");

        if (isFindingId) {
          const idResponse = await axios.post("/api/members/find/id", {
            email,
            code: verificationCode,
          });
          setLoginId(idResponse.data.loginId);
        }
      } else {
        alert("잘못된 인증번호입니다.");
      }
    } catch (error) {
      console.error("Error during request:", error);
      alert("인증번호 확인 중 오류가 발생했습니다.");
    }
  }

  async function resetPassword() {
    const { email, verificationCode, newPassword } = values;
    try {
      await axios.post("/api/members/find/password", {
        email,
        code: verificationCode,
        newPassword,
      });
      alert("비밀번호 재설정 성공!");
      navigate("/LoginPage"); // Redirect to the login page
    } catch (error) {
      console.error("Error during request:", error);
      alert("비밀번호 재설정 중 오류가 발생했습니다.");
    }
  }

  return (
    <div className={styles.findPage}>
      <h1 className={styles.header}>
        {isFindingId ? "아이디 찾기" : "비밀번호 찾기"} &#128274;
      </h1>
      <section className={styles.formFind}>
        <div className={styles.toggleButtons}>
          <button
            className={`${styles.toggleButton} ${isFindingId ? styles.active : ""}`}
            onClick={() => setIsFindingId(true)}
          >
            아이디 찾기
          </button>
          <button
            className={`${styles.toggleButton} ${!isFindingId ? styles.active : ""}`}
            onClick={() => setIsFindingId(false)}
          >
            비밀번호 찾기
          </button>
        </div>
        <form>
          <div className={styles.inputGroup}>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="이메일"
              value={values.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="이름"
              value={values.username}
              onChange={handleChange}
            />
          </div>
          {!isFindingId && (
            <div className={styles.inputGroup}>
              <input
                id="loginId"
                name="loginId"
                type="text"
                placeholder="아이디"
                value={values.loginId}
                onChange={handleChange}
              />
            </div>
          )}
          <button
            type="button"
            onClick={sendVerificationCode}
            className={styles.sendCodeButton}
            disabled={verificationSent}
          >
            인증번호 요청
          </button>
          {verificationSent && (
            <>
              <div className={styles.inputGroup}>
                <input
                  id="verificationCode"
                  name="verificationCode"
                  type="text"
                  placeholder="인증번호"
                  value={values.verificationCode}
                  onChange={handleChange}
                />
              </div>
              <button
                type="button"
                onClick={verifyCode}
                className={styles.verifyCodeButton}
              >
                인증번호 확인
              </button>
            </>
          )}
          {isVerified && isFindingId && (
            <div className={styles.inputGroup}>
              <p>찾으신 아이디: {loginId}</p>
            </div>
          )}
          {isVerified && !isFindingId && (
            <>
              <div className={styles.inputGroup}>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="새 비밀번호"
                  value={values.newPassword}
                  onChange={handleChange}
                />
              </div>
              <button
                type="button"
                onClick={resetPassword}
                className={styles.verifyCodeButton}
              >
                비밀번호 재설정
              </button>
            </>
          )}
        </form>
      </section>
    </div>
  );
}

export default FindPage;
