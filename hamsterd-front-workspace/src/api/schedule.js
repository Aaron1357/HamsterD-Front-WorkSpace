import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/hamsterd/",
});

// 스케줄 등록
export const addSchedule = async (data) => {
  return await instance.post("schedule", data);
};

// 스케줄 목록 받아오기
export const getScheduleList = async () => {
  return await instance.get("schedule");
};

// 특정 그룹 스케줄 목록 받아오기("/schedule/study/{groupNo}")
export const getScheduleOfGroup = async (groupNo) => {
  return await instance.get(`schedule/study/${groupNo}`);
};

// 특정 그룹의 날짜별 스케줄 목록 받아오기("/study/{groupNo}/{scheduleDate}")
export const getScheduleofGroupDate = async (groupNo, scheduleDate) => {
  return await instance.get(`schedule/study/${groupNo}/${scheduleDate}`);
};
