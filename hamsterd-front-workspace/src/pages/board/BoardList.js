import { searchBoardList } from "../../api/boardFile";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const BoardStyle = styled.div`
  body {
    background-color: rgb(231, 250, 215);
  }

  .head1 {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(255, 247, 237);
  }

  .head2 {
    border: 5px solid rgb(228, 192, 228);
    border-radius: 10px;
    background-color: white;
    width: 600px;
    height: 700px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  form {
    border-radius: 10px;
    width: 500px;
    height: 650px;

    background-color: white;
  }
  .head {
    border: 4px #808080;
    padding: 10px;
  }

  .headName {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
    color: plum;
  }

  .form-select {
    margin-bottom: 15px;
  }

  .formCheck {
    display: flex;
    justify-content: flex-end;
    margin-left: 10px;
  }

  .form-check {
    margin: 5px;
  }

  .button1 {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }

  #button1 {
    font-size: 10px;
    text-align: center;
  }

  #button2 {
    margin: 10px;
  }

  .btnn {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }

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

  const boardClick = (e) => {
    e.preventDefault();
    navigate("/board");
  };

  return (
    <BoardStyle>
      <div className="boardListHead1">
        <div className="boardListHead2">
          <button onClick={boardClick} className="boardButton">
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
              {boardList &&
                boardList.map((item) => (
                  <tr key={item.postNo}>
                    <td>{item.postNo}</td>
                    <td>{item.postContent}</td>
                    <td>
                      {item.member == null ? "익명" : item.member.nickname}
                    </td>
                    <td>{item.createTime}</td>
                    <td>22</td>
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
