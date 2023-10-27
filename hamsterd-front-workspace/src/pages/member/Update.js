import styled from "styled-components";
import { putMember } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateMember } from "../../api/member";

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
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    return state.user;
  });

  const update = (e) => {
    e.preventDefault();

    console.log(file);
   
    
    

    // 새로운 FormData 생성
    const formData2 = new FormData();
    
    // 필드 추가
  
    formData2.set("password",user.password);
    formData2.set("nickname", user.nickname);
    formData2.set("profile", file);


    // 식별자 넣기(id)
    formData2.set("id", user.id);
    

    // console.log(formData2.get("password"));
    // console.log(formData2.get("nickname"));
   

    // if (putMember(formData2)) {
    //   const result = putMember(formData2);
    //   console.log(result);

    //   // localStorage.setItem("user", )
    // }

    dispatch(putMember(formData2));

    navigate("/");
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
    console.log(e.target.files[0]);
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
          <form className="update" onSubmit={update}>
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
                  src={`/upload/${user.profile.split("\\").pop()}`}
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
//