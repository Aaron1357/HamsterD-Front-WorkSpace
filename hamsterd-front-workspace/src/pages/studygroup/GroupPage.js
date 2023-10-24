import styled from "styled-components";
import profile from "../../resource/종빈22.png";

import { useNavigate, useLocation } from "react-router-dom";

import { useState, useRef, useEffect } from "react";
import ScheduleMain from "./ScheduleMain";

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
  #schedule {
    font-size: 25px;
    font-weight: bold;
  }

  #comments {
    font-size: 25px;
    font-weight: bold;
  }
`;

const GroupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGroupReviewClick = () => {
    navigate("/groupreview");
  };

  const number = Number(location.state.data);
  const members = location.state.members;
  const group = location.state.group;
  console.log(members);
  console.log(group);

  const modalRef = useRef(null);

  const handleClick = () => {
    // Bootstrap Modal을 JavaScript로 열기
    const myModal = modalRef.current;
    if (myModal) {
      myModal.classList.add("show");
      myModal.style.display = "block";
    }
  };

  return (
    <GroupPageTest>
      <div className="mainsection">
        <div className="section">
          <div>
            <div className="groupinfo">
              <div className="group-container">
                <div id="group">
                  <img
                    className="groupimg"
                    src={`/upload/${group.groupImage.split("\\").pop()}`}
                    alt="Group"
                  />
                </div>
                <div id="groupintro">
                  <div id="groupname">{group.groupName}</div>
                  <div id="grouppoint">그룹 점수 ex 4.7점</div>
                  <div className="btn">
                    <div className="App">
                      <button type="button" id="btn1" onClick={handleClick}>
                        참여하기
                      </button>
                      <button
                        type="button"
                        id="btn2"
                        onClick={handleGroupReviewClick}
                      >
                        평가하기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div id="info">
                <div id="info2">'그룹 소개' ex 우리는 멋진 오리에요! </div>
                <br />
                <div className="group-container">
                  {members.map((item, index) => (
                    <div>
                      <div className="photo">
                        <img
                          className="profileimg2"
                          src={profile}
                          alt="Profile"
                        />
                      </div>
                      <div>{item.nickname}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <br />
          <br />
          <div>
            <div id="schedule">스케쥴</div>
            <div className="horizonline"></div>
            <ScheduleMain className="scheduleMain" groupNo={number} />
          </div>
          <div>
            <div id="comments">Comments</div>
            <div className="horizonline"></div>
          </div>
        </div>
      </div>

      {/* Bootstrap Modal 요소 */}
      <div
        ref={modalRef}
        className="modal fade"
        id="myModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title"> 참여하기</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p className="text">
                선택하신 상품이
                <br />
                장바구니에 추가 되었습니다.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                쇼핑 계속하기
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                장바구니로 이동
              </button>
            </div>
          </div>
        </div>
      </div>
    </GroupPageTest>
  );
};

export default GroupPage;
