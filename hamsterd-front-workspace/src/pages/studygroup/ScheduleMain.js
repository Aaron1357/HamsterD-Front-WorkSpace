import React, { useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const ScheduleStyle = styled.div`
  .content {
    display: flex;
    justify-content: center;
  }
  .left-section {
    width: 500px;
    height: 100vh;
    margin: 10px;
    /* border: 1px solid lightcoral; */
  }

  .studyGroup {
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: 1px solid gray; */
  }
  .calendar {
    height: 500px;
    display: flex;
    justify-content: center;
    padding-top: 20px;
    /* border: 1px solid lightseagreen; */
  }
  .react-calendar {
    width: 420px;
    height: 320px;
    min-width: 350px;
  }

  .right-section {
    width: 500px;
    height: 100vh;
    margin: 10px;
    /* border: 1px solid lightcoral; */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 80px;
  }

  .right-section table {
    width: 450px;
    min-width: 350px;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    //hover 했을 때 색상 변경
    background: beige;
    border-radius: 100%;
  }

  .react-calendar__tile--active {
    background: beige;
    color: black;
    border-radius: 100%;
  }
`;

const ScheduleMain = () => {
  const [value, onChange] = useState(new Date());

  return (
    <ScheduleStyle>
      <div className="content">
        <div className="left-section">
          {/* 달력 영역 */}
          <div className="calendar">
            <Calendar
              onChange={onChange}
              value={value}
              formatDay={(locale, date) => moment(date).format("DD")}
            />
          </div>
        </div>

        {/* 일정 목록 */}
        <div className="right-section">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">번호</th>
                <th scope="col">제목</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>캘린더 디자인 다듬기</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>멤버 프로필 가져오기</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>DB 수정</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>파일 첨부하기 기능</td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td>휴일엔 쉬기</td>
              </tr>
              <tr>
                <th scope="row">6</th>
                <td>주말엔 엽떡먹기</td>
              </tr>
              <tr>
                <th scope="row">7</th>
                <td>휴...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ScheduleStyle>
  );
};

export default ScheduleMain;
