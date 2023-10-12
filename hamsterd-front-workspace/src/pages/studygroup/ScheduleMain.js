import React, { useState, useEffect } from "react";
// import Calendar from "react-calendar";
// import moment from "moment";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { getScheduleList } from "../../api/schedule";
import { useNavigate } from "react-router-dom";

const ScheduleStyle = styled.div`
  .content {
    width: 1000px;
    height: 600px;
    display: flex;
    justify-content: center;
    /* background-color: white; */
    /* border: 1px solid lightgray; */
  }

  .calendar-section {
    width: 600px;
    height: 600px;
    /* height: 100vh; */
    /* border: 1px solid lightcoral; */
  }

  .calendar {
    height: 600px;
    display: flex;
    justify-content: center;
    padding-top: 20px;
    padding-bottom: 20px;
    /* border: 1px solid lightseagreen; */
  }
  // 테이블 영역
  .fc {
    /* border: 1px solid lightcoral; */
    width: 450px;
  }

  // 년도, 월
  .fc .fc-toolbar-title {
    font-size: 1.75em;
    margin: 0px;
    color: black;
    font-weight: bold;
  }

  // 일~토 요일
  .fc-col-header-cell-cushion {
    color: black;
  }

  // 각 일자
  .fc-day a {
    color: black;
    text-decoration: none;
  }

  .schedule-list {
    width: 600px;
    height: 600px;
    /* height: 100vh; */
    /* border: 1px solid lightcoral; */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
  }

  .schedule-list table {
    width: 450px;
    min-width: 350px;
  }
`;

const ScheduleMain = () => {
  // 추가 버튼 누르면 Schedule 페이지로 이동
  const navigate = useNavigate();

  const onClick = (e) => {
    navigate("/Schedule");
  };

  // schedule 목록 받아오기
  const [schedules, setSchedules] = useState([]);
  const [newSchedules, setNewSchedules] = useState([]);
  // array.map으로 새로 배열만들기(타입 일치시키기 위해서)
  const newList = schedules.map((item) => {
    // console.log(item.scheduleDate);
    // console.log(item.scheduleTitle);
    return {
      title: item.scheduleTitle,
      date: item.scheduleDate.substr(0, 10),
    };
  });

  console.log(newSchedules);

  useEffect(() => {
    setNewSchedules(newList);
  }, [schedules]);

  const scheduleListAPI = async () => {
    const result = await getScheduleList();
    setSchedules(result.data);
  };

  useEffect(() => {
    scheduleListAPI();
  }, []);

  return (
    <ScheduleStyle>
      <div className="content">
        <div className="calendar-section">
          {/* 달력 영역 */}
          <div className="calendar">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={newSchedules}
            />
          </div>
        </div>

        {/* 일정 목록 */}
        <div className="schedule-list">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" width="50">
                  번호
                </th>
                <th scope="col" width="200">
                  제목
                </th>
                <th scope="col" width="10">
                  <FontAwesomeIcon icon={faPlus} onClick={onClick} />
                </th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((item) => (
                <tr key={item.scheduleNo}>
                  <th scope="row">{item.scheduleNo}</th>
                  <td colSpan={2}>{item.scheduleTitle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ScheduleStyle>
  );
};

export default ScheduleMain;
