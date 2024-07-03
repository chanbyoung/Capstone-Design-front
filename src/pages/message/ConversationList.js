import React, { useEffect, useState } from "react";
import axios from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import "./ConversationList.css";

const ConversationList = () => {
  const [groupedConversations, setGroupedConversations] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get("/api/messages/conversation");
        console.log("대화 목록 데이터:", response.data);

        // 데이터를 최신 메시지 순으로 정렬
        const sortedConversations = response.data.sort(
          (a, b) => new Date(b.recentMessage) - new Date(a.recentMessage)
        );

        // 그룹화된 대화 객체 생성
        const grouped = sortedConversations.reduce((acc, conversation) => {
          const { postId, postTitle } = conversation;
          if (!acc[postId]) {
            acc[postId] = { postTitle, conversations: [] };
          }
          acc[postId].conversations.push(conversation);
          return acc;
        }, {});

        setGroupedConversations(grouped);
        setLoading(false);
      } catch (err) {
        console.error("대화 목록을 가져오는 중 오류가 발생했습니다:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  if (loading) return <div className="loading">로딩 중...</div>;
  if (error)
    return <div className="error">오류가 발생했습니다: {error.message}</div>;

  return (
    <div className="conversation-list-container">
      <h1 className="page-title">대화 목록</h1>
      {Object.keys(groupedConversations).map((postId) => (
        <div key={postId} className="post-section">
          <h2 className="post-title">
            {groupedConversations[postId].postTitle}에 대한 대화입니다
          </h2>
          <ul className="conversation-list">
            {groupedConversations[postId].conversations.map((conversation) => (
              <li
                key={conversation.id}
                onClick={() => navigate(`/conversation/${conversation.id}`)}
                className="conversation-item"
              >
                <div className="conversation-info">
                  <span className="nickname">
                    {conversation.counterpartMember.nickname}
                  </span>
                  <span className="recent-message-time">
                    {new Date(conversation.recentMessage).toLocaleString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ConversationList;
