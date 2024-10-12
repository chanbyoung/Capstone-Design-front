import React, { useState, useEffect } from "react";
import styles from "./Study.module.css";
import axios from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Study = ({
                 title,
                 content,
                 fieldList = [],
                 imageUrl = {},
                 memberId,
                 startDate,
                 endDate,
                 isLiked: initialIsLiked, // 서버에서 받아온 '좋아요' 상태 플래그
                 isOwner, // 권한 여부를 나타내는 props
               }) => {
  const navigate = useNavigate();
  const { idx } = useParams();

  const [isLiked, setIsLiked] = useState(initialIsLiked); // 처음에 서버에서 받은 값으로 설정
  useEffect(() => {
    setIsLiked(initialIsLiked);
  }, [initialIsLiked]);

  const toggleLike = async () => {
    try {
      await axios.post(`/api/likes/${idx}`);
      setIsLiked(!isLiked); // 좋아요 상태를 토글
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  };

  const moveToUpdate = () => {
    navigate(`/UpdateStudy/${idx}`);
  };

  const moveToApply = (fieldCategory) => {
    navigate(`/Applycation/${idx}`, { state: { fieldCategory } });
  };

  const deleteStudy = async () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      await axios.delete(`/api/posts/${idx}`).then((res) => {
        alert("삭제되었습니다.");
        navigate("/StudyList");
      });
    }
  };

  const startConversation = async () => {
    try {
      const response = await axios.post("/api/messages/conversation", {
        postId: idx,
        receiverId: memberId,
      });
      navigate(`/conversation/${response.data.id}`);
    } catch (err) {
      console.error("Failed to start conversation:", err);
      alert("Failed to start conversation");
    }
  };

  return (
      <div className={styles.studyInformation}>
        <header className={styles.studyInfoHeader}>
          <div className={styles.headerInfo}>
            <div className={styles.headerInfoTitle}>
              <h1>{title}</h1>
            </div>
            <button onClick={startConversation} className={styles.chatButton}>
              작성자와 채팅
            </button>
          </div>
          <button onClick={toggleLike} className={styles.likeButton}>
            {isLiked ? "♥" : "♡"} {/* 좋아요 상태에 따른 하트 모양 */}
          </button>
        </header>
        <main className={styles.studyInfoMain}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>스터디 소개 및 기간</h3>
            <hr />
            <div className={styles.contents}>
              <p className={styles.date}>
                스터디 기간 : {startDate} ~ {endDate}
              </p>
              <p>{content}</p>
            </div>
          </div>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>현재 모집 현황</h3>
            <hr />
            <div className={styles.contents}>
              {fieldList.map((field, index) => (
                  <div key={index} className={styles.recruitmentDiv}>
                    <p>{field.fieldCategory}&nbsp;</p>
                    <p>
                      {field.currentRecruitment} / {field.totalRecruitment}
                    </p>
                    {!isOwner &&
                    <button onClick={() => moveToApply(field.fieldCategory)}>
                      지원
                    </button>
                 }
                  </div>
              ))}
            </div>
          </div>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>기술</h3>
            <hr />
            <div className={styles.contents}>
              <p>기술 이미지</p>
            </div>
          </div>
        </main>
        <footer>
          <div className={styles.inner}>
            {/* isOwner가 true일 때만 버튼을 보여줌 */}
            {isOwner && (
                <>
                  <button onClick={moveToUpdate} className={styles.btn}>
                    수정하기
                  </button>
                  <button onClick={deleteStudy} className={styles.btn}>
                    삭제하기
                  </button>
                </>
            )}
          </div>
        </footer>
      </div>
  );
};

export default Study;