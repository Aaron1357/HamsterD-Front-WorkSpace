import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/hamsterd/",
});

// 스터디그룹 등록
export const addStudyGroup = async (data) => {
  console.log(data);
  return await instance.post("studygroup", data);
};

// 스터디그룹 목록 받아오기
export const getStudyGroupList = async () => {
  return await instance.get("studygroup");
};

// 그룹넘버를 기본키로 가지고 있는 스터디그룹에 속한 멤버 리스트
export const viewMemberList = async (groupNo) => {
  return await instance.get(`studygroup/${groupNo}/member`);
};

// 그룹넘버를 기본키로 가지고 있는 스터디그룹 방장 멤버
export const viewManager = async (groupNo) => {
  // console.log("그룹넘버" + groupNo);
  const result = await instance.get(`studygroup/${groupNo}/manager`);
  // console.log(result.data);
  return result.data;
};
