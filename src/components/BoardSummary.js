//eslint-disable-next-line
import { Link, NavLink } from "react-router-dom";
import styles from "./ProjectSummary.module.css";
import { useState, useEffect } from "react";
import axios from "../lib/axios";

function BoardSummary() {
  const [boardList, setBoardList] = useState([]);

  const getBoardList = async () => {
    const response = await axios.get("/api/posts", {
      params: {
        category: "GENERAL",
      },
    });
    setBoardList(response.data.content);
  };
  useEffect(() => {
    getBoardList();
  }, []);

  return (
    <>
      <div className={styles.inner}>
        {boardList.map((board) => (
          <div className={styles.projectSummary}>
            <Link to={`/BoardInformation/${board.id}`} key={board.projectId}>
              <img
                className={styles.photo}
                alt="img"
                src={require(`../assets/DefaultProjectImg.png`)}
              />
              <p className={styles.mainletter}>{board.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default BoardSummary;
