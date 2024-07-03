import React, { useEffect, useState } from "react";
import axios from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import "./MyAppliesList.css";

const MyAppliesList = () => {
  const [groupedMyApplies, setGroupedMyApplies] = useState({
    accepted: [],
    rejected: [],
    checking: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyApplies = async () => {
      try {
        const response = await axios.get("/api/applies/my");
        // 데이터를 최신 순으로 정렬
        const sortedMyApplies = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        // 상태별로 지원서 배열을 그룹화
        const grouped = {
          accepted: [],
          rejected: [],
          checking: [],
        };

        sortedMyApplies.forEach((apply) => {
          const { applyStatus } = apply;
          if (applyStatus === "지원 수락") {
            grouped.accepted.push(apply);
          } else if (applyStatus === "지원 반려") {
            grouped.rejected.push(apply);
          } else {
            grouped.checking.push(apply);
          }
        });

        setGroupedMyApplies(grouped);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching my applies:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchMyApplies();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="my-applies-list-container">
      <h1>나의 지원서 목록</h1>
      {groupedMyApplies.accepted.length > 0 && (
        <div className="status-section">
          <h2>지원이 수락된 지원서입니다</h2>
          <ul>
            {groupedMyApplies.accepted.map((apply) => (
              <li
                key={apply.id}
                onClick={() => navigate(`/appliesList/my/${apply.id}`)}
                className="apply-item"
              >
                <p>
                  <strong>제목:</strong> {apply.postTitle}
                </p>
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
              </li>
            ))}
          </ul>
        </div>
      )}
      {groupedMyApplies.rejected.length > 0 && (
        <div className="status-section">
          <h2>지원이 반려된 지원서입니다</h2>
          <ul>
            {groupedMyApplies.rejected.map((apply) => (
              <li
                key={apply.id}
                onClick={() => navigate(`/appliesList/my/${apply.id}`)}
                className="apply-item"
              >
                <p>
                  <strong>제목:</strong> {apply.postTitle}
                </p>
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
              </li>
            ))}
          </ul>
        </div>
      )}
      {groupedMyApplies.checking.length > 0 && (
        <div className="status-section">
          <h2>확인중인 지원서입니다</h2>
          <ul>
            {groupedMyApplies.checking.map((apply) => (
              <li
                key={apply.id}
                onClick={() => navigate(`/appliesList/my/${apply.id}`)}
                className="apply-item"
              >
                <p>
                  <strong>제목:</strong> {apply.postTitle}
                </p>
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
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyAppliesList;
