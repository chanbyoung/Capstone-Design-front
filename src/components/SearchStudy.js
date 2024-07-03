//eslint-disable-next-line
import * as React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import styles from "./SearchStudy.module.css";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../lib/axios";

/**검색 부분*/
function SearchStudy() {
  const [views, setViews] = useState("최신순");
  const [search, setSearch] = useState("");
  const [filteredProject, setFilteredProject] = useState([]);
  const [projectList, setProjectList] = useState([]);

  const getProjectList = async () => {
    const response = await axios.get("/api/posts", {
      params: {
        category: "STUDY",
      },
    });
    setProjectList(response.data.content);
    const sortedProject = sortProject(response.data.content, views);
    setFilteredProject(sortedProject);
  };
  useEffect(() => {
    getProjectList();
  }, []);

  const sortProject = (project, order) => {
    if (order === "최신순") {
      return project;
    } else if (order === "조회수 낮은순") {
      return project.sort((a, b) => a.viewCount - b.viewCount);
    } else if (order === "조회수 높은순") {
      return project.sort((a, b) => b.viewCount - a.viewCount);
    }
  };

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

  const handleChange = (event) => {
    const newSortOrder = event.target.value;
    setViews(newSortOrder);

    const filtered = projectList.filter((project) =>
      project.title.toLowerCase().includes(search)
    );
    const sortedProject = sortProject(filtered, newSortOrder);
    setFilteredProject(sortedProject);
  };

  //등록하기 버튼 함수
  const navigate = useNavigate();
  function moveToResisterStudy() {
    navigate("/RegisterStudy");
  }

  return (
    <>
      <div className={styles.SearchStudy}>
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
              placeholder="궁금한 스터디를 검색해보세요!"
              value={search}
              onChange={onSearchtext}
              onKeyDown={handleKeyDown}
            />
            <Divider sx={{ height: 28, m: 1 }} orientation="vertical" />
            <Button
              className={styles.searchButton1}
              label="Searchbtn"
              variant="contained"
              color="secondary"
              onClick={onSearchHandler}
            >
              검색
            </Button>
            <Divider sx={{ height: 28, m: 1 }} orientation="vertical" />
            <Button
              className={styles.searchButton2}
              label="스터디 등록하기"
              variant="contained"
              color="secondary"
              onClick={moveToResisterStudy}
            >
              스터디 등록하기
            </Button>
          </Paper>
        </div>
        <div>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">조회수</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={views}
              label="조회수"
              onChange={handleChange}
            >
              <MenuItem value={`최신순`}>최신순</MenuItem>
              <MenuItem value={`조회수 높은순`}>조회수 높은순</MenuItem>
              <MenuItem value={`조회수 낮은순`}>조회수 낮은순</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={styles.inner}>
          {filteredProject.map((project) => (
            <div className={styles.projectSummary}>
              <Link
                to={`/ProjectInformation/${project.id}`}
                key={project.projectId}
              >
                <img
                  className={styles.photo}
                  alt="img"
                  src={require(`../assets/DefaultProjectImg.png`)}
                />
                <p className={styles.pmainletter}>{project.title}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SearchStudy;
