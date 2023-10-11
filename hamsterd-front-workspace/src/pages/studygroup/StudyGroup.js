import styled from "styled-components";
import profile from "../../resource/종빈22.png";
import groupimg from "../../resource/오리.jpg";
import search from "../../resource/search.png";
import { useNavigate } from "react-router-dom";

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
    color: rgba(163, 157, 139);
    font-weight: bold;
    font-size: 20px;
    margin-left: 10px; /* 조절 가능한 마진 값 */
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

  #groupintro {
    margin-left: 30px;
    font-size: 15px;
  }
  #groupname {
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
  const navigate = useNavigate;

  const handleSignUpClick = () => {
    // 회원가입 버튼 클릭 시 '/signup' 경로로 이동
    navigate("/signup");
  };

  return (
    <StudyGroupTest>
      <div className="mainsection">
        <div className="createbtn">
          <button type="button" id="createbtn" onClick={handleSignUpClick}>
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
          <div>
            <div className="profile-container">
              <div id="profile">
                <img className="profileimg" src={profile} alt="Profile" />
              </div>
              <div>
                <div id="grouptext">'그룹장'님의 스터디그룹</div>
                <div id="academyname">학원명</div>
              </div>
            </div>
            <div className="groupinfo">
              <div className="group-container">
                <div id="group">
                  <img className="groupimg" src={groupimg} alt="Group" />
                </div>
                <div id="groupintro">
                  <div id="groupname">'그룹명' ex 오리 </div>
                  <div>'그룹 소개' ex 우리는 멋진 오리에요! </div>
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
          </div>
          <br />
          <br />
          <div>
            <div className="profile-container">
              <div id="profile">
                <img className="profileimg" src={profile} alt="Profile" />
              </div>
              <div>
                <div id="grouptext">'그룹장22'님의 스터디그룹</div>
                <div id="academyname">학원명</div>
              </div>
            </div>
            <div className="groupinfo">
              <div className="group-container">
                <div id="group">
                  <img className="groupimg" src={groupimg} alt="Group" />
                </div>
                <div id="groupintro">
                  <div id="groupname">'그룹명' ex 오리22 </div>
                  <div>'그룹 소개' ex 우리는 멋진 오리에요! </div>
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
          </div>
        </div>
      </div>
    </StudyGroupTest>
  );
};

export default StudyGroup;
