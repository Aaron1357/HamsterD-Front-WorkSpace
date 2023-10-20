import React from "react";
import BoardUpdate from "../board/BoardUpdate";
import { useState } from "react";
import { deletePost } from "../../api/boardFile";
import { useNavigate } from "react-router-dom";
//상세보기에 해당하는 데이터를 출력할 컴포넌트
const BoardView = ({ postNo, title, desc }) => {
  //updateVisible이 true로 바뀌면 수정하기 컴포넌트로 이동하기 위한 상태관리
  const [updateVisible, setUpdateVisible] = useState(false);

  //함수 내에서 컴포넌트 호출 불가
  //state 만들고 처리 후 return에서 컴포넌트 호출하기
  const onClickUpdate = () => {
    setUpdateVisible(true);
  };

  const navigate = useNavigate();
  //삭제하기 버튼 클릭 시 해당 게시물 삭제 후 게시판 전체조회로 이동
  const onClickDelete = async () => {
    if (postNo) await deletePost(postNo);
    navigate("/boardList");

    console.log("delete resp : " + (await deletePost(postNo)));
    console.log("delete postNo : " + postNo);
  };

  return (
    <div>
      {!updateVisible ? (
        <div>
          <p hidden value={postNo} />
          <h2>{title}</h2>
          <button onClick={onClickUpdate}>수정하기</button>
          <button onClick={onClickDelete}>삭제하기</button>
          <hr />
          <div dangerouslySetInnerHTML={{ __html: desc }} />
        </div>
      ) : (
        <BoardUpdate postNo={postNo} initialTitle={title} initialDesc={desc} />
      )}
    </div>
  );
};

export default BoardView;
