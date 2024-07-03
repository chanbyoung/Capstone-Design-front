import React from "react";
import { useParams } from "react-router-dom";
import Conversation from "./Conversation";

const ConversationApp = () => {
  // Get conversationId from route parameters
  const { conversationId } = useParams();

  return (
    <div>
      <h1>Conversation Details</h1>
      <Conversation conversationId={conversationId} />
    </div>
  );
};

export default ConversationApp;
