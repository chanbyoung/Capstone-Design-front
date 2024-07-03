import React, { useState, useEffect } from "react";
import axios from "../../lib/axios";
import { useParams, useNavigate } from "react-router-dom";
import "./EditApply.css";

const EditApply = () => {
  const { applyId } = useParams();
  const navigate = useNavigate();
  const [apply, setApply] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApply = async () => {
      try {
        const response = await axios.get(`/api/applies/${applyId}`);
        setApply(response.data);
        setContent(response.data.content);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching apply details:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchApply();
  }, [applyId]);

  const updateApply = async () => {
    try {
      await axios.patch(`/api/applies/${applyId}`, { content });
      alert("Apply updated successfully");
      navigate(`/appliesList/my/${applyId}`);
    } catch (err) {
      console.error("Error updating apply:", err);
      alert("Failed to update apply");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="edit-apply-container">
      <h1>지원서 수정</h1>
      <div className="edit-apply">
        <p>
          <strong>제목:</strong> {apply.postTitle}
        </p>
        <p>
          <strong>지원 분야:</strong> {apply.fieldCategory}
        </p>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="10"
          cols="50"
        />
        <div className="button-group">
          <button onClick={updateApply}>저장</button>
          <button onClick={() => navigate(`/appliesList/my/${applyId}`)}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditApply;
