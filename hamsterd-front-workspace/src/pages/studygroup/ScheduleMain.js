import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
// import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
//import { getScheduleList } from "../../api/schedule";
import { getScheduleOfGroup } from "../../api/schedule";
import { getScheduleofGroupDate } from "../../api/schedule";
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

  // 목록의 추가(+) 버튼 클릭 시 schedule 등록 폼으로 이동
  const onClick = () => {
    navigate("/Schedule");
  };

  const [groupNo, setGroupNo] = useState(1);
  const [scheduleDate, setScheduleDate] = useState();

  // 특정 그룹의 schedule 목록 받아오기(우측 목록용)
  const [schedulesOfGroup, setschedulesOfGroup] = useState([]);

  // 특정 그룹의 schedule 목록 받아오기(좌측 캘린더 표시용)
  const [schedulesOfGroup2, setschedulesOfGroup2] = useState([]);

  // 특정 그룹, 날짜의 schedule 목록 받아오기
  // const [schedule, setSchedule] = useState([]);

  // 캘린더에 표시할 배열 새로 만들기 위해 변수 지정
  const [newSchedules, setNewSchedules] = useState([]);

  // 특정 그룹 목록 받아오는 로직(groupNo 넘김) + 날짜 변경처리
  const scheduleOfGroupAPI = async () => {
    const result = await getScheduleOfGroup(groupNo);
    //console.log(result.data); // 2023-10-12
    const data = result.data.map((item) => {
      const originalDate = new Date(item.scheduleDate);
      const nextDay = new Date(originalDate);
      nextDay.setDate(nextDay.getDate() + 1);
      //console.log(nextDay); // Fri Oct 13 2023 09:00:00 GMT+0900

      const newDate = new Date(nextDay);
      newDate.setDate(newDate.getDate());

      //console.log("newDate : " + newDate);

      const date = new Date(newDate);
      const year = date.getFullYear().toString().slice(-4); // 년도의 마지막 두 자리를 가져옴
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 +1 해주고, 두 자리로 맞춤
      const day = date.getDate().toString().padStart(2, "0"); // 일도 두 자리로 맞춤

      const yyyymmdd = year + "-" + month + "-" + day;
      //console.log(yyyymmdd);
      return {
        scheduleNo: item.scheduleNo,
        scheduleTitle: item.scheduleTitle,
        scheduleContent: item.scheduleContent,
        scheduleDate: yyyymmdd,
      };
    });
    setschedulesOfGroup(data);
    setschedulesOfGroup2(data);
  };

  useEffect(() => {
    scheduleOfGroupAPI();
  }, []);

  // 캘린더용 그룹별 일정 목록
  // 특정 그룹 목록 받아오는 로직(groupNo 넘김) + 날짜 변경처리

  // array.map으로 새로 배열만들기(배열 내 key 이름 일치시키기 위해서)
  const newList = schedulesOfGroup2.map((item) => {
    // console.log(item.scheduleDate);
    // console.log(item.scheduleTitle);

    return {
      title: item.scheduleTitle,
      date: item.scheduleDate,
      groupId: item.scheduleNo,
    };
  });

  // 특정 그룹의 스케줄 목록이 변경될 때마다 달력에 새로 표시
  useEffect(() => {
    if (schedulesOfGroup2.length !== 0) {
      setNewSchedules(newList);
    }
  }, [schedulesOfGroup2]);

  //특정 날짜 클릭시 발생하는 event 추가
  const handleDateClick = (arg) => {
    console.log(arg);
    //console.log(arg.date); // Mon Oct 23 2023 00:00:00 GMT+0900

    const date = new Date(arg.date);
    const year = date.getFullYear().toString().slice(-2); // 년도의 마지막 두 자리를 가져옴
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 +1 해주고, 두 자리로 맞춤
    const day = date.getDate().toString().padStart(2, "0"); // 일도 두 자리로 맞춤

    const yymmdd = year + month + day;
    console.log(yymmdd); // 231023

    setScheduleDate(yymmdd); // api에 scheduleDate yymmdd 형태로 넘김

    scheduleOfGroupDateAPI(groupNo, yymmdd);
  };

  // // 특정 그룹, 특정 날짜의 schedule 목록 받아오는 로직(캘린더 클릭시 목록 출력용)
  const scheduleOfGroupDateAPI = async (groupNo, scheduleDate) => {
    const result = await getScheduleofGroupDate(groupNo, scheduleDate);

    const data = result.data.map((item) => {
      const originalDate = new Date(item.scheduleDate);
      const nextDay = new Date(originalDate);
      nextDay.setDate(nextDay.getDate() + 1);
      //console.log(nextDay); // Fri Oct 13 2023 09:00:00 GMT+0900

      const newDate = new Date(nextDay);
      newDate.setDate(newDate.getDate());

      //console.log("newDate : " + newDate);

      const date = new Date(newDate);
      const year = date.getFullYear().toString().slice(-4); // 년도의 마지막 두 자리를 가져옴
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 +1 해주고, 두 자리로 맞춤
      const day = date.getDate().toString().padStart(2, "0"); // 일도 두 자리로 맞춤

      const yyyymmdd = year + "-" + month + "-" + day;
      //console.log(yyyymmdd);
      return {
        scheduleNo: item.scheduleNo,
        scheduleTitle: item.scheduleTitle,
        scheduleContent: item.scheduleContent,
        scheduleDate: yyyymmdd,
      };
    });
    setschedulesOfGroup(data);
  };

  // // useEffect 내부에서 API 호출
  useEffect(() => {
    if (scheduleDate !== undefined) {
      scheduleOfGroupDateAPI(groupNo, scheduleDate);
    }
  }, [scheduleDate]);

  // eventClick 함수
  const handleEventClick = (info) => {
    console.log(info.event.groupId);
    const scheduleNo = info.event.groupId;
    navigate("/Schedule");
  };

  return (
    <ScheduleStyle>
      <div className="content">
        <div className="calendar-section">
          {/* 달력 영역 */}
          <div className="calendar">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={newList} // 해당 날짜에 일정 표시하는 기능
              dateClick={handleDateClick}
              eventClick={handleEventClick}
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
                <th scope="col" width="100">
                  날짜
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
              {schedulesOfGroup.map((item) => (
                <tr key={item.scheduleNo}>
                  <th scope="row">{item.scheduleNo}</th>
                  <td>{item.scheduleDate}</td>
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
