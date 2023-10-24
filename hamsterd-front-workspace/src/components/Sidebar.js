import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { viewMemberList, viewStudyGroup } from "../api/studygroup";
import { useSelector } from "react-redux";

const Test2 = styled.div`
  /* 로고영역 */
  #logo {
    width: 300px;
    min-width: 300px;
    margin-left: 100px;
    display: flex;
    justify-content: center;
  }
  //
  /* 로고 이미지 */
  #logo img {
    width: 250px;
    left: 29px;
    top: -10px;
  } //
  .section {
    border: 4px solid rgba(211, 157, 87);
    border-radius: 20px;
    box-shadow: var(
      --shadows-gray-blue-3-5-b-box-shadow,
      0px 2px 5px 0px rgba(38, 51, 77, 0.03)
    );

    height: 700px;
    margin-top: 3px;
    padding: 30px;
    color: rgba(211, 157, 87);
    font-weight: bold;
  }

  /*사이드바 */
  #section3 {
    width: 0px;
    min-width: 200px;
    display: flex;
    flex-direction: column;
    margin: 30px 100px 0 50px;
  }

  .myimg {
    width: 100%;
    height: 300px;
    margin-top: 30px;
    display: flex;
    align-self: center;
  }

  .myimg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .myinfo {
    width: 100%;
    height: 100%;
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  .myinfo div {
    border: 3px solid rgba(211, 157, 87);
    border-radius: 10px;
    box-shadow: var(
      --shadows-gray-blue-3-5-b-box-shadow,
      0px 2px 5px 0px rgba(38, 51, 77, 0.03)
    );
    width: 100%;
    height: 50px;
    margin-bottom: 20px;
    margin-top: 20px;
    line-height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .main-page {
    width: 600px;
    margin-top: -10px;
  }
  .btn {
    color: rgba(211, 157, 87);
  }
  .main-page {
  }
  width: 600px;
  margin-top: -10px;
`;

const Sidebar = () => {
  const user = useSelector((state) => {
    return state.user;
  });

  console.log(user.studyGroup);

  const navigate = useNavigate();

  const handleStudyGroupClick = () => {
    // 회원가입 버튼 클릭 시 '/signup' 경로로 이동
    navigate("/grouppage");
  };

  const myStudyGroup = () => {
    // if (user.studyGroup !== null) {
    //   const idex = user.studyGroup.groupNo;
    //   const result1 = viewMemberList(idex);
    //   const result2 = viewStudyGroup(idex);
    //   navigate("/grouppage", {
    //     state: {
    //       groupno: idex,
    //       members: result1,
    //       group: result2,
    //     },
    //   });
    // } else {
    //   navigate("/studygroup");
    // }
    navigate("/studygroup");
  };

  return (
    <Test2>
      <div className="main-page">
        <div className="main-section">
          <div className="section" id="section3">
            <div className="myinfo">
              <div className="mystudy" onClick={myStudyGroup}>
                내 스터디
              </div>
              <div className="myweight">내 몸무게</div>
              <div className="mycalender">내 일정</div>
              <div className="mypost">내 게시글</div>
              <div className="mycomment">내 댓글</div>
            </div>
          </div>
        </div>
      </div>
    </Test2>
  );
};

export default Sidebar;
