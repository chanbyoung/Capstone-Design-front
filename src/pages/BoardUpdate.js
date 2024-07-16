import React, { useState, useEffect, useRef } from "react";
import axios from "../lib/axios";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./BoardRegister.module.css";

const BoardUpdate = () => {
  const navigate = useNavigate();
  const { idx } = useParams();
  const fileInputRef = useRef();
  const [imageFile, setImageFile] = useState(null);

  const [boardInfo, setBoardInfo] = useState({
    title: "",
    category: "GENERAL",
    content: ""
  });

  const { title, category, content } = boardInfo;

  // Fetch existing post data
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`/api/posts/${idx}`);
        setBoardInfo(response.data);
      } catch (error) {
        console.error("Failed to fetch post data:", error);
      }
    };
    
    fetchPostData();
  }, [idx]);

  const onChange = (event) => {
    const { value, name } = event.target;
    setBoardInfo({
      ...boardInfo,
      [name]: value,
    });
  };

  const onFileChange = (event) => {
    setImageFile(event.target.files[0]);
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
      await axios.patch(`/api/posts/${idx}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("수정되었습니다.");
      navigate(`/FreeBoard`);
    } catch (error) {
      console.error("게시글 수정 중 오류가 발생했습니다.", error);
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
        <h1 className={styles.header}>게시글 수정하기</h1>
      </div>
      <div className={styles.BoardMain}>
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
      </div>
    </>
  );
};

export default BoardUpdate;
