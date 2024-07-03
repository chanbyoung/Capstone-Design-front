import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";

const prefix = `${API_SERVER_HOST}/api/question`;

export const getOne = async (qno) => {
  const res = await axios.get(`${prefix}/${qno}`);

  return res.data;
};

export const getList = async (pageParam) => {
  const { page, size } = pageParam;

  const res = await axios.get(`${prefix}/list`, { params: { ...pageParam } });

  return res.data;
};

export const postAdd = async (questionObj) => {
  const res = await axios.post(`${prefix}/`, questionObj);

  return res.data;
};
