import React from "react";
import styles from "./BoardInformation.module.css";
import axios from "../lib/axios";
import { useNavigate, useParams } from "react-router-dom";

const BoardInformation = ({ title, content }) => {
  const navigate = useNavigate();
  const { idx } = useParams();

  console.log(title);

  //게시글 삭제하기
  const deleteBoard = async () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      await axios.delete(`/api/posts/${idx}`).then((res) => {
        alert("삭제되었습니다.");
        navigate("/FreeBoard");
      });
    }
  };
   //게시글 수정하기
   const updateBoard = async () => {
    if (window.confirm("게시글을 수정하시겠습니까?")) 
        navigate(`/BoardUpdate/${idx}`);
  };

  return (
    <>
    <div className={styles.projectInformation}>
      <header className={styles.projectInfoHeader}>
          <div className={styles.headerInfoTitle}>
            <h1>{title}</h1>
          </div>
      </header>
      <main className={styles.projectInfoMain}>
        <div className={styles.contents}>
          <p>{content}</p>
        </div>
      </main>
      <footer>
        <div className={styles.inner}>
          <button onClick={updateBoard} className={styles.btn}>수정</button>
          <button onClick={deleteBoard} className={styles.btn}>삭제</button>
        </div>
      </footer>
      </div>
    </>
  );
};

export default BoardInformation;
