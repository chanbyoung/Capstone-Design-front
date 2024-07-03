import React, { useEffect, useState } from "react";
import { getOne } from "../../api/questionApi";
import useCustomMove from "../../hooks/useCustomMove";
import styles from "./ReadComponent.module.css";

const initState = {
  qno: 0,
  title: "",
  writer: "",
  content: "",
  createdAt: "",
};

function ReadComponent({ qno }) {
  const [question, setQuestion] = useState(initState);
  const { moveToList, moveToModify } = useCustomMove();

  useEffect(() => {
    getOne(qno).then((data) => {
      setQuestion(data);
    });
  }, [qno]);

  return (
    <div className={styles.ReadComponent}>
      <div className={styles.title}>{question.title}</div>
      <div className={styles.info}>
        <div className={styles.writer}>{question.writer}</div>
        <div>{question.createdAt}</div>
      </div>
      <div className={styles.content}>{question.content}</div>
      <div>
        <button type="button" onClick={() => moveToModify(question.qno)}>
          수정하기
        </button>
      </div>
    </div>
  );
}

const makeDiv = (title, value) => (
  <div>
    <div className="3xl">
      <div>{title}</div>
      <div>{value}</div>
    </div>
  </div>
);

export default ReadComponent;
