import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../lib/axios";
import Project from "../pages/Project";

function ProjectDetail() {
  const [project, setProject] = useState({});
  const { idx } = useParams();

  //게시글 정보 가져오기
  const getProject = async () => {
    try {
      const response = await axios.get(`/api/posts/${idx}`);
      console.log(response.data);
      setProject(response.data);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <div>
      <Project
        title={project.title}
        content={project.content}
        fieldList={project.fieldList}
        imageUrl={project.image} // 이미지 URL 추가
        memberId={project.memberId} //추가부분
        startDate={project.startDate} // 추가 부분
        endDate={project.endDate} // 추가 부분
        isLiked={project.isLiked}
      />
    </div>
  );
}

export default ProjectDetail;
