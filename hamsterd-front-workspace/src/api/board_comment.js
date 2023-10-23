import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/hamsterd/",
});

//댓글 추가하기
export const addComment = async (data) => {
  console.log(data);
  try {
    const res = await instance.post("post/pcomment", data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

//댓글 조회하기
export const viewComment = async (postNo) => {
  try {
    console.log("댓글조회 api 넘어감");
    const res = await instance.get(`/post/${postNo}/pcomment`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

//댓글 수정하기
export const updateComment = async (data) => {
  try {
    console.log("댓글수정 api 넘어감");
    const res = await instance.put("/post/pcomment", data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
