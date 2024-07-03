import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../lib/axios";
import "./Conversation.css";

const Conversation = () => {
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [opponentId, setOpponentId] = useState(null);
  const [postId, setPostId] = useState(null); // Added postId state
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const { conversationId } = useParams();

  useEffect(() => {
    fetchConversation();
  }, [conversationId]);

  const fetchConversation = async () => {
    try {
      const response = await axios.get(
        `/api/messages/conversation/${conversationId}`
      );
      setConversation(response.data);
      setOpponentId(response.data.opponentId); // Set opponent ID
      setPostId(response.data.postId); // Set postId from the response
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (message.trim()) {
      try {
        await axios.post("/api/messages", {
          content: message,
          receiverId: opponentId,
          postId: postId, // Include postId in the request
        });
        setMessage("");
        fetchConversation(); // Fetch conversation again after sending the message
      } catch (err) {
        console.error("Failed to send message:", err);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === `Enter`) {
      event.preventDefault();
      sendMessage();
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="conversation-container">
      {/* Conversation messages */}
      <ul className="message-list">
        {conversation.messageList
          .sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt))
          .map((message) => (
            <li
              key={message.id}
              className={message.senderId === opponentId ? "received" : "sent"}
            >
              <div className="message-content">
                <strong>{message.senderName}:</strong>
                <span>{message.content}</span>
                <em>({new Date(message.sentAt).toLocaleString()})</em>
              </div>
            </li>
          ))}
      </ul>
      {/* Message input box */}
      <div className="message-input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a message..."
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Conversation;
