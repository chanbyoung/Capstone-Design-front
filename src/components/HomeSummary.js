import styles from "./HomeSummary.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../lib/axios";
import { IconButton, Popover, Typography, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function HomeSummary() {
  const [projectList, setProjectList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMember, setSelectedMember] = useState(""); // 회원 정보 상태
  const navigate = useNavigate();

  const getProjectList = async () => {
    const response = await axios.get("/api/homes");
    setProjectList(response.data);
  };

  useEffect(() => {
    getProjectList();
  }, []);

  const handleUserClick = (event, createdBy) => {
    setAnchorEl(event.currentTarget);
    setSelectedMember(createdBy); // 클릭한 회원 정보 저장
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "user-popover" : undefined;

  return (
    <>
      <div className={styles.inner}>
        {projectList.map((project) => (
          <div className={styles.projectSummary} key={project.id}>
            <Link to={`/ProjectInformation/${project.id}`}>
              <img
                className={styles.photo}
                alt="img"
                src={require(`../assets/DefaultProjectImg.png`)}
              />
              <p className={styles.mainletter}>{project.title}</p>
            </Link>
            <div className={styles.userInfo}>
              <IconButton
                onClick={(event) => handleUserClick(event, project.createdBy)}>
                <AccountCircleIcon />
              </IconButton>
              <p className={styles.createdBy}>{project.createdBy}</p>
            </div>
          </div>
        ))}
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
        <Typography sx={{ p: 2 }}>{selectedMember}님의 정보로 이동하시겠습니까?</Typography>
        <Button
          onClick={() => {
            handleClosePopover();
            navigate(`/MemberPage/${selectedMember}`); // 사용자 정보 페이지로 이동
          }}
        >
          사용자 정보 보기
        </Button>
      </Popover>
    </>
  );
}

export default HomeSummary;