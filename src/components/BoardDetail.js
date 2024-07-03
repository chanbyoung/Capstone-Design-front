import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../lib/axios";
import BoardInformation from "../pages/BoardInformation";

function BoardDetail() {
  const [board, setBoard] = useState({});
  const { idx } = useParams();

  //게시글 정보 가져오기
  const getBoard = async () => {
    try {
      const response = await axios.get(`/api/posts/${idx}`);
      console.log(response.data);
      setBoard(response.data);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  useEffect(() => {
    getBoard();
  }, []);

  return (
    <div>
      <BoardInformation
        title={board.title}
        content={board.content}
      />
    </div>
  );
}

export default BoardDetail;
