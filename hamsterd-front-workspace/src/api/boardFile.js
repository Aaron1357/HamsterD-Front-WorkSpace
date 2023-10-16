import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/hamsterd/",
});

//게시물 값 db에 보내기

export const addFile = async (data) => {
  console.log(data);

  return await instance.post("post", data);
};

export const addFileURL = async (formData) => {
  console.log(formData);
  return await instance.post("post/upload", formData);
};

//db에 있는 데이터 끌어와서 게시물에 보이게끔 하기

export const searchBoardList = async () => {
  try {
    const res = await instance.get("post");
    return res.data;
  } catch (error) {
    console.error(error);
  }

  console.log();
};

export const detailBoard = async () => {
  await instance.get("post/postNo").data;
};
