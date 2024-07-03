import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../lib/axios";
import Study from "../../pages/study/Study";

function StudyDetail() {
  const [study, setStudy] = useState({});
  const { idx } = useParams();

  const getStudy = async () => {
    const response = await axios.get(`/api/posts/${idx}`);
    setStudy(response.data);
  };

  useEffect(() => {
    getStudy();
  }, []);

  return (
    <div>
      <Study
        title={study.title}
        content={study.content}
        startDate={study.startDate} // 추가 부분
        endDate={study.endDate} // 추가 부분
        fieldList={study.fieldList}
        imageUrl={study.image} // 이미지 URL 추가
        memberId={study.memberId} //추가부분
      />
    </div>
  );
}

export default StudyDetail;
