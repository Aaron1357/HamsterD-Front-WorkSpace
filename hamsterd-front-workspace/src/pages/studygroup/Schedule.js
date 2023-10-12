import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useState } from "react";
import { addSchedule } from "../../api/schedule";
import { useNavigate } from "react-router-dom";
import scheduleMain from "./ScheduleMain";

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
  .fa-plus {
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

  #exampleFormControlTextarea1 {
    height: 200px;
  }

  .fc .fc-toolbar-title {
    color: black;
  }
`;

const Schedule = () => {
  const [title, setTitle] = useState([]);
  const [content, setContent] = useState([]);
  const [date, setDate] = useState([]);

  const navigate = useNavigate();

  const onClick = async () => {
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

  return (
    <ScheduleStyle>
      <div className="scheduleBody">
        <div className="scheduleContent">
          <form className="registerSchedule">
            <div className="add">
              <div className="mb-3">
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              {/* <button onClick={onClick}>추가</button> */}
              <FontAwesomeIcon icon={faPlus} onClick={onClick} />
              <FontAwesomeIcon icon={faXmark} />
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
