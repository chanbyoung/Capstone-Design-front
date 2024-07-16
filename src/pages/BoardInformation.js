import React from "react";
import axios from "../lib/axios";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./BoardInformation.module.css";

const BoardInformation = ({ title, content }) => {
  const navigate = useNavigate();
  const { idx } = useParams();

  const deleteBoard = async () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      try {
        await axios.delete(`/api/posts/${idx}`);
        alert("삭제되었습니다.");
        navigate("/FreeBoard");
      } catch (error) {
        console.error("게시글 삭제 중 오류가 발생했습니다.", error);
      }
    }
  };

  const updateBoard = () => {
    if (window.confirm("게시글을 수정하시겠습니까?")) {
      navigate(`/BoardUpdate/${idx}`);
    }
  };

  return (
    <div className={styles.boardInformation}>
      <h1 className={styles.header}>{title}</h1>
      <main className={styles.boardMain}>
        <div className={styles.contents}>
          <p>{content}</p>
        </div>
        <div className={styles.buttonGroup}>
          <button onClick={updateBoard} className={styles.btn}>수정</button>
          <button onClick={deleteBoard} className={styles.btn}>삭제</button>
        </div>
      </main>
    </div>
  );
};

export default BoardInformation;
