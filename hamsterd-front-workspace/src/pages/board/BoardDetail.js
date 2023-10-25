import { detailBoard } from "../../api/boardFile";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BoardView from "./BoardView";
import BoardComment from "../board/BoardComment";

const BoardDetail = () => {
  const { postNo } = useParams();
  const [board, setBoard] = useState([]);

  const getLoding = async (postNo) => {
    console.log("getLoading " + postNo);
    const resp = await detailBoard(postNo);
    console.log("getloading " + resp);
    setBoard(resp);
  };

  useEffect(() => {
    getLoding(postNo);
  }, []);

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
