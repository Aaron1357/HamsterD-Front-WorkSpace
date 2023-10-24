import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import profile from "../../resource/오리.jpg";
import { useState } from "react";


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

  // window.sessionStorage.getItem("member");
  const sessionValue = sessionStorage.getItem("member");
  const parseValue = JSON.parse(sessionValue);
  console.log(parseValue.profile);
  console.log(parseValue);
  
  // console.log(window.sessionStorage.getItem("member"));

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


  

  // console.log(file);

  // sessionValue.profile = file;


  const filePath = parseValue.profile;
  const parts = filePath.split("//"); // "/"로 문자열 분할

  const uploadFolder = parts.pop(); // 배열의 마지막 요소 추출

  console.log(uploadFolder);

  // sessionStorage.setItem("member", JSON.stringify(sessionValue));

  // console.log(sessionValue.profile);


  

  const handleUpdateClick = () => {
    // 개인정보수정 버튼 클릭 시 '/update' 경로로 이동
    navigate("/update");
    
    setIsOpen(false);
  };
  

  // const handleImageUpload = (e) => {
    
  //   const selectedFile = e.target.value;
  //   setFile(URL.createObjectURL(selectedFile));
      

    
      

  //   console.log(file);
  

  //   // 로컬 스토리지에서 member 데이터 가져오기
  //   const memberData = JSON.parse(sessionStorage.getItem("member"));

  //   // 새로운 FormData 생성
  //   const formData2 = new FormData();
    
  //   // 필드 추가
  
    
  //   //방식변경필요!!//
  //   formData2.set("password",memberData.password);
  //   formData2.set("nickname", memberData.nickname);
  //   formData2.set("memberNo", memberData.memberNo);
  //   formData2.set("id", memberData.id);
  //   formData2.set("academyName", memberData.academyName);
  //   formData2.set("address", memberData.address);
  //   formData2.set("phone", memberData.phone);
  //   formData2.set("birth", memberData.birth);
  //   formData2.set("gender", memberData.gender);
  //   formData2.set("name", memberData.name);
  //   formData2.set("profile", file);
  //   // console.log(formData2.get("password"));
  //   // console.log(formData2.get("nickname"));
  

    
  




   
  // };

  

  return (
    <MypageTest>
      <div className="maincontain">
          <div>
            
          </div>
        
            <div className="photo-line">
              <div className="photo">
                
                <img
                  className="profileimg"
                   src={`/upload/${parseValue.profile.split("\\").pop()}`}
                  alt="profile"
                />
                
              </div>
            </div>
            
        
        {/* 프로필사진 */}

        <div className="nickname">
          <div className="nickname-font">내 닉네임 : {parseValue.nickname}</div>
          <div className="nickname-btn"></div>
        </div>

        {/* 닉네임+ 수정부분 */}

        <div className="myId">
          <div className="myId-font">내 아이디 : {parseValue.id}</div>
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
