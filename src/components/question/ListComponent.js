import React, { useEffect, useState } from "react";
import useCustomMove from "../../hooks/useCustomMove";
import { getList } from "../../api/questionApi";
import PageComponent from "./PageComponent";
import styles from "./ListComponent.module.css";

const initState = {
  dtoList: [],
  pageNumList: [],
  pageRequestDTO: null,
  prev: false,
  next: false,
  totalCnt: 0,
  prevPageNo: 0,
  nextPageNo: 0,
  totalPageNo: 0,
};

function ListComponent(props) {
  const { page, size, refresh, moveToList, moveToRead } = useCustomMove();

  const [serverData, setServerData] = useState(initState);

  useEffect(() => {
    getList({ page, size }).then((data) => {
      setServerData(data);
    });
  }, [page, size, refresh]);

  return (
    <div className={styles.ListComponent}>
      <h1>&#128161; 질의응답</h1>
      <header>
        <h3 className={styles.headerQno}>번호</h3>
        <h3 className={styles.headerTitle}>글 제목</h3>
        <h3 className={styles.headerCreateAt}>작성일</h3>
      </header>
      <div className={styles.listMain}>
        {serverData.dtoList.map((question) => (
          <div key={question.qno} onClick={() => moveToRead(question.qno)}>
            <main>
              <div className={styles.qno}>{question.qno}</div>
              <div className={styles.title}> {question.title}</div>
              <div className={styles.createdAt}>{question.createdAt}</div>
            </main>
          </div>
        ))}
      </div>
      <footer>
        <PageComponent
          serverData={serverData}
          movePage={moveToList}
        ></PageComponent>
      </footer>
    </div>
  );
}

export default ListComponent;
