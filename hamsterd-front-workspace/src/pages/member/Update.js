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
`;

const Update = () => {
  const navigate = useNavigate();

  const convertToDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    // 로컬 스토리지에서 member 데이터 가져오기
    const memberData = JSON.parse(sessionStorage.getItem("member"));

    // 새로운 FormData 생성
    const formData2 = new FormData();
    
    // 필드 추가
  
    formData2.set("password", e.target.password.value);
    formData2.set("nickname", e.target.nickname.value);

    //방식변경필요!!//
    formData2.set("memberNo", memberData.memberNo);
    formData2.set("id", memberData.id);
    formData2.set("academyName", memberData.academyName);
    formData2.set("address", memberData.address);
    formData2.set("phone", memberData.phone);
    formData2.set("birth", memberData.birth);
    formData2.set("gender", memberData.gender);
    formData2.set("name", memberData.name);

    console.log(formData2.get("password"));
    console.log(formData2.get("nickname"));
   

    
    updateMember(formData2);
    
   
  };

  return (
    <UpdateStyle>
      <div className="mainsection">
        <div className="section" id="section2">
          <form className="update" onSubmit={handleSubmit}>
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
            <button type="submit" id="updatebtn" className="btn btn-primary"  >
              개인정보 수정
            </button>
          </form>
        </div>
      </div>
    </UpdateStyle>
  );
};

export default Update;
