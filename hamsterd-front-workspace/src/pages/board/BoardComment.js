import {
  addComment,
  viewComment,
  updateComment,
  deleteComment,
} from "../../api/board_comment";
import { useState, useEffect } from "react";

const BoardComment = ({ postNo }) => {
  //댓글 저장해서 db로 넘기는 곳
  const [comments, setComments] = useState([]);

  //댓글 값 넣는 곳
  const [text, setText] = useState("");
//
  //댓글 번호 확인하기 위한 상태관리
  const [selectedCommentIndex, setSelectedCommentIndex] = useState(0);
  // const [openInputNo, setOpenInputNo] = useState(0);

  //user를 직접 사용하기 전에 JSON 문자열을 파싱하여 객체로 변환
  const user = JSON.parse(localStorage.getItem("user"));

  //처음 페이지 들어왔을때 댓글 보기
  const getCommentHandler = async () => {
    const response = await viewComment(postNo);
    setComments(response);
  };

  //댓글 추가하기 버튼
  const onClick = async () => {
    const data = {
      commentContent: text,
      post: { postNo: postNo },
      member: { memberNo: user.memberNo },
    };
    const result = await addComment(data);
    console.log(result);
    setComments([result, ...comments]);
    // getCommentHandler();
  };

  //댓글 수정하기 버튼
  const updateClick = async (e) => {
    setSelectedCommentIndex(e.target.closest(".comment").id);
    const data = {
      commentNo: e.target.closest(".comment").id,
      commentContent: text,
      post: { postNo: postNo },
    };
    await updateComment(data);
    setSelectedCommentIndex(0);
    getCommentHandler();
  };

  //댓글 삭제버튼
  const deleteClick = async (e) => {
    await deleteComment(e.target.closest(".comment").id);
    getCommentHandler();
    //페이지 새로고침
    // window.location.reload();
  };

  //수정하기 눌렀을때 댓글 번호 담아주기
  //댓글 번호가 selectedCommentIndex와 같으면 수정할수있음
  const openUpdateModal = async (e) => {
    setSelectedCommentIndex(e.target.closest(".comment").id);
  };
  console.log("selectedCommentIndex" + selectedCommentIndex);

  //input란에 값 댓글 추가할 값 넣으면 setText로 값 이동
  const handler = async (e) => {
    console.log(e.target.value);
    setText(e.target.value);
  };

  //실행되자마자 댓글 뿌리기
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
                {selectedCommentIndex === item.commentNo ? (
                  <tr>
                    <td>{index + 1}</td>
                    <td>닉네임: {item?.member?.nickname}</td>

                    <td>
                      <label>댓글 :</label>
                      <input type="text" onChange={handler} />
                    </td>
                    <button onClick={updateClick}>수정하기</button>
                    <button onClick={deleteClick}>삭제하기</button>
                  </tr>
                ) : (
                  <tr>
                    <td>{index + 1}</td>
                    <td>닉네임: {item?.member?.nickname}</td>
                    <td>댓글: {item?.commentContent}</td>
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
