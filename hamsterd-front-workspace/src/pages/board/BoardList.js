import { searchBoardList } from "../../api/boardFile";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
`;

const BoardList = () => {
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    searchBoardList().then((res) => setBoardList(res));
  }, []);

  const navigate = useNavigate();

  const onClick = (e) => {
    e.preventDefault();
    navigate("/board");
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
              <a href={`/post/${post?.postNo}`} className="underList">
                {boardList &&
                  boardList.map((item) => (
                    <tr key={item.postNo}>
                      <td>{item.postNo}</td>
                      <td>{item.postTitle}</td>
                      <td>
                        {item.member == null ? "익명" : item.member.nickname}
                      </td>
                      <td>
                        {item.createTime
                          ? new Date(item.createTime).toLocaleString("en-US", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            })
                          : ""}
                      </td>
                      <td>22</td>
                    </tr>
                  ))}
              </a>
            </tbody>
          </table>
        </div>
      </div>
    </BoardStyle>
  );
};
export default BoardList;
