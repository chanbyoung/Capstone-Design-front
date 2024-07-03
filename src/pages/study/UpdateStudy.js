import React, { useState, useEffect, useRef } from "react";
import axios from "../../lib/axios";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./UpdateStudy.module.css";

const UpdateStudy = () => {
  const navigate = useNavigate();
  const { idx } = useParams();
  const fileInputRef = useRef();
  const [imageFile, setImageFile] = useState(null);
  const [defaultStudyImgSrc, setDefaultStudyImgSrc] = useState(null);
  const [studyInfo, setStudyInfo] = useState({
    title: "",
    category: "STUDY",
    content: "",
    fieldList: [],
    startDate: "",
    endDate: "",
  });

  const getStudy = async () => {
    try {
      const response = await axios.get(`/api/posts/${idx}`);
      setStudyInfo(response.data);
      setDefaultStudyImgSrc(response.data.image); // Assuming the image URL is part of the response
    } catch (error) {
      console.error("Error fetching study data:", error);
    }
  };

  useEffect(() => {
    getStudy();
  }, []);

  const { title, category, content, fieldList, startDate, endDate } = studyInfo;

  const onChange = (event) => {
    const { value, name } = event.target;
    setStudyInfo({
      ...studyInfo,
      [name]: value,
    });
  };

  const handleFieldListChange = (index, event) => {
    const { name, value } = event.target;
    const newFieldList = [...fieldList];
    newFieldList[index][name] =
      name === "totalRecruitment" ? parseInt(value, 10) : value;
    setStudyInfo({
      ...studyInfo,
      fieldList: newFieldList,
    });
  };

  const updateStudy = async () => {
    const formData = new FormData();
    if (imageFile) {
      formData.append("image", imageFile);
    }

    formData.append(
      "json",
      new Blob([JSON.stringify(studyInfo)], { type: "application/json" })
    );

    try {
      await axios.patch(`/api/posts/${idx}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("수정되었습니다.");
      navigate(`/StudyInformation/${idx}`);
    } catch (error) {
      console.error("스터디 수정 중 오류가 발생했습니다.", error);
    }
  };

  const cancel = () => {
    navigate("/StudyList");
  };

  return (
    <>
      <div className={styles.registerStudyHeader}>
        <header>
          <h1>스터디 수정하기</h1>
        </header>
      </div>
      <main className={styles.registerStudyMain}>
        <div className={styles.studyName}>
          <h3>스터디명</h3>
          <input type="text" name="title" value={title} onChange={onChange} />
        </div>
        <div className={styles.studyInfo}>
          <h3>스터디 소개 및 기간</h3>
          <textarea
            name="content"
            cols="30"
            rows="10"
            value={content}
            onChange={onChange}
          />
        </div>
        <div className={styles.studyDate}>
          <h3>스터디 시작일</h3>
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={onChange}
          />
        </div>
        <div className={styles.studyDate}>
          <h3>스터디 종료일</h3>
          <input
            type="date"
            name="endDate"
            value={endDate}
            onChange={onChange}
          />
        </div>
        <div className={styles.recruitmentDiv}>
          <h3>모집 인원</h3>
          {fieldList.map((field, index) => (
            <div key={index}>
              <input
                type="number"
                name="totalRecruitment"
                value={field.totalRecruitment}
                onChange={(event) => handleFieldListChange(index, event)}
              />
            </div>
          ))}
        </div>
        <div className={styles.buttons}>
          <button onClick={updateStudy} className={styles.btn}>
            수정하기
          </button>
          <button onClick={cancel} className={styles.btn}>
            삭제하기
          </button>
        </div>
      </main>
    </>
  );
};

export default UpdateStudy;
