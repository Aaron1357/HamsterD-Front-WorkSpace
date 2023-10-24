import { detailBoard } from "../../api/boardFile";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BoardView from "./BoardView";
import BoardComment from "../board/BoardComment";

const BoardDetail = () => {
  const { postNo } = useParams();

  // const dispatch = useDispatch();
  console.log(postNo);
  const [board, setBoard] = useState([]);
  console.log(board);

  const getLoding = async (postNo) => {
    console.log("getLoading " + postNo);
    const resp = await detailBoard(postNo);
    console.log("getloading " + resp);
    setBoard(resp);

    // const resp = await axios.get(
    //   `http://localhost:8080/hamsterd/post/detail/${postNo}`
    // );
  };

  useEffect(() => {
    getLoding(postNo);
  }, []);

  // useEffect(() => {
  //   dispatch(viewPostNo(postNo));
  // }, [dispatch]);

  return (
    <div>
      <BoardView
        postNo={postNo}
        title={board.postTitle}
        desc={board.postContent}
      />
      <BoardComment postNo={postNo} />
    </div>
  );
};
export default BoardDetail;
