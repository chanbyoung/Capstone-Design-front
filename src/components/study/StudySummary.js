//eslint-disable-next-line
import { Link } from "react-router-dom";
import styles from "./StudySummary.module.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../lib/axios";
import { Button, IconButton, Popover, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function StudySummary() {
  const [studyList, setStudyList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMember, setSelectedMember] = useState("");
  const [open, setOpen] = useState(false); // 팝오버 상태 추가
  const navigate = useNavigate();

  // 스터디 리스트 받아오는 함수
  const getStudyList = async () => {
    const response = await axios.get("/api/posts/likePosts", {
      params: {
        category: "STUDY",
      },
    });
    setStudyList(response.data); // 데이터 형식을 ProjectSummary와 동일하게 변경
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
    getStudyList();
  }, []);

  return (
      <>
        <div className={styles.inner}>
          {studyList.map((study) => (
              <div className={styles.projectSummary} key={study.id}>
                <Link to={`/StudyInformation/${study.id}`}>
                  <img
                      className={styles.photo}
                      alt="img"
                      src={require(`../../assets/DefaultStudyImg.png`)}
                  />
                  <p className={styles.mainletter}>{study.title}</p>
                </Link>
                <div className={styles.userInfo}>
                  <IconButton
                      onClick={(event) => handleMemberClick(event, study.createdBy)}>
                    <AccountCircleIcon />
                  </IconButton>
                  <p className={styles.createdBy}>{study.createdBy}</p>
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
                        navigate(`/MemberPage/${selectedMember}`);
                      }}
                  >
                    사용자 정보 보기
                  </Button>
                </Popover>
      </>
  );
}

export default StudySummary;