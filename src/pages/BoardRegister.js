import React, { useState, useRef } from "react";
import axios from "../lib/axios";
import { useNavigate } from "react-router-dom";
import styles from "./BoardRegister.module.css";

const BoardRegister = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const [imageFile, setImageFile] = useState(null);

  const [boardInfo, setBoardInfo] = useState({
    title: "",
    category: "GENERAL",
    content: "",
  });

  const { title, category, content } = boardInfo;

  const onChange = (event) => {
    const { value, name } = event.target;
    setBoardInfo({
      ...boardInfo,
      [name]: value,
    });
  };

  const complete = async () => {
    const formData = new FormData();
    if (imageFile) {
      formData.append("image", imageFile);
    }

    formData.append(
      "json",
      new Blob([JSON.stringify(boardInfo)], { type: "application/json" })
    );

    try {
      const res = await axios.post(`/api/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("등록되었습니다.");
      console.log(boardInfo);
      navigate("/FreeBoard");
    } catch (error) {
      console.error("게시글 등록 중 오류가 발생했습니다.", error);
    }
  };

  const cancel = () => {
    if (window.confirm("작업을 그만 두시겠습니까?")) {
      navigate(`/FreeBoard`);
    }
  };

  return (
    <>
      <div className={styles.BoardRegister}>
        <h1 className={styles.header}>게시글 작성하기</h1>
      </div>
      <main className={styles.BoardMain}>
        <div className={styles.formGroup}>
          <h3>게시글 제목</h3>
          <input
            type="text"
            name="title"
            value={title}
            onChange={onChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <h3>게시글 내용</h3>
          <textarea
            name="content"
            cols="30"
            rows="10"
            value={content}
            onChange={onChange}
            className={styles.textarea}
          />
        </div>

        <div className={styles.buttonGroup}>
          <button onClick={complete} className={styles.btn}>
            확인
          </button>
          <button onClick={cancel} className={styles.btn}>
            취소
          </button>
        </div>
      </main>
    </>
  );
};

export default BoardRegister;
