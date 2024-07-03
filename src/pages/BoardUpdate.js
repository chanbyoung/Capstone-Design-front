import React, { useState, useEffect } from "react";
import axios from "../lib/axios";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./BoardRegister.module.css";

const BoardUpdate = () => {
  const navigate = useNavigate();
  const { idx } = useParams();
  
  const [boardInfo, setBoardInfo] = useState({
    title: "",
    category: "GENERAL",
    content: ""
  });

  //비구조화 할당으로 projectInfo가 바로 값을 분해해 변수에 할당함
  const { title, category, content } = boardInfo;

  const onChange = (event) => {
    const { value, name } = event.target; //event.target에서 name과 value만 가져옴
    setBoardInfo({
      ...boardInfo,
      [name]: value,
    });
  };

  const complete = async () => {
    await axios.patch(`/api/posts/${idx}`, boardInfo).then((res) => {
      alert("수정되었습니다.");
      navigate(`/FreeBoard`);
    });
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
      <div style={{ display: "flex", justifyContent: "center" }}>
      <h3>게시글 제목</h3>
          <input type="text" name="title" value={title} onChange={onChange} />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <textarea
          name="content"
          cols="100"
          rows="50"
          value={content}
          onChange={onChange}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={complete} className={styles.btn}>
          확인
        </button>
        <button onClick={cancel} className={styles.btn}>
          취소
        </button>
      </div>
    </>
  );
};

export default BoardUpdate;
