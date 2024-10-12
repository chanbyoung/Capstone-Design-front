import styles from "./ProjectSummary.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import { Button, IconButton, Popover, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function ProjectSummary() {
  const [projectList, setProjectList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMember, setSelectedMember] = useState("");
  const [open, setOpen] = useState(false); // 팝오버 상태 추가
  const navigate = useNavigate();

  const getProjectList = async () => {
    const response = await axios.get("/api/posts/likePosts", {
      params: {
        category: "PROJECT",
      },
    });
    setProjectList(response.data); // 리스트 데이터 설정
  };

  const handleMemberClick = (event, createdBy) => {
    setAnchorEl(event.currentTarget);
    setSelectedMember(createdBy);
    setOpen(true); // 팝오버 열기
  };

  const handleClosePopover = () => {
    setOpen(false); // 팝오버 닫기
    setSelectedMember(""); // 선택된 사용자 초기화
  };

  useEffect(() => {
    getProjectList();
  }, []);

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
                      onClick={(event) => handleMemberClick(event, project.createdBy)}>
                    <AccountCircleIcon />
                  </IconButton>
                  <p className={styles.createdBy}>{project.createdBy}</p>
                </div>
              </div>
          ))}
        </div>
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
        >
          <Typography sx={{ p: 2 }}>
            {selectedMember}님의 정보로 이동하시겠습니까?
          </Typography>
          <Button
              onClick={() => {
                handleClosePopover();
                // 사용자 정보 보기 페이지로 이동
                navigate(`/MemberPage/${selectedMember}`);
              }}
          >
            사용자 정보 보기
          </Button>
        </Popover>
      </>
  );
}

export default ProjectSummary;