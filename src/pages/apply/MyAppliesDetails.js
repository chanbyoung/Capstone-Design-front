import React, { useEffect, useState } from "react";
import axios from "../../lib/axios";
import { useParams, useNavigate } from "react-router-dom";
import "./ApplyDetails.css";

const MyApplyDetails = () => {
  const { applyId } = useParams();
  const navigate = useNavigate();
  const [apply, setApply] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApply = async () => {
      try {
        const response = await axios.get(`/api/applies/${applyId}`);
        setApply(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching apply details:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchApply();
  }, [applyId]);

  const deleteApply = async () => {
    try {
      await axios.delete(`/api/applies/${applyId}`);
      alert("Apply deleted successfully");
      navigate("/myApplies");
    } catch (err) {
      console.error("Error deleting apply:", err);
      alert("Failed to delete apply");
    }
  };

  const goToPostDetail = () => {
    if (apply.postCategory === "스터디") {
      navigate(`/StudyInformation/${apply.postId}`);
    } else if (apply.postCategory === "프로젝트") {
      navigate(`/ProjectInformation/${apply.postId}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="apply-details-container">
      <h1>지원 상세</h1>
      <div className="apply-details">
        <p>
          <strong>제목:</strong> {apply.postTitle}
        </p>
        <p>
          <strong>지원 분야:</strong> {apply.fieldCategory}
        </p>
        <p>
          <strong>내용:</strong> {apply.content}
        </p>
        <p>
          <strong>상태:</strong> {apply.applyStatus}
        </p>
        <div className="button-group">
          <button onClick={() => navigate(`/appliesList/my/edit/${applyId}`)}>
            지원서 수정
          </button>
          <button onClick={deleteApply}>지원서 삭제</button>
          <button onClick={goToPostDetail}>지원한 게시글 바로가기</button>
        </div>
      </div>
    </div>
  );
};

export default MyApplyDetails;
