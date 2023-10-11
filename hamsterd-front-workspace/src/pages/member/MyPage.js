
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import profile from "../../resource/오리.jpg"
const MypageTest = styled.div`

.maincontain{

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

.profileimg{
  justify-content: center;
  align-items: center;
  width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%; 

     //프로필 이미지 (오리)//
  
}

.photo-line{
   
  justify-content: center;
  align-items: center;
  width: 100px;
    height:100px;
    display: flex;
    justify-content: center;
    margin-top: 50px; //프로필-테두리 위쪽 공간//
}

.nickname{
   
   justify-content: center;
   align-items: center;
    display: flex;
    justify-content: center;
    padding-top: 20px; //닉네임 위쪽 공간//
    padding-bottom: 20px; //닉네임 아래 공간//
    
 } 
 
.nickname-font{

  font-size: 20px; 
  font-weight: bold;
  padding-right: 20px;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;  // 닉네임 표기부분 공백 
  border: 1px solid rgba(211, 157, 87);
    border-radius: 20px;
    width: auto;
    margin-top: 30px;
    color: rgba(211, 157, 87);; //닉네임 테두리
  
}

.nickname-btn {

  margin-top: 25px;
  padding-left: 20px;
}

.myId{
   
   justify-content: center;
   align-items: center;
    display: flex;
    justify-content: center;
    padding-top: 20px; //아이디 위쪽 공간//
    padding-bottom: 20px; //아이디 아래 공간//
    
 } 
 
.myId-font{

  font-size: 20px; 
  font-weight: bold;
  padding-right: 20px;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;  // 아이디 표기부분 공백 
  border: 1px solid rgba(211, 157, 87);
    border-radius: 20px;
    width: auto;
    color: rgba(211, 157, 87); //아이디 색
}

.myId-btn {


  padding-left: 20px;
}





`;

const MyPage = () => {
  return (
    <MypageTest>
    <div className=" maincontain">
    
    <div className="photo-line">
     <div className="photo">
    <img className="profileimg" src={profile} alt="Profile" />
    </div>
    </div> 
    {/* 프로필사진 */}


    <div className="nickname">
      <div className="nickname-font">
    내 닉네임 : 공부하러오리  
    </div>
    <div className="nickname-btn">
    <button type="button" id="signUpbtn"  className="btn btn-danger"> 수정 </button>
    </div>
    </div>

    {/* 닉네임+ 수정부분 */}



    <div className="myId">
      <div className="myId-font">
    내 아이디 : 오리84  
    </div>
    <div className="myId-btn">
    <button type="button" id="signUpbtn"  className="btn btn-danger"> 수정 </button>
    </div>
    </div>

    {/* 아이디+ 수정부분 */}


    <div className="schedule">
    나의 일정
    </div>

    </div>
    </MypageTest>
  );
};

export default MyPage;
//