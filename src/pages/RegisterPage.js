import { useState, useEffect } from "react";
import styles from "./RegisterPage.module.css";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";

function RegisterPage() {
  const navigate = useNavigate();
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [loginIdChecked, setLoginIdChecked] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const [values, setValues] = useState({
    username: "",
    nickname: "",
    email: "",
    loginId: "",
    password: "",
    confirmPassword: "",
    major: "",
  });

  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    if (values.password && values.confirmPassword) {
      setPasswordMatch(values.password === values.confirmPassword);
    } else {
      setPasswordMatch(true);
    }
  }, [values.password, values.confirmPassword]);

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  async function checkNicknameAvailability() {
    const { nickname } = values;
    try {
      const response = await axios.get(
        `/api/members/exists/nickname?nickname=${nickname}`
      );
      const isNicknameTaken = response.data;

      if (isNicknameTaken) {
        alert("이미 사용중인 닉네임입니다.");
        setNicknameChecked(false);
      } else {
        alert("사용 가능한 닉네임입니다.");
        setNicknameChecked(true);
      }
    } catch (error) {
      console.error("Error during request:", error);
      alert("닉네임 중복 확인 중 오류가 발생했습니다.");
    }
  }

  async function checkLoginIdAvailability() {
    const { loginId } = values;
    try {
      const response = await axios.get(
        `/api/members/exists/loginId?loginId=${loginId}`
      );
      const isLoginIdTaken = response.data;

      if (isLoginIdTaken) {
        alert("이미 사용중인 아이디입니다.");
        setLoginIdChecked(false);
      } else {
        alert("사용 가능한 아이디입니다.");
        setLoginIdChecked(true);
      }
    } catch (error) {
      console.error("Error during request:", error);
      alert("아이디 중복 확인 중 오류가 발생했습니다.");
    }
  }

  async function sendVerificationCode() {
    const { email } = values;
    try {
      await axios.post("/api/members/exists/email", { email });
      alert("인증번호가 이메일로 전송되었습니다.");
      setVerificationSent(true);
    } catch (error) {
      console.error("Error during request:", error);
      if (error.response && error.response.data) {
        alert(error.response.data);
      } else {
        alert("인증번호 전송 중 오류가 발생했습니다.");
      }
    }
  }

  async function verifyCode() {
    const { email } = values;
    try {
      const response = await axios.post("/api/members/exists/code", {
        email,
        code: verificationCode,
      });
      if (response.data.verified) {
        alert("이메일 인증 성공!");
        setIsVerified(true);
      } else {
        alert("잘못된 인증번호입니다.");
      }
    } catch (error) {
      console.error("Error during request:", error);
      alert("인증번호 확인 중 오류가 발생했습니다.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!nicknameChecked) {
      alert("닉네임 중복 확인을 해주세요.");
      return;
    }
    if (!loginIdChecked) {
      alert("아이디 중복 확인을 해주세요.");
      return;
    }
    if (!isVerified) {
      alert("이메일 인증을 해주세요.");
      return;
    }

    if (values.password !== values.confirmPassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    const { username, nickname, email, loginId, password, major } = values;

    try {
      await axios.post(
        "/api/members/sign-up",
        { username, nickname, email, loginId, password, major },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("회원가입 성공");
      navigate("/LoginPage");
    } catch (error) {
      console.error("Error during request:", error);
      if (error.response && error.response.data) {
        alert(error.response.data);
      } else {
        alert("회원가입 중 오류가 발생했습니다.");
      }
    }
  }

  return (
    <>
      <div className={styles.registerPage}>
        <h1 className={styles.header}>회원가입 &#128075;</h1>
        <section className={styles.formLogin}>
          <form onSubmit={handleSubmit}>
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
            <div className={styles.inputGroup}>
              <input
                id="nickname"
                name="nickname"
                type="text"
                placeholder="닉네임"
                value={values.nickname}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={checkNicknameAvailability}
                className={[styles.btn, styles.nickBtn].join(" ")}
              >
                중복 확인
              </button>
            </div>
            <div className={styles.inputGroup}>
              <input
                id="loginId"
                name="loginId"
                type="text"
                placeholder="아이디"
                value={values.loginId}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={checkLoginIdAvailability}
                className={[styles.btn, styles.idBtn].join(" ")}
              >
                중복 확인
              </button>
            </div>
            <div className={styles.inputGroup}>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="이메일"
                value={values.email}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={sendVerificationCode}
                className={[styles.btn, styles.verifyBtn].join(" ")}
                disabled={verificationSent}
              >
                인증번호 요청
              </button>
            </div>
            {verificationSent && (
              <div className={styles.inputGroup}>
                <input
                  id="verificationCode"
                  name="verificationCode"
                  type="text"
                  placeholder="인증번호"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                <button
                  type="button"
                  onClick={verifyCode}
                  className={[styles.btn, styles.verifyCodeBtn].join(" ")}
                >
                  인증번호 확인
                </button>
              </div>
            )}
            <div className={styles.inputGroup}>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호"
                value={values.password}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="비밀번호 확인"
                value={values.confirmPassword}
                onChange={handleChange}
              />
              {!passwordMatch && (
                <p className={styles.errorText}>비밀번호가 일치하지 않습니다.</p>
              )}
            </div>
            <div className={styles.inputGroup}>
              <input
                id="major"
                name="major"
                type="text"
                placeholder="전공"
                value={values.major}
                onChange={handleChange}
              />
            </div>
            <button className={styles.submitButton} type="submit">
              회원가입
            </button>
          </form>
        </section>
      </div>
    </>
  );
}

export default RegisterPage;
