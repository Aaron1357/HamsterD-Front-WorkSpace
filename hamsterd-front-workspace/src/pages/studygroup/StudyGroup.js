import styled from "styled-components";
import profile from "../../resource/종빈22.png";
import search from "../../resource/search.png";
import { useNavigate } from "react-router-dom";
import {
  viewStudyGroup,
  viewMemberList,
  getManagerList,
} from "../../api/studygroup";
import { useState, useEffect } from "react";

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
  const navigate = useNavigate();

  const [managerList, setManagerList] = useState([]);

  const getStudyGroupListAPI = async () => {
    //  그룹전체API 호출
    const result = await getManagerList();
    setManagerList(result.data);
  };

  useEffect(() => {
    getStudyGroupListAPI();
    // 처음 페이지 접근했을 떄 호출
  }, []);//

  const handleCreateGroupClick = () => {
    //생성버튼 페이지 이동
    navigate("/creategroup");
  };

  const onClick = async (e) => {
    const idex = e.target.getAttribute("groupNo"); // 선택한 스터디 그룹의 그룹넘버를 state에 담아서 navigate로 넘긴다

    const result1 = await viewMemberList(idex);
    const result2 = await viewStudyGroup(idex);

    navigate("/grouppage", {
      state: {
        data: idex,
        members: result1,
        group: result2,
      },
    });
  };

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
            <div key={index}>
              <div className="profile-container">
                <div id="profile">
                  {/* <img
                    className="groupimg"
                    src={`/upload/${item.profile.split("\\").pop()}`}
                    alt="Profile"
                  /> */}
                </div>
                <div>
                  <div>
                    <div
                      id="grouptext"
                      onClick={onClick}
                      groupNo={item.studyGroup && item.studyGroup.groupNo} // 선택한 스터디 그룹의 그룹넘버를 value 속성에 저장
                    >
                      {item.nickname}
                    </div>
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
                  <div className="groupintro" onClick={onClick}>
                    <div className="groupname">
                      {" "}
                      {item.studyGroup && item.studyGroup.groupName}
                    </div>
                    <div>{item.studyGroup && item.studyGroup.groupContent}</div>
                  </div>
                </div>
                <div className="horizonline"></div>
                <div className="group-container">
                  <div>
                    <img className="profileimg2" src={profile} alt="Profile" />
                  </div>
                  <div>외 '그룹인원'명 참여 중</div>
                  <div id="grouppoint">그룹 점수 ex 4.7점</div>
                </div>
              </div>

              <br />
              <br />
            </div>
          ))}
        </div>
      </div>
    </StudyGroupTest>
  );
};

export default StudyGroup;
