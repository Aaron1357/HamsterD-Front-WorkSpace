import styled from "styled-components";

import search from "../../resource/search.png";
import { useNavigate } from "react-router-dom";
import {
  viewStudyGroup,
  viewMemberList,
  getManagerList,
  viewManager,
} from "../../api/studygroup";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const StudyGroupTest = styled.div`
  .mainsection {
    border: 1px solid rgba(211, 157, 87);
    border-radius: 20px;
    width: 1600px;
    margin-top: 30px;
    color: rgba(211, 157, 87);
    //
  }
  .createbtn {
    padding: 20px;
  }
  #createbtn {
    height: 40px;
    width: 180px;
    background-color: rgba(211, 157, 87);
    border: 0px;
    font-weight: bold;
    color: white;
  }
  .section {
    box-shadow: var(
      --shadows-gray-blue-3-5-b-box-shadow,
      0px 2px 5px 0px rgba(38, 51, 77, 0.03)
    );
    margin-top: 80px;
    margin-left: 200px;
    width: 800px;
    height: 1000px;
  }

  .searchsection {
    width: 100%;
    background: var(--white, #ffffff);
    border-radius: 30px;
    height: 50px;
    box-shadow: var(
      --shadows-gray-blue-3-5-b-box-shadow,
      0px 5px 5px 0px rgba(29, 38, 56, 0.03)
    );
  }

  #search {
    width: 100%;
    height: 100%;
    padding: 5px;
    display: flex;
  }

  #search input {
    height: 90%;
    width: 95%;
    border: 0 solid black;
    outline: none;
  }

  #search button {
    background-color: white;
    border: 0 solid black;
  }

  .horizonline {
    width: 100%;
    text-align: center;
    border-bottom: 1px solid rgba(163, 157, 139);
    line-height: 0.3em;
    margin: 20px 0 10px;
    opacity: 30%;
  }

  #profile {
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
  }

  .profile-container {
    display: flex;
    align-items: center;
    margin-bottom: 10px; /* 조절 가능한 마진 값 */
  }

  .profileimg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  #grouptext {
    font-weight: bold;
    font-size: 20px;
    margin-left: 10px; /* 조절 가능한 마진 값 */
    text-decoration: none;
    color: rgba(163, 157, 139);
  }

  #academyname {
    margin-top: 2px;
    color: rgba(163, 157, 139);
    font-weight: bold;
    font-size: 15px;
    margin-left: 20px; /* 조절 가능한 마진 값 */
  }
  .groupinfo {
    font-size: 13px;
    padding: 20px;
    width: 100%;
    background: var(--white, #ffffff);
    border-radius: 30px;
    height: 200px;
    margin-left: 30px;
    box-shadow: var(
      --shadows-gray-blue-3-5-b-box-shadow,
      0px 5px 5px 0px rgba(29, 38, 56, 0.03)
    );
  }

  #group {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
  }
  .group-container {
    display: flex;
    align-items: center;
    margin-bottom: 10px; /* 조절 가능한 마진 값 */
  }

  .groupimg {
    margin: 2px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20%;
  }

  .groupintro {
    margin-left: 30px;
    font-size: 15px;
    text-decoration: none;
    color: orange;
  }
  .groupname {
    font-size: 25px;
    font-weight: bold;
  }
  .profileimg2 {
    width: 35px;
    height: 35px;
    object-fit: cover;
    border-radius: 50%;
  }
  #grouppoint {
    margin-left: 40px;
  }
`;

const StudyGroup = () => {
  const user = useSelector((state) => {
    return state.user;
  });

  const navigate = useNavigate();

  const [managerList, setManagerList] = useState([]);

  const [page, setPage] = useState(1); // 페이지 번호
  const itemsPerPage = 5; // 페이지당 항목 수

  const getStudyGroupListAPI = async () => {
    //  그룹전체API 호출
    const result = await getManagerList();
    setManagerList(result.data);
  };

  console.log(user);

  useEffect(() => {
    getStudyGroupListAPI();
    // 처음 페이지 접근했을 떄 호출
  }, []); //

  const handleCreateGroupClick = () => {
    //생성버튼 페이지 이동
    if (user.studyGroup == null) {
      navigate("/creategroup");
    } else {
      alert("스터디그룹에 이미 가입되어있습니다.");
    }
  };

  const onClick = async (e, groupNo) => {
    // 클릭된 요소의 groupNo 값을 이용하여 원하는 작업을 수행
    console.log(e);

    const result1 = await viewMemberList(groupNo);
    const result2 = await viewStudyGroup(groupNo);
    const result3 = await viewManager(groupNo);

    navigate("/grouppage", {
      state: {
        data: groupNo,
        members: result1,
        group: result2,
        manager: result3,
      },
    });
  };

  // 현재 페이지에 해당하는 항목만 추출
  const displayedGroups = managerList.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <StudyGroupTest>
      <div className="mainsection">
        <div className="createbtn">
          <button type="button" id="createbtn" onClick={handleCreateGroupClick}>
            + 스터디그룹 생성
          </button>
        </div>
        <div className="section">
          <div className="searchsection">
            <form id="search">
              <input
                type="text"
                id="search"
                placeholder=" 검색할 그룹명을 입력하세요."
              />
              <button>
                <img className="searchimg" src={search} alt="Group" />
              </button>
            </form>
          </div>
          <div className="horizonline"></div>
          <br />
          <br />
          {managerList.map((item, index) => (
            <div
              key={item.studyGroup.groupNo}
              id={`${item.studyGroup.groupNo}`}
              onClick={(e) => onClick(e, item?.studyGroup?.groupNo)}
              // 여기서 item?.studyGroup?.groupNo를 인자로 전달
            >
              <div>
                <div className="profile-container">
                  <div id="profile">
                    <img
                      className="groupimg"
                      src={`/upload/${item.profile.split("\\").pop()}`}
                      alt="Profile"
                    />
                  </div>
                  <div>
                    <div>
                      {console.log(item)}
                      <div id="grouptext">{item.nickname} 님의 스터디그룹</div>
                    </div>
                    <div id="academyname">{item.academyName}</div>
                  </div>
                </div>
                <div className="groupinfo">
                  <div className="group-container">
                    <div id="group">
                      <img
                        className="groupimg"
                        src={`/upload/${
                          item.studyGroup &&
                          item.studyGroup.groupImage.split("\\").pop()
                        }`}
                        alt="Group"
                      />
                    </div>
                    <div className="groupintro">
                      <div className="groupname">
                        {item.studyGroup && item.studyGroup.groupName}
                      </div>
                      <div>
                        {item.studyGroup && item.studyGroup.groupContent}
                      </div>
                    </div>
                  </div>
                  <div className="horizonline"></div>
                  <div className="group-container">
                    <div id="grouppoint">그룹 점수 ex 4.7점</div>
                  </div>
                </div>
                <br />
                <br />
              </div>
            </div>
          ))}
          {/* 페이지네이션을 추가 */}
          <div className="pagination">
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
              이전 페이지
            </button>
            <span>페이지 {page}</span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page * itemsPerPage >= managerList.length}
            >
              다음 페이지
            </button>
          </div>
        </div>
      </div>
    </StudyGroupTest>
  );
};

export default StudyGroup;
