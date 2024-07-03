import React, { useState, useEffect, useRef } from "react";
import axios from "../lib/axios";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./UpdateProject.module.css";

const UpdateProject = () => {
  const navigate = useNavigate();
  const { idx } = useParams();
  const fileInputRef = useRef();
  const [imageFile, setImageFile] = useState(null);
  const [defaultProjectImgSrc, setDefaultProjectImgSrc] = useState(null);
  const [projectInfo, setProjectInfo] = useState({
    title: "",
    category: "PROJECT",
    content: "",
    fieldList: [],
    startDate: "",
    endDate: "",
  });

  const getProject = async () => {
    try {
      const response = await axios.get(`/api/posts/${idx}`);
      setProjectInfo(response.data);
      setDefaultProjectImgSrc(response.data.image); // Assuming the image URL is part of the response
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  const { title, category, content, fieldList, startDate, endDate } =
    projectInfo;

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
    newFieldList[index][name] =
      name === "totalRecruitment" ? parseInt(value, 10) : value;
    setProjectInfo({
      ...projectInfo,
      fieldList: newFieldList,
    });
  };

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

  const updateProject = async () => {
    const formData = new FormData();
    if (imageFile) {
      formData.append("image", imageFile);
    }

    formData.append(
      "json",
      new Blob([JSON.stringify(projectInfo)], { type: "application/json" })
    );

    try {
      await axios.patch(`/api/posts/${idx}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("수정되었습니다.");
      navigate(`/ProjectInformation/${idx}`);
    } catch (error) {
      console.error("프로젝트 수정 중 오류가 발생했습니다.", error);
    }
  };

  const cancel = () => {
    navigate("/ProjectList");
  };

  return (
    <>
      <div className={styles.registerProjectHeader}>
        <header>
          <h1>프로젝트 수정하기</h1>
        </header>
      </div>
      <main className={styles.registerProjectMain}>
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
        </div>
        <div className={styles.projectDate}>
          <h3>프로젝트 시작일</h3>
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={onChange}
          />
        </div>
        <div className={styles.projectDate}>
          <h3>프로젝트 종료일</h3>
          <input
            type="date"
            name="endDate"
            value={endDate}
            onChange={onChange}
          />
        </div>
        <div className={styles.recruitmentDiv}>
          <h3>모집 직무</h3>
          {fieldList.map((field, index) => (
            <div key={index} className={styles.fieldItem}>
              <input
                type="text"
                name="fieldCategory"
                value={field.fieldCategory}
                onChange={(event) => handleFieldListChange(index, event)}
              />
              <input
                type="number"
                name="totalRecruitment"
                value={field.totalRecruitment}
                onChange={(event) => handleFieldListChange(index, event)}
              />
            </div>
          ))}
          <button onClick={addField} className={styles.addFieldBtn}>
            직무 추가
          </button>
        </div>
        <div className={styles.language}>
          <h3>사용 기술 및 언어</h3>
        </div>
        <div className={styles.buttons}>
          <button
            onClick={updateProject}
            className={`${styles.btn} ${styles.updateBtn}`}
          >
            수정하기
          </button>
          <button
            onClick={cancel}
            className={`${styles.btn} ${styles.cancelBtn}`}
          >
            삭제하기
          </button>
        </div>
      </main>
    </>
  );
};

export default UpdateProject;
