import { useState } from "react";
const BoardCommentUpdate = ({ comment }) => {
  const [comments, setComments] = useState([]);

  return (
    <div>
      <label>댓글</label>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComments(e.target.value)}
      />
      {/* <button onClick={onClick}>댓글 작성하기</button> */}
    </div>
  );
};

export default BoardCommentUpdate;
