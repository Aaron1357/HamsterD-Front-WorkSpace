import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import profile from "../../resource/오리.jpg";
import { useState } from "react";
import { useSelector } from "react-redux";

const MypageTest = styled.div`
  .maincontain {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid rgba(211, 157, 87);
    border-radius: 20px;
    width: 1600px;
    margin-top: 30px;
    color: rgba(211, 157, 87);
    // 메인콘테이너//
  }

  .profileimg {
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    //프로필 이미지 (오리)//
  }

  .photo-line {
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    margin-top: 50px; //프로필-테두리 위쪽 공간//
  }

  .nickname {
    justify-content: center;
    align-items: center;
    display: flex;
    justify-content: center;
    padding-top: 20px; //닉네임 위쪽 공간//
    padding-bottom: 20px; //닉네임 아래 공간//
  }

  .nickname-font {
    font-size: 20px;
    font-weight: bold;
    padding-right: 20px;
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    // 닉네임 표기부분 공백
    border: 1px solid rgba(211, 157, 87);
    border-radius: 20px;
    width: auto;
    margin-top: 30px;
    color: rgba(211, 157, 87);
    //닉네임 테두리
  }

  .nickname-btn {
    margin-top: 25px;
    padding-left: 20px;
  }

  .myId {
    justify-content: center;
    align-items: center;
    display: flex;
    justify-content: center;
    padding-top: 20px; //아이디 위쪽 공간//
    padding-bottom: 20px; //아이디 아래 공간//
  }

  .myId-font {
    font-size: 20px;
    font-weight: bold;
    padding-right: 20px;
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    // 아이디 표기부분 공백
    border: 1px solid rgba(211, 157, 87);
    border-radius: 20px;
    width: auto;
    color: rgba(211, 157, 87);
    //아이디 색
  }

  .myId-btn {
    padding-left: 20px;
  }

  .schedule-btn {
    padding: 20px;
  }

  #btn1 {
    height: 40px;
    width: 150px;
    background-color: purple;
    border: 0px;
    font-weight: bold;
    padding-right: 10px;
    color: white;
  }

  #btn2 {
    height: 40px;
    width: 150px;
    background-color: orange;
    border: 0px;
    font-weight: bold;
    color: white;
  }
`;

const MyPage = () => {
  const logout = () => {
    window.sessionStorage.clear(); // 세션 제거
    window.location.reload(true); // 새로고침
  };

  // const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);
  // console.log(user.profile);

  let user = useSelector((state) => {
    console.log(state.user);
    // console.log(JSON.parse(state.user));
    return state.user;
  });
  // user = JSON.parse(user);

  // console.log("토큰" + JSON.parse(user));
  // console.log("이미지" + user.profile);

  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleStudyClick = () => {
    // 내 스터디 클릭시 내 스터디그룹' 경로로 이동
    navigate("/studygroup");
  };

  const handleScheduleClick = () => {
    // 내 스터디 클릭시 내 스터디그룹' 경로로 이동
    navigate("/schedule");
  };

  const handleUpdateClick = () => {
    // 개인정보수정 버튼 클릭 시 '/update' 경로로 이동
    navigate("/update");

    setIsOpen(false);
  };

  return (
    <MypageTest>
      <div className="maincontain">
        <div></div>

        <div className="photo-line">
          <div className="photo">
            //
            <img
              className="profileimg"
              src={`/upload/${user.profile.split("\\").pop()}`}
              alt="profile"
            />
          </div>
        </div>

        {/* 프로필사진 */}

        <div className="nickname">
          <div className="nickname-font">내 닉네임 : {user.nickname}</div>
          <div className="nickname-btn"></div>
        </div>

        {/* 닉네임+ 수정부분 */}

        <div className="myId">
          <div className="myId-font">내 아이디 : {user.id}</div>
          <div className="myId-btn"></div>
        </div>

        {/* 아이디+ 수정부분 */}

        <div className="schedule-btn">
          <button type="button" id="btn1" onClick={handleStudyClick}>
            나의 스터디 그룹
          </button>{" "}
          <button type="button" id="btn2" onClick={handleScheduleClick}>
            나의 일정
          </button>
        </div>

        <div>
          <button
            type="button"
            id="update-btn"
            className="btn btn-danger"
            onClick={handleUpdateClick}
          >
            개인정보 수정
          </button>
        </div>
      </div>
    </MypageTest>
  );
};

export default MyPage;
