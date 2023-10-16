import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark, faMinus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { addSchedule } from "../../api/schedule";
import { useNavigate } from "react-router-dom";
import { getOneSchedule } from "../../api/schedule";

const ScheduleStyle = styled.div`
  .scheduleBody {
    width: 1000px;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .scheduleContent {
    width: 600px;
    height: 600px;
    background-color: antiquewhite;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .registerSchedule {
    /* border: 1px solid lightcoral; */
    width: 500px;
    height: 500px;
  }
  .add {
    width: 100%;
    height: 50px;
    /* border: 1px solid lightcoral; */
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  #date {
    width: 150px;
    height: 20px;
    margin-top: 13px;
    margin-right: 15px;
    /* border: 1px solid lightsalmon; */
  }

  #date:hover {
    cursor: pointer;
  }

  .fa-plus {
    width: 20px;
    height: 20px;
    /* border: 1px solid gray; */
    margin-right: 15px;
  }

  .fa-plus:hover {
    cursor: pointer;
  }

  .fa-minus {
    width: 20px;
    height: 20px;
    /* border: 1px solid gray; */
    margin-right: 15px;
  }

  .fa-xmark {
    width: 20px;
    height: 20px;
    /* border: 1px solid gray; */
    margin-right: 15px;
  }
  .fa-xmark:hover {
    cursor: pointer;
  }

  #exampleFormControlTextarea1 {
    height: 200px;
  }

  .fc .fc-toolbar-title {
    color: black;
  }

  /* // type이 date인 input의 placeholder를 커스텀하기 위한 선택자
  // 기본적으로 type date인 input은 placeholder가 먹히지 않기 때문이다!
  input[type="date"]::before {
    content: attr(
      placeholder
    ); // input 태그의 placeholder라는 속성값을 가져와서 content로 사용한다. 보통은 placeholder보다는 data-placeholder라는 커스텀 속성을 만들어서 사용하시는 것 같다.
    width: 100%;
    height: 100%;
  }

  // input에 어떠한 유효값이 입력된 상태인지 확인하는 선택자
  // 날짜를 선택하면 유효값이 입력된다.
  // 이 속성을 활용하고자 한다면 반드시 태그에 required 속성을 달아줘야한다.
  input[type="date"]:valid::before {
    display: none; // 유효값이 입력된 경우 before에 있는 것을 사라지게 한다. 즉, placeholder를 사라지게 한다.
  } */
`;

const Schedule = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState([]);
  const [content, setContent] = useState([]);
  const [date, setDate] = useState([]);

  // 스터디그룹, 스케줄넘버(임의 지정 - scheduleMain에서 eventClick 이벤트 실행 시 groupNo, scheduleNo 넘겨받아야 함)
  const [groupNo, setGroupNo] = useState(1);
  const [scheduleNo, setScheduleNo] = useState(1);

  const [schedules, setSchedules] = useState([]);

  const scheduleAPI = async () => {
    const result = await getOneSchedule(groupNo, scheduleNo);
    setSchedules(result.data);

    console.log(result.data);
  };

  useEffect(() => {
    scheduleAPI(groupNo, scheduleNo);
  }, []);

  // 추가 버튼
  const plus = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("date", date);

    console.log("title : " + formData.get("title"));
    console.log("content : " + formData.get("content"));
    console.log("date : " + formData.get("date"));

    try {
      await addSchedule(formData); // 비동기 작업 완료 대기
      navigate("/grouppage"); // 파일 업로드가 완료되면 페이지 이동
    } catch (error) {
      // 에러 처리
      console.error("파일 업로드 중 오류 발생:", error);
    }
  };

  // 닫기 버튼
  const close = () => {
    navigate("/grouppage");
  };

  return (
    <ScheduleStyle>
      <div className="scheduleBody">
        <div className="scheduleContent">
          {/* 
              schedules가 빈 값인 경우: 최초 등록 폼
              schedules가 있는 경우: placeholder에 기존값 넣기
            */}
          <form className="registerSchedule">
            <div className="add">
              <div className="mb-3">
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  value={date}
                  placeholder={schedules.scheduleDate}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  aria-required="true"
                />
              </div>
              {/* <button onClick={onClick}>추가</button> */}
              <FontAwesomeIcon icon={faPlus} onClick={plus} />
              <FontAwesomeIcon icon={faMinus} />
              <FontAwesomeIcon icon={faXmark} onClick={close} />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                제목
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                value={title}
                placeholder={schedules.scheduleTitle}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                내용
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                value={content}
                placeholder={schedules.scheduleContent}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
          </form>
        </div>
      </div>
    </ScheduleStyle>
  );
};

export default Schedule;
