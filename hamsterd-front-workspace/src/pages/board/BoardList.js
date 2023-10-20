import { searchBoardList } from "../../api/boardFile";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { updateBoardView } from "../../api/boardFile";
import { useSelector } from "react-redux";

const BoardStyle = styled.div`
  .boardListHead1 {
    display: flex;
    flex-direction: column;
    width: 1000px;
    height: 100vh;
  }

  .boardListHead2 {
    display: flex;
    justify-content: end;
  }

  .boardButton {
    width: 160px;
    height: 40px;
  }

  #boardView :hover {
    cursor: pointer;
  }
`;

const BoardList = () => {
  const [boardList, setBoardList] = useState([]);
  const token = localStorage.getItem("token");

  const user = useSelector((state) => {
    return state.user;
  });

  // console.log(user.id);

  useEffect(() => {
    searchBoardList().then((res) => setBoardList(res));

    // console.log("로컬스토리지 닉네임 " + localStorage.getItem("nickname"));
  }, []);

  const navigate = useNavigate();
  //게시판 작성하기
  const onClick = () => {
    navigate("/board");
  };
  //조회수 1씩 업데이트하기
  const onClickView = async (postNo) => {
    await updateBoardView(postNo);
    console.log("조회수 1씩 업데이트 버튼 클릭 " + postNo);
    navigate(`/post/${postNo}`);
  };

  return (
    <BoardStyle>
      <div className="boardListHead1">
        <div className="boardListHead2">
          <button onClick={onClick} className="boardButton">
            게시물 작성하기
          </button>
        </div>
        <div>
          <table className="table table-sm">
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
                <th>조회</th>
              </tr>
            </thead>
            <tbody>
              {boardList?.map((item, index) => (
                <tr
                  id="boardView"
                  key={item?.postNo}
                  onClick={() => onClickView(item?.postNo)}
                >
                  {console.log(item)}
                  <td>{index + 1}</td>
                  <td>{item?.postTitle}</td>
                  <td>
                    {item?.securityCheck === "y" ? (
                      <div>"익명"</div>
                    ) : (
                      <div>{item?.member?.nickname}</div>
                    )}
                  </td>
                  <td>
                    {item?.createTime
                      ? new Date(item?.createTime).toLocaleString("en-US", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })
                      : ""}
                  </td>
                  <td>{item?.boardView}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </BoardStyle>
  );
};
export default BoardList;
