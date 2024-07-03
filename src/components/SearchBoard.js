//eslint-disable-next-line
import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import styles from "./SearchBoard.module.css";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";

/**검색 부분*/
function SearchBoard() {
  const [search, setSearch] = useState("");
  const [filteredProject, setFilteredProject] = useState([]);
  const [projectList, setProjectList] = useState([]);

  const getProjectList = async () => {
    const response = await axios.get("/api/posts", {
      params: {
        category: "GENERAL",
      },
    });
    setProjectList(response.data.content);
    setFilteredProject(response.data.content);
  };
  useEffect(() => {
    getProjectList();
  }, []);

  const onSearchtext = (event) => {
    const searchtext = event.target.value.toLowerCase();
    setSearch(searchtext);
  };
  const onSearchHandler = () => {
    const filtered = projectList.filter((project) =>
      project.title.toLowerCase().includes(search)
    );
    setFilteredProject(filtered);
  };
  const handleKeyDown = (event) => {
    if (event.key === `Enter`) {
      event.preventDefault();
      onSearchHandler();
    }
  };

  //등록하기 버튼 함수
  const navigate = useNavigate();
  function moveToResisterBoard() {
    navigate("/BoardRegister");
  }

  return (
    <>
      <div className={styles.main}>
        <div className={styles.inner}>
          {filteredProject.map((project) => (
            <div className={styles.projectSummary}>
              <Link
                to={`/BoardInformation/${project.id}`}
                key={project.projectId}
              >
                <p className={styles.pmainletter}>{project.title}</p>
              </Link>
            </div>
          ))}
        </div>
        <div>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "1200px",
            }}
          >
            <input
              className={styles.search}
              type="text"
              placeholder="궁금한 게시글을 검색해보세요!"
              value={search}
              onChange={onSearchtext}
              onKeyDown={handleKeyDown}
            />
            <Divider sx={{ height: 28, m: 1 }} orientation="vertical" />
            <Button
              className={styles.button}
              label="Searchbtn"
              variant="contained"
              color="secondary"
              onClick={onSearchHandler}
            >
              검색
            </Button>
            <Divider sx={{ height: 28, m: 1 }} orientation="vertical" />
            <Button
              className={styles.button2}
              label="게시글 작성하기"
              variant="contained"
              color="secondary"
              onClick={moveToResisterBoard}
            >
              게시글 작성하기
            </Button>
          </Paper>
        </div>
      </div>
    </>
  );
}

export default SearchBoard;
