import React, { useEffect, useState } from "react";
import {
  addgComment,
  getgCommentOfGroup,
  deletegComment,
  updategComment,
} from "../../api/groupcomment";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

const GroupComment = (props) => {
  const [gComments, setgComments] = useState([]);
  const [groupNo, setGroupNo] = useState(props.groupNo);
  const [newComment, setNewComment] = useState();

  // const user = useSelector((state) => {
  //   return state.user;
  // });

  const gCommentOfGroup = async () => {
    const result = await getgCommentOfGroup(groupNo);
    setgComments(result.data);
  };

  useEffect(() => {
    gCommentOfGroup();
  }, []);

  // const onClick = (e) => {
  //   console.log(e.target.value);
  // };

  // handler 함수
  const handleNewCommentChange = (e) => {
    // 입력 필드의 값을 상태 변수에 업데이트
    setNewComment(e.target.value);
  };

  const handleSubmit = async () => {
    // 상태 변수에서 입력 필드의 값을 가져옴
    console.log(newComment);
    const result = await addgComment(newComment);

    if (result) {
      // 등록이 성공하면 댓글 목록을 다시 불러옴
      gCommentOfGroup();
      setNewComment(""); // 입력 필드를 초기화
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
          value={newComment}
          onChange={handleNewCommentChange} // handler 함수를 연결
        />
        <input type="submit" value="등록" onClick={handleSubmit} />
      </div>
      <div>
        {gComments.map((item, index) => (
          <div key={item.gCommentNo}>
            <span>{index + 1}</span>
            <span>{item.commentContent}</span>
            <span>{item.member.nickname}</span>
            {item.updateDate ? (
              <span>{item.updateDate}</span>
            ) : (
              <span>{item.createDate}</span>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default GroupComment;
