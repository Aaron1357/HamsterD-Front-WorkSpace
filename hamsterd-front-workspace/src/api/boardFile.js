import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/hamsterd/",
});

//작성한 게시물 값(title, content) db에 보내기
export const addFile = async (data) => {
  console.log(data);

  return await instance.post("post", data);
};

//기존 게시물에서 수정하기
export const updateBoard = async (data) => {
  try {
    const res = await instance.put("updatePost", data);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

//기존 게시물 조회수 업데이트하기
export const updateBoardView = async (postNo) => {
  try {
    console.log("게시물 조회 api들어옴");
    const res = await instance.put(`post/boardView/${postNo}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

//db에 있는 데이터 끌어와서 전체 게시물 리스트 보기
export const searchBoardList = async (page) => {
  console.log(page);
  let url = `posts?page=${page}`;

  try {
    const res = await instance.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

//게시물 번호에 해당하는 개별 게시물 보기
export const detailBoard = async (postNo) => {
  try {
    console.log(postNo);
    const res = await instance.get(`post/detail/${postNo}`);
    console.log("api 값 보내기 res.data" + res.data);
    console.log("api 값 보내기 res" + res);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

//게시물 삭제
export const deletePost = async (postNo) => {
  try {
    const res = await instance.delete(`deletePost/${postNo}`);
    console.log("delete의 res" + res);
    console.log("delete의 postNo" + postNo);
    return res;
  } catch (error) {
    console.log(error);
  }
};
