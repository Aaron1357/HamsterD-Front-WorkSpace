import {
  searchBoardList,
  searchPostContent,
  searchPostTitle,
} from "../../api/boardFile";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { updateBoardView } from "../../api/boardFile";
import Pagination from "react-js-pagination";

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

const PaginationBox = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #337ab7;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: #337ab7;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: blue;
  }
`;

const BoardList = () => {
  const [boardList, setBoardList] = useState([]);

  const navigate = useNavigate();

  //페이지 번호 상태관리
  const [page, setPage] = useState(1);

  // post 전체 데이터 개수 -> pagination에 보내줘야하는 값
  const [totalDataCount, setTotalDataCount] = useState(0);

  //페이지 바뀔때마다 상태관리하기
  const [pageShow, setPageShow] = useState(false);

  //검색창 value값
  const [searchPost, setSearchPost] = useState("");

  //검색창 option 값 상태관리
  const [searchOption, setSearchOption] = useState("");

  //검색창이 작성되면 onChange
  const onChangePost = (e) => {
    setSearchPost(e.target.value);
    console.log(e.target.value);
  };

  //option 값 변경될때마다 바꿔주는 onChange
  const onChangeOption = (e) => {
    setSearchOption(e.target.value);
  };

  //검색창 클릭
  const searchPostClick = async () => {
    console.log(searchPost);
    if (searchOption == "searchPostContent") {
      const result = await searchPostContent(searchPost);
      setBoardList(result);
    } else if (searchOption == "searchPostTitle") {
      const result = await searchPostTitle(searchPost);
      setBoardList(result);
    }
  };

  //페이지 바뀔때 페이지 번호 바꿔주고 true로 변환
  const handlePageChange = (page) => {
    console.log("페이지바뀜");
    setPage(page);
    setPageShow(true);
  };

  //처음 화면 boardList
  useEffect(() => {
    const fetchData = async () => {
      const res = await searchBoardList(page);
      //boardList에 total이랑 contents 따로 있어서 contents만 받아와야함
      setBoardList(res.contents);
      //Pagination에 Post전체 값 보내줘야함
      setTotalDataCount(JSON.stringify(res.total));
      console.log("페이지 나와라" + res);
      console.log(JSON.stringify(res));
      console.log("개수 나와 제발" + JSON.stringify(res.total));
    };
    fetchData();
  }, []);

  //페이지 변경될때 boardList 뿌리기
  useEffect(() => {
    const fetchData = async () => {
      //if 조건 걸어주지 않으면 무한루프 돌아감
      if (pageShow == true) {
        const res = await searchBoardList(page);
        setBoardList(res.contents);
      }
    };
    fetchData();
    //false로 변경해야 무한루프 안돌아감
    setPageShow(false);
  }, [handlePageChange]);

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
          <select value={searchOption} onChange={onChangeOption}>
            <option value="searchPostTitle">제목</option>
            <option value="searchPostContent">내용</option>
            <option value="searchNickname">작성자</option>
            <option value="searchCreateTime">작성일</option>
          </select>
          <input type="text" value={searchPost} onChange={onChangePost}></input>
          <button onClick={searchPostClick}>조회</button>
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
                    {item?.securityCheck === "y"
                      ? "익명"
                      : item?.member?.nickname}
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
          <div>
            <PaginationBox>
              <Pagination
                // 현재 보고있는 페이지
                activePage={page}
                // 한페이지에 출력할 아이템수
                itemsCountPerPage={5}
                // 총 아이템수
                totalItemsCount={totalDataCount}
                // 표시할 페이지수
                pageRangeDisplayed={3}
                // 함수
                onChange={handlePageChange}
              ></Pagination>
            </PaginationBox>
          </div>
        </div>
      </div>
    </BoardStyle>
  );
};
export default BoardList;
