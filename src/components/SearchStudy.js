import React, { useState, useEffect } from "react";
import {
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  IconButton,
  Popover,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // 사용자 아이콘
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import styles from "./SearchStudy.module.css";

function SearchStudy() {
  const [views, setViews] = useState("최신순");
  const [search, setSearch] = useState("");
  const [filteredProject, setFilteredProject] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMember, setSelectedMember] = useState("");

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
    if (event.key === "Enter") {
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

  const navigate = useNavigate();

  function moveToResisterStudy() {
    navigate("/RegisterStudy");
  }

  const handleMemberClick = (event, createdBy) => {
    setAnchorEl(event.currentTarget);
    setSelectedMember(createdBy);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "member-popover" : undefined;

  return (
    <>
      <div className={styles.SearchStudy}>
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
        <div>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              maxWidth: "1200px",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
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
              variant="contained"
              color="secondary"
              onClick={onSearchHandler}
            >
              검색
            </Button>
            <Divider sx={{ height: 28, m: 1 }} orientation="vertical" />
            <Button
              className={styles.searchButton2}
              variant="contained"
              color="secondary"
              onClick={moveToResisterStudy}
            >
              스터디 등록하기
            </Button>
          </Paper>
        </div>
        <div className={styles.inner}>
          {filteredProject.map((project) => (
              <div className={styles.projectSummary} key={project.projectId}>
                <Link to={`/ProjectInformation/${project.id}`}>
                  <img
                      className={styles.photo}
                      alt="img"
                      src={require(`../assets/DefaultProjectImg.png`)}
                  />
                  <p className={styles.mainletter}>{project.title}</p>
                </Link>
                {/* 사용자 정보 표시 및 팝오버 */}
                <div className={styles.userInfo}>
                  <IconButton
                      onClick={(event) => handleMemberClick(event, project.createdBy)}
                  >
                    <AccountCircleIcon />
                  </IconButton>
                  <p className={styles.createdBy}>{project.createdBy}</p>
                </div>
              </div>
          ))}
        </div>
      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>
          {selectedMember}님의 정보로 이동하시겠습니까?</Typography>
        <Button
          onClick={() => {
            handleClosePopover();
            navigate(`/MemberPage/${selectedMember}`);
          }}
        >
          사용자 정보 보기
        </Button>
      </Popover>
    </>
  );
}

export default SearchStudy;