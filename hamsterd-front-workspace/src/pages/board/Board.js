import "bootstrap/dist/css/bootstrap.min.css";
import { useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize";
import "react-quill/dist/quill.snow.css";
import { addFile } from "../../api/boardFile";
import ImageUploader from "quill-image-uploader";
import { useSelector } from "react-redux";

const BoardStyle = styled.div`
  /* 스타일 내용 입력 */
`;
//이미지 업로드 시 quill에 추가
Quill.register("modules/imageUploader", ImageUploader);
//이미지 사이즈 크기 조정 quill에 추가
Quill.register("modules/imageResize", ImageResize);

const Board = () => {
  const formats = [
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
    "imageBlot",
  ];

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [securityCheck, setSecurityCheck] = useState("n");
  const [img, setImg] = useState([]);
  //게시물 이미지 업로드시 여러개 넣을 수 있게 배열로 만들어줌
  const images = [];

  const token = localStorage;

  const navigate = useNavigate();

  const formData = new FormData();

  const onClick = async () => {
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("securityCheck", securityCheck);
    formData.append("token", token);
    console.log(desc);
    console.log(img);
    // data-type : clob <-- 한 컬럼에 html 통째로!

    await addFile(formData);
    navigate("/boardList");
  };

  const toolbarOptions = [
    ["link", "image", "video"],
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    //게시물에서 이미지 여러개 담을때 필요함
    ["images"],
  ];

  const modules = useMemo(
    () => ({
      toolbar: {
        container: toolbarOptions,
      },
      clipboard: {
        matchVisual: false,
      },

      imageUploader: {
        upload: (file) => {
          return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("image", file);

            fetch(
              "https://api.imgbb.com/1/upload?key=334ecea9ec1213784db5cb9a14dac265",
              {
                method: "POST",
                body: formData,
              }
            )
              .then((response) => response.json())
              .then((result) => {
                console.log(file);
                images.push(file);
                console.log(images);
                setImg(images);
                // setImages([...images, file]);
                console.log(result);
                resolve(result.data.url);
              })
              .catch((error) => {
                reject("Upload 실패");
                console.error("Error : ", error);
              });
          });
        },
      },
      imageResize: {
        displaySize: true,
        parchment: Quill.import("parchment"),
        modules: ["Resize", "DisplaySize", "Toolbar"],
      },
    }),
    []
  );

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
                onChange={(e) => {
                  console.log(e.target.value);
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="formCheck">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  value="y"
                  checked={securityCheck === "y"}
                  onChange={(e) => {
                    setSecurityCheck(e.target.value);
                  }}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  익명
                </label>
              </div>

              <div className="form-check">
                <input
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
                onChange={(e) => {
                  console.log(e);
                  setDesc(e);
                }}
                modules={modules}
                formats={formats}
                theme="snow"
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
