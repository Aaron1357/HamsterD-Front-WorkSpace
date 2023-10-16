import "bootstrap/dist/css/bootstrap.min.css";
import { addFile } from "../../api/boardFile";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "react-quill/dist/quill.snow.css";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";

const BoardStyle = styled.div`
  .head1 {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
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

  // const [file, setFiles] = useState(null);

  // const onUploadFile = (e) => {
  //   setFiles(e.target.files[0]);
  // };

  const navigate = useNavigate();

  //폼 전체 작성 후 클릭 할 때

  const onClick = async () => {

    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);

    try {
      await addFile(formData); // 비동기 작업 완료 대기
      navigate("/boardList"); // 파일 업로드가 완료되면 페이지 이동
    } catch (error) {
      // 에러 처리
      console.error("파일 업로드 중 오류 발생:", error);
    }
  };

  const toolbarOptions = [
    ["link", "image", "video"],
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
  ];

  Quill.register("modules/imageResize", ImageResize);

  const modules = {
    toolbar: {
      container: toolbarOptions,
    },
    imageResize: {
      // https://www.npmjs.com/package/quill-image-resize-module-react 참고
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize", "Toolbar"],
    },
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
              <label htmlFor="exampleFormControlInput1" className="form-label">
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
                <label className="form-check-label" htmlFor="flexRadioDefault1">
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
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  공개
                </label>
              </div>
            </div>

            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Description
              </label>
              <ReactQuill
                value={desc}
                onChange={(value) => setDesc(value)}
                modules={modules}
                formats={formats}
              />
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
            {/* <div className="input-group mb-3">
              <input
                type="file"
                className="form-control"
                id="inputGroupFile02"
                onChange={onUploadFile}
              />
              <label className="input-group-text" htmlFor="inputGroupFile02">
                Upload
              </label>
            </div> */}
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
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "align",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "background",
  "color",
  "link",
  "image",
  "video",
  "width",
];
