import { useState, useEffect } from "react";
import {
  addInComment,
  viewInComment,
  deleteInComment,
  updateInComment,
} from "../../api/board_comment";
import { useParams } from "react-router-dom";
//BoardComment에서 값 받아옴
const BoardInComment = ({ commentNo }) => {
  //router에서 param값 받아옴
  const { postNo } = useParams();

  const [text, setText] = useState("");
  const [succ, setSucc] = useState(false);
  const [inComments, setInComments] = useState([]);

  //대댓글 번호 확인하기 위한 상태관리
  const [selectedInCommentIndex, setSelectedInCommentIndex] = useState(0);

  //input란에 값 댓글 추가할 값 넣으면 setText로 값 이동
  const handler = async (e) => {
    console.log(e.target.value);
    setText(e.target.value);
  };
  //해당 메서드 실행되면 대댓글 값 나타남
  const getInCommentHandler = async () => {
    const response = await viewInComment(postNo, commentNo);
    console.log(response);
    setInComments([...response]);
  };

  //실행되면 바로 대댓글 뿌리기~~
  useEffect(() => {
    getInCommentHandler();
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  //대댓글 추가하기 버튼
  const onClick = async () => {
    const data = {
      inCoCon: text,
      postComment: { commentNo: commentNo },
      post: { postNo: postNo },
      member: { memberNo: user.memberNo },
    };
    const result = await addInComment(data);
    console.log(commentNo);
    if (result) setSucc(true);
  };
  //대댓글 추가하면 다시 화면에 띄우게 하려고 useEffect 씀
  useEffect(() => {
    if (succ) {
      setSucc(false);
      getInCommentHandler();
    }
  }, [succ]);

  const updateClick = async (e) => {
    console.log("updateClick 됨 ?");
    const data = {
      inCoNo: e.target.closest(".inComment").id,
      inCoCon: text,
    };
    await updateInComment(data);
    setSelectedInCommentIndex(0);
    getInCommentHandler();
  };
  //대댓글 삭제버튼
  const deleteClick = async (e) => {
    await deleteInComment(e.target.closest(".inComment").id);
    getInCommentHandler();
  };

  //수정하기 버튼을 클릭하면 대댓글 번호가 index로 넘어감
  const openUpdateModal = async (e) => {
    console.log("수정되게 해줘");
    setSelectedInCommentIndex(e.target.closest(".inComment").id);
    // setSelectedInCommentIndex(0);
  };

  return (
    <div>
      <div>
        <label>대댓글</label>
        <input type="text" onChange={handler} />
        <button onClick={onClick}>댓글 작성하기</button>
      </div>
      <div>
        {/* 값이 0 초기값일때는 기본 댓글만 보여짐 */}
        {selectedInCommentIndex <= 0 ? (
          <table>
            <tbody>
              {inComments?.map((item, index) => (
                <tr
                  key={item.inCoNo}
                  id={`${item.inCoNo}`}
                  className="inComment"
                >
                  {console.log("대댓글 뿌리기 " + item)}

                  <td>{index + 1}</td>
                  <td>닉네임: {item?.member?.nickname}</td>
                  <td>댓글: {item?.inCoCon}</td>
                  <td>
                    <button onClick={openUpdateModal}>수정하기</button>
                  </td>
                  <td>
                    <button onClick={deleteClick}>삭제하기</button>
                  </td>
                </tr>

                //map뿌리는거 끝남
              ))}
            </tbody>
          </table>
        ) : (
          //내가 선택한 댓글 넘버와 index 번호 일치 시 댓글 수정 가능
          <table>
            <tbody>
              {inComments?.map((item, index) => (
                <tr
                  key={item.inCoNo}
                  id={`${item.inCoNo}`}
                  className="inComment"
                >
                  {selectedInCommentIndex == item.inCoNo ? (
                    <tr>
                      <td>{index + 1}</td>
                      <td>닉네임: {item?.member?.nickname}</td>
                      <td>
                        <label>댓글 :</label>
                        <input type="text" onChange={handler} />
                      </td>
                      <td>
                        <button onClick={updateClick}>수정하기</button>
                      </td>
                      <td>
                        <button onClick={deleteClick}>삭제하기</button>
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td>{index + 1}</td>
                      <td>닉네임: {item?.member?.nickname}</td>
                      <td>댓글: {item?.inCoCon}</td>
                      <td>
                        <button onClick={updateClick}>수정하기</button>
                      </td>
                      <td>
                        <button onClick={deleteClick}>삭제하기</button>
                      </td>
                    </tr>
                    //수정 commentNo 일치여부 확인
                  )}
                </tr>
                //map 뿌리는거 여기서 끝남
              ))}
            </tbody>
          </table>
          //맨처음
        )}
      </div>
    </div>
  );
};

export default BoardInComment;
