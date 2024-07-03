import styles from "./FreeBoard.module.css";
import Divider from "@mui/material/Divider";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import BoardSummary from "../components/BoardSummary.js";
import SearchBoard from "../components/SearchBoard.js";

function FreeBoard() {
  const navigate = useNavigate();

  const handleNewPostClick = () => {
    navigate("/BoardRegister");
  };

  return (
    <div className={styles.FreeBoard}>
      <h1 className={styles.header}>자유게시판</h1>
      <div className={styles.body}>
        <div className={styles.tableHeader}>
          <span>번호</span>
          <span>제목</span>
          <span>작성자</span>
          <span>작성일</span>
          <span>조회수</span>
        </div>
      </div>
      <div className={styles.searchBoard}>
        <SearchBoard />
      </div>
    </div>
  );
}

export default FreeBoard;
