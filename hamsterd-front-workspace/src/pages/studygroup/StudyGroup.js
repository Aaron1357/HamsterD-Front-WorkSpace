import styled from "styled-components";
import profile from "../../resource/종빈22.png";
import groupimg from "../../resource/오리.jpg";
import search from "../../resource/search.png";
import { Link, useNavigate } from "react-router-dom";
import { getStudyGroupList } from "../../api/studygroup";
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

  const [studygroup, setStudyGroup] = useState([]);

  const newList = studygroup.map((item) => {
    return {
      grouptitle: item.groupName,
      groupcontent: item.groupContent,
      groupacademy: item.groupAcademy,
      groupimage: item.groupImage,
    };
  });

  const handleCreateGroupClick = () => {
    //생성버튼 페이지 이동
    navigate("/creategroup");
  };

  const getStudyGroupListAPI = async () => {
    //  그룹전체API 호출
    const result = await getStudyGroupList();
    setStudyGroup(result.data); // 후 상태 저장
  };

  // useEffect(() => {
  //   // 전체 조회 내용이 바뀔 때 최신화
  //   setStudyGroup(newList);
  // }, [studygroup]);

  useEffect(() => {
    // 처음 페이지 접근했을 떄 호출
    getStudyGroupListAPI();
  }, []);
  console.log(studygroup);

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
          {studygroup.map((item) => (
            <div>
              <div className="profile-container">
                <div id="profile">
                  <img className="profileimg" src={profile} alt="Profile" />
                </div>
                <div>
                  <div>
                    <Link to="/grouppage" id="grouptext">
                      '그룹장'님의 스터디그룹
                    </Link>
                  </div>
                  <div id="academyname">{item.groupAcademy}</div>
                </div>
              </div>
              <div className="groupinfo">
                <div className="group-container">
                  <div id="group">
                    <img
                      className="groupimg"
                      src={`/upload/${item.groupImage.split("\\").pop()}`}
                      alt="Group"
                    />
                  </div>
                  <div className="groupintro">
                    <Link to="/grouppage" className="groupintro">
                      <div className="groupname">{item.groupName}</div>
                      <div>{item.groupContent}</div>
                    </Link>
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
