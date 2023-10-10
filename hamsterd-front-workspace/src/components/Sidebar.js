
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

const Test2 = styled.div`
  /* 로고영역 */
  #logo {
    width: 300px;
    min-width: 300px;
    margin-left: 100px;
    display: flex;
    justify-content: center;
  }

  /* 로고 이미지 */
  #logo img {
    width: 250px;
    left: 29px;
    top: -10px;
  } //
  .section {
    border: 4px solid rgba(211,157,87);
    border-radius: 20px;
    box-shadow: var(
      --shadows-gray-blue-3-5-b-box-shadow,
      0px 2px 5px 0px rgba(38, 51, 77, 0.03)
    );
   
    height: 700px;
    margin-top: 3px;
    padding: 30px;
    color: rgba(211,157,87);
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
    border: 3px solid rgba(211,157,87);
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
  }
  .main-page{}
  width: 600px;
  margin-top: -10px;
`;

const Sidebar = () => {
  return (
    <Test2>
      <div className="main-page">
        <div className="main-section">
          <div className="section" id="section3">
            
            <div className="myinfo">
              <div className="mystudy">내 스터디</div>
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
