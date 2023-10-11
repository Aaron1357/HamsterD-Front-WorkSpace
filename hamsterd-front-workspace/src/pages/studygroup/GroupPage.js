import styled from "styled-components";
import profile from "../../resource/종빈22.png";
import groupimg from "../../resource/오리.jpg";
import { useNavigate } from "react-router-dom";

const GroupPageTest = styled.div`
  .mainsection {
    border: 1px solid rgba(211, 157, 87);
    border-radius: 20px;
    width: 1600px;
    margin-top: 30px;
    color: rgba(211, 157, 87);
    //
  }
  .btn {
    padding: 20px;
  }
  #btn1 {
    height: 40px;
    width: 150px;
    background-color: purple;
    border: 0px;
    font-weight: bold;
    color: white;
  }
  #btn2 {
    height: 40px;
    width: 150px;
    background-color: orange;
    border: 0px;
    font-weight: bold;
    color: white;
    margin-left: 20px;
  }
  .section {
    box-shadow: var(
      --shadows-gray-blue-3-5-b-box-shadow,
      0px 2px 5px 0px rgba(38, 51, 77, 0.03)
    );
    margin-top: 50px;
    margin-left: 50px;
    width: 800px;
    height: 1000px;
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

  #group {
    width: 150px;
    height: 150px;
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
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
  }
  #grouppoint {
    margin-left: 40px;
  }
  #info {
    color: rgba(163, 157, 139);
  }
  #info2 {
    font-weight: bold;
    font-size: 20px;
  }
  .photo {
    width: 70px;
  }
`;

const GroupPage = () => {
  const navigate = useNavigate;

  const handleSignUpClick = () => {
    // 회원가입 버튼 클릭 시 '/signup' 경로로 이동
    navigate("/signup");
  };

  return (
    <GroupPageTest>
      <div className="mainsection">
        <div className="section">
          <div>
            <div className="groupinfo">
              <div className="group-container">
                <div id="group">
                  <img className="groupimg" src={groupimg} alt="Group" />
                </div>
                <div id="groupintro">
                  <div id="groupname">'그룹명' ex 오리 </div>
                  <div id="grouppoint">그룹 점수 ex 4.7점</div>
                  <div className="btn">
                    <button type="button" id="btn1" onClick={handleSignUpClick}>
                      참여하기
                    </button>
                    <button type="button" id="btn2" onClick={handleSignUpClick}>
                      평가하기
                    </button>
                  </div>
                </div>
              </div>
              <div id="info">
                <div id="info2">'그룹 소개' ex 우리는 멋진 오리에요! </div>
                <br />
                <div className="group-container">
                  <div>
                    <div className="photo">
                      <img
                        className="profileimg2"
                        src={profile}
                        alt="Profile"
                      />
                    </div>
                    <div>윤종빈</div>
                  </div>
                  <div>
                    <div className="photo">
                      <img
                        className="profileimg2"
                        src={profile}
                        alt="Profile"
                      />
                    </div>
                    <div>윤종빈</div>
                  </div>
                  <div>
                    <div className="photo">
                      <img
                        className="profileimg2"
                        src={profile}
                        alt="Profile"
                      />
                    </div>
                    <div>윤종빈</div>
                  </div>
                  <div>
                    <div className="photo">
                      <img
                        className="profileimg2"
                        src={profile}
                        alt="Profile"
                      />
                    </div>
                    <div>윤종빈</div>
                  </div>
                  <div>
                    <div className="photo">
                      <img
                        className="profileimg2"
                        src={profile}
                        alt="Profile"
                      />
                    </div>
                    <div>윤종빈</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>스케쥴</div>
          <div>Comments</div>
        </div>
      </div>
    </GroupPageTest>
  );
};

export default GroupPage;
