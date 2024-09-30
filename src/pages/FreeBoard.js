import React, { useState, useEffect, useCallback } from "react";
import styles from "./FreeBoard.module.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchBoard from "../components/SearchBoard.js";
import axios from "../lib/axios";

function FreeBoard() {
  const navigate = useNavigate();
  const [projectList, setProjectList] = useState([]);
  const [filteredProject, setFilteredProject] = useState([]);

  // 서버에서 게시글 목록을 가져오는 함수
  const getProjectList = useCallback(async () => {
    try {
      const response = await axios.get("/api/posts", {
        params: { category: "GENERAL" },
      });
      const projects = response.data.content;
      setProjectList(projects);
      setFilteredProject(projects);
    } catch (error) {
      console.error("Failed to fetch project list:", error);
    }
  }, []);

  // 초기 렌더 시 게시글 목록을 가져옴
  useEffect(() => {
    getProjectList();
  }, [getProjectList]);

  // 검색 결과를 필터링하는 함수
  const handleSearch = (searchText) => {
    const filtered = projectList.filter((project) =>
      project.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProject(filtered);
  };

  const handleNewPostClick = () => {
    navigate("/BoardRegister");
  };

  const handleProjectClick = (projectId) => {
    navigate(`/BoardInformation/${projectId}`); // 해당 게시글의 상세 페이지로 이동
  };

  return (
    <div className={styles.FreeBoard}>
      <h1 className={styles.header}>자유게시판</h1>
      {/* 게시글 목록 */}
      <div className={styles.body}>
        <div className={styles.tableHeader}>
          <span>번호</span>
          <span>제목</span>
          <span>작성자</span>
          <span>작성일</span>
          <span>조회수</span>
        </div>

        {filteredProject.length > 0 ? (
          filteredProject.map((project, index) => {
            const formattedDate = new Date(project.createdAt).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            });

            return (
              <div
                key={project.projectId}
                className={styles.projectRow}
                onClick={() => handleProjectClick(project.id)} // 클릭 시 상세 페이지로 이동
              >
                <span>{index + 1}</span>
                <span>{project.title}</span>
                <span>{project.createdBy}</span>
                <span>{formattedDate}</span>
                <span>{project.viewCount}</span>
              </div>
            );
          })
        ) : (
          <div className={styles.noPosts}>게시글이 없습니다.</div>
        )}
      </div>

      {/* 검색 기능 */}
      <div className={styles.searchBoard}>
        <SearchBoard onSearch={handleSearch} />
      </div>
    </div>
  );
}

export default FreeBoard;