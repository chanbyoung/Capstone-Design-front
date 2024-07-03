import React from "react";
import { useParams } from "react-router-dom";
import ReadComponent from "../../components/question/ReadComponent";

function ReadPage(props) {
  const { qno } = useParams();

  return (
    <div>
      <div>Question Read Page component</div>
      <ReadComponent qno={qno} />
    </div>
  );
}

export default ReadPage;
