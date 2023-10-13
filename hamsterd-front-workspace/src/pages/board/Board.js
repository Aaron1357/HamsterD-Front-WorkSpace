import "bootstrap/dist/css/bootstrap.min.css";
import { useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize";
import "react-quill/dist/quill.snow.css";
import { addFile, addFileURL } from "../../api/boardFile";

const BoardStyle = styled.div`
  /* 스타일 내용 입력 */
`;

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
  ];

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [editorData, setEditorData] = useState({
    desc: "",
    img: null,
  });

  const handleEditorChange = (value) => {
    setEditorData({ ...editorData, desc: value });
    // You can also update other properties in editorData if needed.
  };

  const navigate = useNavigate();

  const formData = new FormData();

  const onClick = async () => {
    // const formData = {
    //   title: title,
    //   desc: desc,
    // };
    formData.append("title", title);
    formData.append("desc", desc);

    // formData.append("img", img);
    if (selectedFile) {
      formData.append("img", selectedFile);
    }
    const response = await addFile(formData);

    const editor = quillRef.current.getEditor();
    const range = editor.getSelection();

    const imageUrl = response.data.imgUrl;
    console.log("이미지 url : " + imageUrl);

    // 클라우드 환경이 아닌 로컬에서 사용했기때문에
    const path = `http://localhost:3000/inImg/${imageUrl}`;
    console.log(path);
    editor //에디터에 이미지 삽입
      .insertEmbed(range.index, "image", path);

    try {
      // 여기에서 파일을 업로드하고 나중에 navigate 호출
      navigate("/boardList");
    } catch (error) {
      console.error("파일 업로드 중 오류 발생:", error);
    }
  };

  const quillRef = useRef(null);

  //이미지 업로드 하기 위한 함수
  const imageHandler = () => {
    console.log("image Handler 들어옴");
    //파일 업로드하기 위한 input 태그 생성
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    console.log(input);

    // input.addEventListener("change", async () => {
    input.onchange = async () => {
      const file = input.files[0];

      // if (!file) return;
      // else {
      try {
        const formDataURL = new FormData();
        formDataURL.append("file", file);

        console.log(formDataURL);

        //이미지 업로드하고 이미지 url 가져오기
        const response = await addFileURL(formDataURL);
        console.log(response);

        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();

        const imageUrl = response.data;
        console.log("이미지 url : " + imageUrl);

        // 클라우드 환경이 아닌 로컬에서 사용했기때문에
        const path = `http://localhost:3000/img/${imageUrl}`;
        console.log(path);
        editor //에디터에 이미지 삽입
          .insertEmbed(range.index, "image", path);

        // editor.clipboard.dangerouslyPasteHTML(
        //   range,
        //   `<img src="${path}" alt="image" />`
        // );
        console.log(editor.insertEmbed);
        editor.setSelection(range.index + 1);
        console.log(editor);
        console.log("인덱스 : " + range.index);
        console.log(range);
      } catch (error) {
        console.log("서버 통신 문제로 불가능");
        // }
      }
    };
  };

  Quill.register("modules/imageResize", ImageResize);

  const toolbarOptions = [
    ["link", "image", "video"],
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
  ];

  const modules = useMemo(
    () => ({
      toolbar: {
        container: toolbarOptions,
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: false,
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
                ref={quillRef}
                value={desc}
                onChange={setDesc}
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
