import styled from "styled-components";
import { updateMember } from "../../api/login";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const UpdateStyle = styled.div`
  .mainsection {
    border: 1px solid rgba(211, 157, 87);
    border-radius: 20px;
    width: 1600px;
    margin-top: 30px;
    color: rgba(211, 157, 87);
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
  .profileimg {
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    //프로필 이미지 (오리)//
  }

  .photo-line {
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    margin-top: 50px; //프로필-테두리 위쪽 공간//
  }
`;

const Update = () => {
  const navigate = useNavigate();

  

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(file);
   
    // 로컬 스토리지에서 member 데이터 가져오기
    const memberData = JSON.parse(sessionStorage.getItem("member"));

    // 새로운 FormData 생성
    const formData2 = new FormData();
    
    // 필드 추가
  
    formData2.set("password", e.target.password.value);
    formData2.set("nickname", e.target.nickname.value);
    formData2.set("profile", file);


    // 식별자 넣기(id)
    formData2.set("id", memberData.id);
    

    // console.log(formData2.get("password"));
    // console.log(formData2.get("nickname"));
   

    
    updateMember(formData2);
    window.location.reload(true); 
    navigate("/mypage");
   
  };

  const handleImageClick = () => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click(); // input 요소 클릭
    }
  };

  const [file, setFile] = useState(null);
  // const [viewFile, setViewFile] = useState(null);

  const handleFileChange = (e) => {

    setFile(e.target.files[0]);

    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     setViewFile(e.target.result);
    //   };
    //   reader.readAsDataURL(viewFile);
    // }
  };

  
  return (
    <UpdateStyle>
      <div className="mainsection">
        <div className="section" id="section2">
          <form className="update" onSubmit={handleSubmit}>
            <div className="photo-line">
              <div className="photo">
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <img
                  className="profileimg"
                  src={file}
                  alt="Profile"
                  onClick={handleImageClick}
                />
              </div>
            </div>
            
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                변경 할 비밀번호
              </label>
              <div className="input-group">
                <input
                  type="password"
                  id="password2"
                  className="form-control"
                  aria-describedby="passwordHelpInline"
                  name="password"
                  required
                />
              </div>
            </div>
            
            <div className="mb-3">
              <label htmlFor="nickName" className="form-label">
                변경 할 닉네임
              </label>
              <div className="input-group">
                <input
                  type="text"
                  id="nickName"
                  className="form-control"
                  aria-describedby="passwordHelpInline"
                  name="nickname"
                  required
                />
              </div>
            </div>
            
            <br></br>
            <button type="submit" id="updatebtn" className="btn btn-primary">
              개인정보 수정
            </button>
          </form>
        </div>
      </div>
</UpdateStyle>

  );
};

export default Update;
