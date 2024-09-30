import React, { useState } from "react";
import { Button, Paper, Divider, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./SearchBoard.module.css";

function SearchBoard({ onSearch }) {
  const [search, setSearch] = useState("");
  const [searchCondition, setSearchCondition] = useState("title"); // 기본 검색 조건

  const navigate = useNavigate();

  const onSearchTextChange = (event) => {
    setSearch(event.target.value.toLowerCase());
    onSearch(event.target.value);
  };

  const onSearchHandler = () => {
    onSearch(search, searchCondition); // 검색 조건과 함께 검색 수행
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSearchHandler();
    }
  };

  const moveToRegisterBoard = () => {
    navigate("/BoardRegister");
  };

  return (
    <div className={styles.main}>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: "100%", maxWidth: "900px", margin: "auto" }}
        onSubmit={(e) => e.preventDefault()}
      >
        <Select
          value={searchCondition}
          onChange={(e) => setSearchCondition(e.target.value)}
          displayEmpty
          sx={{ marginRight: 1 }} // 드롭다운과 검색 입력 사이 여백
        >
          <MenuItem value="title">제목</MenuItem>
          <MenuItem value="author">작성자</MenuItem>
        </Select>
        <input
          className={styles.search}
          type="text"
          placeholder="궁금한 게시글을 검색해보세요!"
          value={search}
          onChange={onSearchTextChange}
          onKeyDown={handleKeyDown}
        />
        <Divider sx={{ height: 28, m: 1 }} orientation="vertical" />
        <Button
          className={styles.button}
          variant="contained"
          color="secondary"
          onClick={onSearchHandler}
        >
          검색
        </Button>
        <Divider sx={{ height: 28, m: 1 }} orientation="vertical" />
        <Button
          className={styles.button2}
          variant="contained"
          color="secondary"
          onClick={moveToRegisterBoard}
        >
          게시글 등록하기
        </Button>
      </Paper>
    </div>
  );
}

export default SearchBoard;