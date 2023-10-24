import {
  addComment,
  viewComment,
  updateComment,
} from "../../api/board_comment";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BoardCommentUpdate from "../board/BoardCommentUpdate";
const BoardComment = ({ postNo }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const [selectedCommentIndex, setSelectedCommentIndex] = useState(0);
  const [openInputNo, setOpenInputNo] = useState(0);

  //user를 직접 사용하기 전에 JSON 문자열을 파싱하여 객체로 변환
  const user = JSON.parse(localStorage.getItem("user"));

  const onClick = async () => {
    console.log("user" + user.nickname);
    const data = {
      commentContent: text,
      post: { postNo: postNo }, // post 객체를 포함하여 전달
    };
    await addComment(data);
  };

  const getCommentHandler = async () => {
    const response = await viewComment(postNo);
    console.log(response);
    setComments(response);
  };

  const updateClick = async (e) => {
    setSelectedCommentIndex(e.target.closest(".comment").id);
    const data = {
      commentNo: e.target.closest(".comment").id,
      commentContent: text,
      postNo: postNo, // post 객체를 포함하여 전달
    };
    await updateComment(data);

    console.log(data);
  };

  const deleteClick = () => {};

  const openUpdateModal = async (e) => {
    console.log(e.target.closest(".comment").id);

    setSelectedCommentIndex(e.target.closest(".comment").id);
    setOpenInputNo(e.target.closest(".comment").id);
    // updateClick(selectedCommentIndex);
  };
  console.log("selectedCommentIndex" + selectedCommentIndex);

  //input란에 값을 넣으면 setText로 값 이동
  const handler = async (e) => {
    console.log(e.target.value);
    setText(e.target.value);
  };

  useEffect(() => {
    getCommentHandler();
  }, [postNo]);

  return (
    <div>
      <div>
        <label>댓글</label>
        <input type="text" onChange={handler} />
        <button onClick={onClick}>댓글 작성하기</button>
      </div>
      <div>
        {selectedCommentIndex <= 0 ? (
          <div>
            {comments?.map((item, index) => (
              <div
                key={item.commentNo}
                id={`${item.commentNo}`}
                className="comment"
              >
                {console.log("댓글 뿌리기 " + item)}
                <tr>
                  <td>{index + 1}</td>
                  <td>닉네임: {item?.member?.nickname}</td>
                  <td>댓글: {item?.commentContent}</td>
                  <button onClick={openUpdateModal}>수정하기</button>
                  <button onClick={deleteClick}>삭제하기</button>
                </tr>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {comments?.map((item, index) => (
              <div key={item.commentNo} id={item.commentNo} className="comment">
                {selectedCommentIndex == item.commentNo ? (
                  <tr>
                    <td>{index + 1}</td>
                    <td>닉네임: {item?.member?.nickname}</td>
                    {console.log(openInputNo)}
                    {console.log(selectedCommentIndex)}

                    <td>
                      <label>댓글</label>
                      <input type="text" onChange={handler} />
                    </td>
                    <button onClick={updateClick}>수정하기</button>
                    <button onClick={deleteClick}>삭제하기</button>
                  </tr>
                ) : (
                  <tr>
                    <td>{index + 1}</td>
                    <td>닉네임: {item?.member?.nickname}</td>
                    <button onClick={updateClick}>수정하기</button>
                    <button onClick={deleteClick}>삭제하기</button>
                  </tr>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardComment;
