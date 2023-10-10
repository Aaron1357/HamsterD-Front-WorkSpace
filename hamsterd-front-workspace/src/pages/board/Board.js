import "bootstrap/dist/css/bootstrap.min.css";
import { addFile } from "../../api/boardFile";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const BoardStyle = styled.div`
  body {
    background-color: rgb(231, 250, 215);
  }

  .head1 {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(255, 247, 237);
  }

  .head2 {
    border: 5px solid rgb(228, 192, 228);
    border-radius: 10px;
    background-color: white;
    width: 600px;
    height: 700px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  form {
    border-radius: 10px;
    width: 500px;
    height: 650px;

    background-color: white;
  }
  .head {
    border: 4px #808080;
    padding: 10px;
  }

  .headName {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
    color: plum;
  }

  .form-select {
    margin-bottom: 15px;
  }

  .formCheck {
    display: flex;
    justify-content: flex-end;
    margin-left: 10px;
  }

  .form-check {
    margin: 5px;
  }

  .button1 {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }

  #button1 {
    font-size: 10px;
    text-align: center;
  }

  #button2 {
    margin: 10px;
  }

  .btnn {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
`;
const Board = () => {
  const [title, setTitle] = useState([]);
  const [desc, setDesc] = useState([]);

  const emptyNickNameRef = useRef();
  const nickNameRef = useRef();

  // const [nickname, setNickname] = useState([]);

  //파일 가져올 변수 생성
  //파일 가져오려면 초기값 null로 설정
  const [file, setFiles] = useState(null);

  const onUploadFile = (e) => {
    setFiles(e.target.files[0]);
  };

  // const nicknameClick = (e) => {
  //   setNickname();
  // };

  const navigate = useNavigate();

  //폼 전체 작성 후 클릭 할 때
  const onClick = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    // formData.append("nickname", nickname);
    formData.append("file", file);
    // console.log(title);
    // console.log(desc);
    // console.log(file);
    console.log(formData.get("file"));

    // if (nickNameRef.current.checked === true) {
    //   //공개로 체크를 한 경우
    //   //, 뒤에 로그인한 값에서 NAME을 넣으면 됨
    //   //formData.append("name", );
    // }
    addFile(formData);
    navigate("/boardList");
  };

  return (
    <BoardStyle>
      <div className="head1">
        <div className="head2">
          <form>
            <div className="headName">게시물 등록</div>
            <select className="form-select" aria-label="Default select example">
              <option selected>게시물 목록</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>

            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="formCheck">
              <div className="form-check">
                <input
                  ref={emptyNickNameRef}
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                />
                <label className="form-check-label" for="flexRadioDefault1">
                  익명
                </label>
              </div>
              <div className="form-check">
                <input
                  ref={nickNameRef}
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  checked
                />
                <label className="form-check-label" for="flexRadioDefault2">
                  공개
                </label>
              </div>
            </div>

            <div className="mb-3">
              <label for="exampleFormControlTextarea1" className="form-label">
                Description
              </label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                type="textarea"
                col={5}
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="6"
                placeholder="내용을 입력하세요"
              ></textarea>
            </div>
            <div className="button1">
              <button
                type="button"
                className="btn btn-outline-warning"
                id="button1"
              >
                임시저장하기
              </button>
            </div>
            <div className="input-group mb-3">
              <input
                type="file"
                className="form-control"
                id="inputGroupFile02"
                onChange={onUploadFile}
              />
              <label className="input-group-text" for="inputGroupFile02">
                Upload
              </label>
            </div>
            <div className="btnn">
              <div>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  id="button2"
                >
                  취소하기
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  onClick={onClick}
                  id="button2"
                >
                  등록하기
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </BoardStyle>
  );
};

export default Board;
