import React, { useState, useEffect } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
// import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
//import { getScheduleList } from "../../api/schedule";
import { getScheduleOfGroup } from "../../api/schedule";
import { getScheduleofGroupDate } from "../../api/schedule";
import { useNavigate } from "react-router-dom";
import { getOneSchedule } from "../../api/schedule";
import { showMember } from "../../api/studygroup";
import {
  getScheduleByTitle,
  getScheduleByMember,
  getScheduleByContent,
} from "../../api/schedule";
// css
const ScheduleStyle = styled.div`
  .content {
    width: 1000px;
    height: 600px;
    display: flex;
    justify-content: center;
    /* background-color: white; */
    /* border: 1px solid lightgray; */
  }//

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

  .scheduleTable {
    height: 530px;
  }

  .table {
    width: 500px;
    min-width: 400px;
    --bs-table-bg: #fff0;
    font-size: 0.8rem;
  }

  .table thead {
    background-color: #f5f5f5;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .fc .fc-button-primary {
    background-color: #2c3e5000;
    border-color: #fff0;
    color: #212529;
    color: black;
    font-weight: bold;
  }

  .fc-direction-ltr .fc-toolbar > * > :not(:first-child) {
    margin-left: 0;
  }

  .fc .fc-button {
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 0.25em;
    display: inline-block;
    font-size: 1em;
    font-weight: 400;
    line-height: 1.5;
    /* padding: 0.4em 0.65em; */
    text-align: center;
    user-select: none;
    vertical-align: middle;
  }

  .fc .fc-button {
    display: inline-block;
    font-size: 1em;
    font-weight: 600;
  }

  #scheduleTitle:hover {
    cursor: pointer;
  }

  .mb-3 {
    height: 35px;
    display: flex;
    align-items: center;
    margin: 0;
  }
  .searchSchedule {
    width: 500px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  input {
    width: 350px;
    height: 30px;
  }

  .form-select-sm {
    width: 100px;
    font-size: 12px;
  }
  .searchBtn {
    width: 50px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .fa-magnifying-glass {
    color: gray;
  }

  .searchBtn:hover,
  .form-select-sm:hover {
    cursor: pointer;
  }

  ::-webkit-scrollbar {
    display: none;
  }
`;

