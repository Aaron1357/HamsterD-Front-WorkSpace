import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/hamsterd/",
});

// 스케줄 등록
export const addStudyGroup = async (data) => {
  return await instance.post("studygroup", data);
};

// 스케줄 목록 받아오기
export const getScheduleList = async () => {
  return await instance.get("studygroup");
};
