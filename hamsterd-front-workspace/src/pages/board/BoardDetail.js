import { detailBoard } from "../../api/boardFile";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BoardView from "./BoardView";
// import { viewPostNo } from "../../store/postSlice";

const BoardDetail = () => {
  const { postNo } = useParams();
  // const dispatch = useDispatch();
  console.log(postNo);
  const [board, setBoard] = useState([]);
  console.log(board);

  const getLoding = async (postNo) => {
    const resp = await detailBoard(postNo);
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
    </div>
  );
};
export default BoardDetail;
