import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addStudyGroup } from "../../api/studygroup";

const CreateGroupStyle = styled.div`
  .mainsection {
    border: 1px solid rgba(211, 157, 87);
    border-radius: 20px;
    width: 1600px;
    margin-top: 30px;
    color: rgba(211, 157, 87);
    //
  }
  .section {
    box-shadow: var(
      --shadows-gray-blue-3-5-b-box-shadow,
      0px 2px 5px 0px rgba(38, 51, 77, 0.03)
    );
    margin-top: 80px;
    margin-left: 200px;
    width: 500px;
    height: 1000px;
  }
  #description {
    height: 100px;
  }
`;

const CreateGroup = () => {
  const [title, setTitle] = useState([]);
  const [content, setContent] = useState([]);
  const [academy, setAcademy] = useState([]);

  const navigate = useNavigate();

  const onClick = async () => {
    const formData = new FormData();
    formData.append("grouptitle", title);
    formData.append("groupcontent", content);
    formData.append("groupacademy", academy);
    // const formData2 = {
    //   title : ndsklanlkdnal,
    //   content : dnlksanldasnkd,
    // }
    try {
      await addStudyGroup(formData); // 비동기 작업 완료 대기
      navigate("/studygroup"); // 파일 업로드가 완료되면 페이지 이동
    } catch (error) {
      // 에러 처리
      console.error("파일 업로드 중 오류 발생:", error);
    }
  };

  return (
    <CreateGroupStyle>
      <div className="mainsection">
        <div className="section" id="section2">
          <form className="creategroup">
            <div className="mb-3">
              <label htmlFor="nickName" className="form-label">
                스터디그룹명
              </label>
              <div className="input-group">
                <input
                  type="text"
                  id="nickName"
                  className="form-control"
                  name="nickname"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="profileImage" className="form-label">
                프로필 이미지 업로드
              </label>
              <input
                type="file"
                accept="image/*"
                id="profileImage"
                className="form-control"
              />
              <span className="form-text">
                이미지 파일을 업로드하세요 (jpg, png 등)
              </span>
            </div>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                그룹 소개
              </label>
              <input
                type="text"
                id="description"
                className="form-control"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                name="name"
              />
              <span className="form-text">
                스터디그룹에 대한 간략한 소개를 적어주세요
              </span>
            </div>

            <div className="mb-3">
              <label htmlFor="academy" className="form-label">
                학원 이름
              </label>
              <input
                type="text"
                id="academy"
                className="form-control"
                required
                value={academy}
                onChange={(e) => setAcademy(e.target.value)}
                name="academyName"
              />
              <span className="form-text">
                현재 다니고 계신 학원 명을 입력해 주세요
              </span>
            </div>

            <button
              type="submit"
              id="signupbtn"
              className="btn btn-primary"
              onClick={onClick}
            >
              스터디그룹 생성
            </button>
          </form>
        </div>
      </div>
    </CreateGroupStyle>
  );
};

export default CreateGroup;
