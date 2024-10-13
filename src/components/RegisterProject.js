import React, { useState, useRef } from "react";
import styles from "./RegisterProject.module.css";
import defaultProjectImg from "../assets/DefaultProjectImg.png";
import axios from "../lib/axios";
import { useNavigate } from "react-router-dom";

function RegisterProject() {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const [imageFile, setImageFile] = useState(null);

  const [defaultProjectImgSrc, setDefaultProjectImgSrc] =
    useState(defaultProjectImg);

  const [projectInfo, setProjectInfo] = useState({
    title: "",
    category: "PROJECT",
    content: "",
    fieldList: [],
    startDate: "",
    endDate: "",
    imageUrl: "", // 이미지 URL 추가
  });

  const { title, content, fieldList, startDate, endDate } = projectInfo;

  const onChange = (event) => {
    const { value, name } = event.target;
    setProjectInfo({
      ...projectInfo,
      [name]: value,
    });
  };

  const handleFieldListChange = (index, event) => {
    const { name, value } = event.target;
    const newFieldList = [...fieldList];
    newFieldList[index][name] = name === "totalRecruitment" ? parseInt(value, 10) : value;
    setProjectInfo({
      ...projectInfo,
      fieldList: newFieldList,
    });
  };

  //직무 추가
  const addField = () => {
    setProjectInfo({
      ...projectInfo,
      fieldList: [...fieldList, { fieldCategory: "", totalRecruitment: 0 }],
    });
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
      setDefaultProjectImgSrc(URL.createObjectURL(event.target.files[0]));
    }
  };

  const cancel = () => {
    if (window.confirm("작업을 그만 두시겠습니까?")) {
      navigate(`/StudyList`);
    }
  };

  const postProject = async () => {
    const formData = new FormData();
    if (imageFile) {
      formData.append("image", imageFile);
    }

    // projectInfo 객체를 Blob 형태로 변환하여 formData에 추가
    formData.append("json", new Blob([JSON.stringify(projectInfo)], { type: "application/json" }));

    try {
      const res = await axios.post(`/api/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // 서버로부터 이미지 URL을 받아서 projectInfo에 저장
      const updatedProjectInfo = {
        ...projectInfo,
        imageUrl: res.data.imageUrl, // 서버에서 반환된 이미지 URL을 저장
      };
      setProjectInfo(updatedProjectInfo);

      alert("등록되었습니다.");
      navigate("/ProjectList");
    } catch (error) {
      console.error("프로젝트 등록 중 오류가 발생했습니다.", error);
    }
  };

  return (
    <>
      <div className={styles.RegisterProjectHeader}>
        <header>
          <h1>프로젝트 등록하기</h1>
        </header>
      </div>
      <main className={styles.RegisterProjectMain}>
        <div className={styles.projectName}>
          <h3>프로젝트명</h3>
          <input type="text" name="title" value={title} onChange={onChange} />
        </div>
        <div className={styles.projectInfo}>
          <h3>프로젝트 소개 및 기간</h3>
          <textarea
            name="content"
            cols="30"
            rows="10"
            value={content}
            onChange={onChange}
          />
          <div className={styles.date}>
            <h3>프로젝트 시작일</h3>
            <input
              type="date"
              name="startDate"
              value={startDate}
              onChange={onChange}
            />
          </div>
          <div className={styles.date}>
            <h3>프로젝트 종료일</h3>
            <input
              type="date"
              name="endDate"
              value={endDate}
              onChange={onChange}
            />
          </div>
        </div>
        <div className={styles.recruitmentDiv}>
          <h3>모집 직무</h3>
          {fieldList.map((field, index) => (
          <div key={index}>
          <select
            name="fieldCategory"
            value={field.fieldCategory}
            onChange={(event) => handleFieldListChange(index, event)}>
            <option value="">선택하세요</option>
            <option value="BACKEND">백엔드</option>
            <option value="FRONTEND">프론트엔드</option>
            <option value="DESIGNER">디자이너</option>
          </select>
          <input
            type="number"
            name="totalRecruitment"
            value={field.totalRecruitment}
            onChange={(event) => handleFieldListChange(index, event)}
          />
        </div>
      ))}
          <button onClick={addField}>직무 추가</button>
        </div>
        <div className={styles.language}>
          <h3>사용 기술 및 언어</h3>
        </div>
        <div className={styles.etc}>
          <h3>기타 참고사항</h3>
        </div>
        <div className={styles.buttonDiv}>
          <button className={styles.registerButton} onClick={postProject}>
            등록하기
          </button>
          <button className={styles.cancelButton} onClick={cancel}>
            취소하기
          </button>
        </div>
      </main>
    </>
  );
}

export default RegisterProject;