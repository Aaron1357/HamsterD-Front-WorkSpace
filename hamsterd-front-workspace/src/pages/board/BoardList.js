import { searchBoardList } from "../../api/boardFile";
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
//
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

  const handlePageChange = (page) => {
    setPage(page);
  };
  //페이지 처리

  //페이지 초기 값은 1페이지
  const [page, setPage] = useState(1);

  // const listPerPage = 8;

  // const [groundList, setGroundList] = useRecoilState(groundPhotoListState);
  // const totalPage = Math.ceil(groundList.length / listPerPage);

  useEffect(() => {
    searchBoardList(page).then((res) => setBoardList(res));
    // const res = await searchBoardList(page);
    // setBoardList(res);
    console.log("페이지 나와라");
    // console.log("로컬스토리지 닉네임 " + localStorage.getItem("nickname"));
  }, []);

  // useEffect(async () => {
  //   const result = await searchBoardList(
  //     `grounds?location=${location}&search=${searchInput}&offset=${
  //       (page - 1) * listPerPage
  //     }&count=${listPerPage}`
  //   );
  //   setGroundList({
  //     length: result.data.length,
  //     data: result.data.grounds,
  //   });
  // }, [page]);
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
          <tfoot>
            <PaginationBox>
              <Pagination
                // totalPage={totalPage}
                // 현재 보고있는 페이지
                activePage={1}
                // 한페이지에 출력할 아이템수
                itemsCountPerPage={2}
                // 총 아이템수
                totalItemsCount={300}
                // 표시할 페이지수
                pageRangeDisplayed={5}
                // 함수
                onChange={handlePageChange}
              ></Pagination>
            </PaginationBox>
          </tfoot>
        </div>
      </div>
    </BoardStyle>
  );
};
export default BoardList;
