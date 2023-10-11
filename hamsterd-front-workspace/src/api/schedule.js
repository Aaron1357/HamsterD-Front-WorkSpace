import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/hamsterd/",
});

// 스케줄 등록
// export const addSchedule = async (data) => {
//   return await instance.post("schedule", data);
// };

export const addSchedule = async (data) => {
  return await instance.post("schedule", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
