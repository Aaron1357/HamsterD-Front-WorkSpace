import "bootstrap/dist/css/bootstrap.min.css";
import { addFile } from "../../api/boardFile";
import { useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import formats from "./Format";

const BoardStyle = styled.div`
  /* 스타일 내용 입력 */
`;

const Board = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const navigate = useNavigate();
  const quillRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const input = useRef(null);

  const onClick = async (e) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);

    if (selectedFile) {
      formData.append("img", selectedFile);
    }

    try {
      await addFile(formData);
      navigate("/boardList");
    } catch (error) {
      console.error("파일 업로드 중 오류 발생:", error);
    }
  };

  const imageHandler = () => {
    if (input.current) {
      input.current.click();
    }
  };

  if (input.current) {
    input.current.addEventListener("change", async () => {
      const selectedFile = input.current.files[0];
      if (selectedFile) {
        try {
          const formData = new FormData();
          formData.append("img", selectedFile);
          const response = await addFile(formData);
          const imgUrl = response.data.imgUrl;

          const editor = quillRef.current.getEditor();
          const range = editor.getSelection();
          editor.insertEmbed(range.index, "image", imgUrl);
          editor.setSelection(range.index + 1);
        } catch (error) {
          console.error("이미지 업로드 중 오류 발생:", error);
        }
      }
    });
  }

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

  const modules = useMemo(
    () => ({
      toolbar: {
        container: toolbarOptions,
      },
      handlers: {
        image: imageHandler,
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
    [toolbarOptions, imageHandler]
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
                onChange={(e) => setTitle(e.target.value)}
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
// export const formats = [
//   "header",
//   "font",
//   "size",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "align",
//   "blockquote",
//   "list",
//   "bullet",
//   "indent",
//   "background",
//   "color",
//   "link",
//   "image",
//   "video",
//   "width",
// ];
