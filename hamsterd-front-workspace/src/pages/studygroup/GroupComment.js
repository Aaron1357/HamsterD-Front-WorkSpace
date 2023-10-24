import React, { useEffect, useState } from "react";
import {
  addgComment,
  getgCommentOfGroup,
  deletegComment,
  updategComment,
} from "../../api/groupcomment";
import "bootstrap/dist/css/bootstrap.min.css";

const GroupComment = (props) => {
  // 그룹별 댓글 목록
  const [gComments, setgComments] = useState([]);
  const [groupNo, setGroupNo] = useState(props.groupNo);

  // 댓글 입력값
  const [newComment, setNewComment] = useState();

  // 유저 정보(수정, 삭제 활성화 위해)
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const id = user.id;

  // 댓글 상태 지정(수정 input 박스 넣기 위해)
  const [selectedCommentNo, setSelectedCommentNo] = useState(0);

  // 그룹별 댓글 목록 받아와서 뿌리기
  const gCommentOfGroup = async () => {
    const result = await getgCommentOfGroup(groupNo);
    setgComments(result.data);
  };

  useEffect(() => {
    gCommentOfGroup();
  }, [groupNo]);

  // 댓글 작성
  const creategComment = async (e) => {
    console.log(groupNo);
    if (newComment) {
      const formData = new FormData();
      formData.append("newComment", newComment);
      formData.append("groupNo", groupNo);
      formData.append("token", token);

      try {
        await addgComment(formData);
        gCommentOfGroup();
        e.target.value = null;
      } catch (error) {
        console.error("오류 발생 : ", error);
      }
    } else {
      alert("댓글을 입력해주세요!");
    }
  };

  // 댓글 수정 버튼
  const update = async (e) => {
    // setSelectedCommentNo(e.target.closest(".comment").id);
    // console.log(editComment);
    // console.log(groupNo);
    // const formData = new FormData();
    // formData.append("newComment", newComment);
    // formData.append("groupNo", groupNo);
    // formData.append("token", token);
    // await updategComment(formData);
    // // gCommentOfGroup();
    // setNewComment("");
  };

  const handler = async (e) => {
    console.log(e.target.value);
    setNewComment(e.target.value);
  };

  // 수정하기 버튼 클릭 시 댓글번호 확인
  // 클릭 시 gCommentNo를 selectedCommentNo로 세팅함
  const openUpdate = async (e) => {
    setSelectedCommentNo(e.target.closest(".comment").id);
  };
  console.log("selectedCommentNo : " + selectedCommentNo);

  // 댓글 삭제(아래에서 유저 정보 확인하여 일치할때만 활성화 처리)
  const minusgComment = async (gcommentNo) => {
    try {
      await deletegComment(gcommentNo);
      gCommentOfGroup();
      setNewComment("");
    } catch (error) {
      console.error("오류 발생 : " + error);
    }
  };

  return (
    <>
      <div className="inputgComment">
        댓글
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="댓글을 입력하세요"
          onChange={handler}
        />
        <button onClick={creategComment}>등록</button>
      </div>
      {/* selectedCommentNo가 0 이하인 경우 목록만 출력 */}
      {selectedCommentNo <= 0 ? (
        <div>
          {gComments.map((item, index) => (
            <div
              key={item.gcommentNo}
              id={`${item.gcommentNo}`}
              className="comment"
            >
              <tr>
                <td>{index + 1}</td>
                <td>{item.commentContent}</td>
                <td>{item.member.nickname}</td>
                {/* <button onClick={openUpdate}>수정</button>
                <button>삭제</button> */}
                {id === item.member.id ? (
                  <button onClick={openUpdate}>수정</button>
                ) : null}
                {id === item.member.id ? (
                  <button onClick={() => minusgComment(item.gcommentNo)}>
                    삭제
                  </button>
                ) : null}
              </tr>
            </div>
          ))}
        </div>
      ) : (
        // 선택된 댓글과 해당 댓글 번호 같으면 input 활성화
        <div>
          {gComments.map((item, index) => (
            <div
              key={item.gcommentNo}
              id={`${item.gcommentNo}`}
              className="comment"
            >
              {/* {console.log("selected " + selectedCommentNo)}
              {console.log("item " + item.gcommentNo)} */}
              {selectedCommentNo == item.gcommentNo ? (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <input type="text" onChange={handler} />
                  </td>
                  <td>{item.member.nickname}</td>
                  {/* <button onClick={update}>수정</button>
                  <button>삭제</button> */}
                  {id === item.member.id ? (
                    <button onClick={update}>수정</button>
                  ) : null}
                  {id === item.member.id ? (
                    <button onClick={() => minusgComment(item.gcommentNo)}>
                      삭제
                    </button>
                  ) : null}
                </tr>
              ) : (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.commentContent}</td>
                  <td>{item.member.nickname}</td>
                  {/* <button onClick={update}>수정</button>
                  <button>삭제</button> */}
                  {id === item.member.id ? (
                    <button onClick={update}>수정</button>
                  ) : null}
                  {id === item.member.id ? (
                    <button onClick={() => minusgComment(item.gcommentNo)}>
                      삭제
                    </button>
                  ) : null}
                </tr>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default GroupComment;
