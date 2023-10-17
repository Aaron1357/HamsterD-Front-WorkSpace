import { detailBoard } from "../../api/boardFile";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Board2 from "../board/Board2";
// import { viewPostNo } from "../../store/postSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const BoardDetail = () => {
  const { postNo } = useParams();
  // const dispatch = useDispatch();
  console.log(postNo);
  const [board, setBoard] = useState([]);
  console.log(board);

  const getLoding = async () => {
    // detailBoard().then((res) => setBoard(res));
    // console.log(setBoard);
    const resp = await axios.get(
      `http://localhost:8080/hamsterd/post/detail/${postNo}`
    );

    console.log(resp.data);
    setBoard(resp.data);
  };

  useEffect(() => {
    getLoding();
  }, []);

  // useEffect(() => {
  //   dispatch(viewPostNo(postNo));
  // }, [dispatch]);

  return (
    <div>
      <table>
        <thead>
          <p>{board.postNo}</p>
          <p>{board.postTitle}</p>
        </thead>

        <div dangerouslySetInnerHTML={{ __html: board.postContent }} />
      </table>
    </div>
  );
};
export default BoardDetail;
