import React, { useEffect, useState } from "react";
import axios from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import "./AppliesList.css";

const AppliesList = () => {
  const [groupedApplies, setGroupedApplies] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplies = async () => {
      try {
        const response = await axios.get("/api/applies");
        const applies = response.data;

        const grouped = applies.reduce((acc, apply) => {
          const { postTitle, applyStatus } = apply;

          if (!acc[postTitle]) {
            acc[postTitle] = {
              accept: [],
              reject: [],
              readUnread: [],
            };
          }

          if (applyStatus === "지원 수락") {
            acc[postTitle].accept.push(apply);
          } else if (applyStatus === "지원 반려") {
            acc[postTitle].reject.push(apply);
          } else {
            acc[postTitle].readUnread.push(apply);
          }

          return acc;
        }, {});

        setGroupedApplies(grouped);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching applies:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchApplies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="applies-list-container">
      <h1>지원서 목록</h1>
      {Object.keys(groupedApplies).map((postTitle) => (
        <div key={postTitle} className="post-section">
          <h2>{postTitle}에 대한 지원서입니다</h2>

          <div className="status-section">
            <h3>처리요청을 기다리는 지원서</h3>
            <ul>
              {groupedApplies[postTitle].readUnread.map((apply) => (
                <li
                  key={apply.id}
                  onClick={() => navigate(`/appliesList/${apply.id}`)}
                  className="apply-item"
                >
                  <p>
                    <strong>지원자:</strong> {apply.memberName}
                  </p>
                  <p>
                    <strong>지원분야:</strong> {apply.fieldCategory}
                  </p>
                  <p>
                    <strong>지원시간:</strong>{" "}
                    {new Date(apply.createdAt).toLocaleString()}
                  </p>
                  <p className="apply-status">
                    처리요청을 기다리는 지원서입니다
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="status-section">
            <h3>지원이 수락된 지원서</h3>
            <ul>
              {groupedApplies[postTitle].accept.map((apply) => (
                <li
                  key={apply.id}
                  onClick={() => navigate(`/appliesList/${apply.id}`)}
                  className="apply-item"
                >
                  <p>
                    <strong>지원자:</strong> {apply.memberName}
                  </p>
                  <p>
                    <strong>지원분야:</strong> {apply.fieldCategory}
                  </p>
                  <p>
                    <strong>지원시간:</strong>{" "}
                    {new Date(apply.createdAt).toLocaleString()}
                  </p>
                  <p className="apply-status">지원이 수락된 지원서입니다</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="status-section">
            <h3>지원이 취소처리된 지원서</h3>
            <ul>
              {groupedApplies[postTitle].reject.map((apply) => (
                <li
                  key={apply.id}
                  onClick={() => navigate(`/appliesList/${apply.id}`)}
                  className="apply-item"
                >
                  <p>
                    <strong>지원자:</strong> {apply.memberName}
                  </p>
                  <p>
                    <strong>지원분야:</strong> {apply.fieldCategory}
                  </p>
                  <p>
                    <strong>지원시간:</strong>{" "}
                    {new Date(apply.createdAt).toLocaleString()}
                  </p>
                  <p className="apply-status">지원이 취소처리된 지원서입니다</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppliesList;