const ScheduleMain = (props) => {
  const navigate = useNavigate();

  const [groupNo, setGroupNo] = useState(props.groupNo);

  // 특정 그룹의 schedule 목록 받아오기(캘린더용 목록용)
  const [schedulesOfGroup, setschedulesOfGroup] = useState([]);

  // 캘린더에 표시할 배열 새로 만들기 위해 변수 지정(full-calendar 라이브러리에 맞게)
  const [newSchedules, setNewSchedules] = useState([]);

  // 특정 그룹의 schedule 목록 받아오기(목록 표시용)
  const [schedulesOfGroup2, setschedulesOfGroup2] = useState([]);

  const [scheduleDate, setScheduleDate] = useState();

  const [scheduleNo, setScheduleNo] = useState(0);

  // 유저 정보
  const user = JSON.parse(localStorage.getItem("user"));



  // 목록의 추가(+) 버튼 클릭 시 schedule 등록 폼으로 이동
  const onClick = async () => {
    const userGroupNo = user.studyGroup.groupNo;

    if (userGroupNo == groupNo) {
      navigate("/schedule", {
        state: {
          groupNo: groupNo,
          scheduleNo: scheduleNo,
        },
      });
    } else {
      alert("그룹 멤버가 아닙니다!");
    }
  };



  // schedule 1개 상세 조회(수정, 삭제화면 넘기기 위해)
  const [schedule, setSchedule] = useState();



  // 특정 그룹 목록 받아오는 api + 날짜 변경처리
  const scheduleOfGroupAPI = async () => {
    const result = await getScheduleOfGroup(groupNo);

    const data = result.data.map((item) => {
      const originalDate = new Date(item.scheduleDate);

      const newDate = new Date(originalDate);
      newDate.setDate(newDate.getDate());

      const date = new Date(newDate);
      const year = date.getFullYear().toString().slice(-4);
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); 
      const day = date.getDate().toString().padStart(2, "0"); 

      const yyyymmdd = year + "-" + month + "-" + day;

      return {
        scheduleNo: item.scheduleNo,
        scheduleTitle: item.scheduleTitle,
        scheduleContent: item.scheduleContent,
        scheduleDate: yyyymmdd,
        nickname: item.member.nickname,
      };
    });

    setschedulesOfGroup(data); // 캘린더용
    setschedulesOfGroup2(data); // 목록용
  };

  // 처음 화면 띄울때 그룹별 일정 목록 받아옴
  useEffect(() => {
    scheduleOfGroupAPI();
  }, []);

  // 캘린더용 그룹별 일정 목록
  // array.map으로 새로 배열만들기(배열 내 key 이름 일치시키기 위해서)
  const newList = schedulesOfGroup.map((item) => {
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
    //console.log(arg.date); // Mon Oct 23 2023 00:00:00 GMT+0900

    const date = new Date(arg.date);
    const year = date.getFullYear().toString().padStart(4); 
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); 
    const day = date.getDate().toString().padStart(2, "0"); 
    const yymmdd = year + month + day;

    setScheduleDate(yymmdd);
    scheduleOfGroupDateAPI(groupNo, yymmdd);
  };

  // 특정 그룹, 특정 날짜의 schedule 목록 받아오는 로직(캘린더 클릭시 목록 출력용)
  const scheduleOfGroupDateAPI = async (groupNo, scheduleDate) => {
    const result = await getScheduleofGroupDate(groupNo, scheduleDate);

    const data = result.data.map((item) => {
      const originalDate = new Date(item.scheduleDate);

      const newDate = new Date(originalDate);
      newDate.setDate(newDate.getDate());

      const date = new Date(newDate);
      const year = date.getFullYear().toString().slice(-4);
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");

      const yyyymmdd = year + "-" + month + "-" + day;
      return {
        scheduleNo: item.scheduleNo,
        scheduleTitle: item.scheduleTitle,
        scheduleContent: item.scheduleContent,
        scheduleDate: yyyymmdd,
        nickname: item.member.nickname,
      };
    });
    setschedulesOfGroup2(data);
  };

  useEffect(() => {
    if (scheduleDate !== undefined) {
      scheduleOfGroupDateAPI(groupNo, scheduleDate);
    }
  }, [scheduleDate]);

  // eventClick 함수
  const handleEventClick = async (info) => {
    const scheduleData = await getOneScheduleAPI(groupNo, info.event.groupId);

    navigate("/schedule", {
      state: {
        groupNo: groupNo,
        scheduleNo: info.event.groupId,
        schedule: scheduleData,
      },
    });
  };

  const getOneScheduleAPI = async (groupNo, scheduleNo) => {
    const result = await getOneSchedule(groupNo, scheduleNo);
    setSchedule(result.data);
    const schedule2 = result.data;
    // console.log(schedule2);
    return schedule2;
  };

  // 캘린더 상단 + 버튼 클릭시 등록 폼으로 이동(내 그룹일때만)
  const handleAddEvent = async () => {

    const userGroupNo = user.studyGroup.groupNo;

    if (userGroupNo == groupNo) {
      navigate("/schedule", {
        state: {
          groupNo: groupNo,
          scheduleNo: scheduleNo,
        },
      });
    } else {
      alert("그룹 멤버가 아닙니다!");
    }
  };

  // 목록에서 일정 제목 클릭 시 등록(수정삭제)화면으로 이동
  const viewDetail = async (scheduleNo) => {
    const scheduleData = await getOneScheduleAPI(groupNo, scheduleNo);

    navigate("/schedule", {
      state: {
        groupNo: groupNo,
        scheduleNo: scheduleNo,
        schedule: scheduleData,
      },
    });
  };

  // 검색 필터
  const [filter, setFilter] = useState("title");

  // 검색 필터 선택 시 필터값 처리하는 함수
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const [searchKeyword, setsearchKeyword] = useState();

  // 검색 버튼 클릭 시 search api 적용하는 함수
  // 우측 목록만 검색결과 나오게
  const handleSearch = async () => {
    if (searchKeyword) {
      // 제목 검색
      if (filter === "title") {
        const result = await getScheduleByTitle(groupNo, searchKeyword);
        if (result.data.length !== 0) {
          const data = result.data.map((item) => {
            const originalDate = new Date(item.scheduleDate);

            const newDate = new Date(originalDate);
            newDate.setDate(newDate.getDate());

            const date = new Date(newDate);
            const year = date.getFullYear().toString().slice(-4); 
            const month = (date.getMonth() + 1).toString().padStart(2, "0"); 
            const day = date.getDate().toString().padStart(2, "0"); 

            const yyyymmdd = year + "-" + month + "-" + day;

            return {
              scheduleNo: item.scheduleNo,
              scheduleTitle: item.scheduleTitle,
              scheduleContent: item.scheduleContent,
              scheduleDate: yyyymmdd,
              nickname: item.member.nickname,
            };
          });
          setschedulesOfGroup2(data);
        } else {
          alert("검색 결과가 없습니다!");
        }

        // 내용 검색
      } else if (filter === "content") {
        const result = await getScheduleByContent(groupNo, searchKeyword);
        if (result.data.length !== 0) {
          const data = result.data.map((item) => {
            const originalDate = new Date(item.scheduleDate);

            const newDate = new Date(originalDate);
            newDate.setDate(newDate.getDate());

            const date = new Date(newDate);
            const year = date.getFullYear().toString().slice(-4); 
            const month = (date.getMonth() + 1).toString().padStart(2, "0"); 
            const day = date.getDate().toString().padStart(2, "0"); 

            const yyyymmdd = year + "-" + month + "-" + day;

            return {
              scheduleNo: item.scheduleNo,
              scheduleTitle: item.scheduleTitle,
              scheduleContent: item.scheduleContent,
              scheduleDate: yyyymmdd,
              nickname: item.member.nickname,
            };
          });
          setschedulesOfGroup2(data);
        } else {
          alert("검색 결과가 없습니다!");
        }
        // 작성자 검색
      } else if (filter === "user") {
        const result = await getScheduleByMember(searchKeyword);
        if (result.data.length !== 0) {
          const data = result.data.map((item) => {
            const originalDate = new Date(item.scheduleDate);

            const newDate = new Date(originalDate);
            newDate.setDate(newDate.getDate());

            const date = new Date(newDate);
            const year = date.getFullYear().toString().slice(-4); 
            const month = (date.getMonth() + 1).toString().padStart(2, "0"); 
            const day = date.getDate().toString().padStart(2, "0");

            const yyyymmdd = year + "-" + month + "-" + day;

            return {
              scheduleNo: item.scheduleNo,
              scheduleTitle: item.scheduleTitle,
              scheduleContent: item.scheduleContent,
              scheduleDate: yyyymmdd,
              nickname: item.member.nickname,
            };
          });
          setschedulesOfGroup2(data);
        } else {
          alert("검색 결과가 없습니다!");
        }
      }
    } else {
      alert("검색어를 입력해주세요!");
    }
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
              headerToolbar={{
                start: "prev next",
                center: "title",
                end: "today custom",
              }}
              customButtons={{
                custom: {
                  text: "+",
                  click: handleAddEvent,
                },
              }}
              events={newList} 
              dateClick={handleDateClick}
              eventClick={handleEventClick}
            />
          </div>
        </div>

        {/* 일정 목록 */}
        <div className="schedule-list">
          {/* 일정 검색창 */}
          <div className="mb-3">
            <form className="searchSchedule">
              <select
                className="form-select form-select-sm"
                aria-label="Small select example"
                onChange={handleFilterChange}
              >
                <option value="title" defaultValue>
                  제목
                </option>
                <option value="content">내용</option>
                <option value="user">작성자</option>
              </select>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                value={searchKeyword}
                onChange={(e) => setsearchKeyword(e.target.value)}
              />
              <div className="searchBtn">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  onClick={handleSearch}
                />
              </div>
            </form>
          </div>
          <div
            className="scheduleTable"
            style={{ maxHeight: "510px", overflow: "auto" }}
          >
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" width="50">
                    <FontAwesomeIcon
                      icon={faPlus}
                      onClick={onClick}
                    />
                  </th>
                  <th scope="col" width="150">
                    날짜
                  </th>
                  <th scope="col" width="200">
                    제목
                  </th>
                  <th scope="col" width="100">
                    작성자
                  </th>
                </tr>
              </thead>
              <tbody>
                {schedulesOfGroup2?.map((item, index) => (
                  <tr key={item.scheduleNo}>
                    <td scope="row">{index + 1}</td>
                    <td>{item.scheduleDate}</td>
                    <td
                      id="scheduleTitle"
                      onClick={() => viewDetail(item.scheduleNo)}
                    >
                      {item.scheduleTitle}
                    </td>
                    <td>{item.nickname}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ScheduleStyle>
  );
};

export default ScheduleMain;
