import styled from "styled-components";
import { addMember } from "../../api/login";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignUpStyle = styled.div`
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
`;

const SignUp = () => {
  // const [id, setId] = useState([]);
  // const [nickname, setNickname] = useState([]);
  // const [password, setPw] = useState([]);
  // const [name, setName] = useState([]);
  // const [birth, setBirth] = useState([]);
  // const [gender, setGender] = useState([]);
  // const [phone, setPhone] = useState([]);
  // const [academy, setAcademy] = useState([]);
  // const [address, setAddr] = useState([]);

  const navigate = useNavigate();

  const convertToDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더하고 2자리로 포맷
    const day = String(date.getDate()).padStart(2, "0"); // 일도 2자리로 포맷

    return `${year}-${month}-${day}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData2 = {
      id: e.target.id.value,
      nickname: e.target.nickname.value,
      password: e.target.password.value,
      name: e.target.name.value,
      birth: e.target.birth.value,
      gender: e.target.gender.value,
      phone: e.target.phone.value,
      academy: e.target.academy.value,
      address: e.target.address.value,
    };

    console.log(formData2);

    // const formData = new FormData();
    // formData.append("id", e.target.elements.id.value);
    // formData.append("nickname", e.target.elements.nickname.value);
    // formData.append("password", e.target.elements.password.value);
    // formData.append("name", e.target.elements.name.value);
    // formData.append("birth", convertToDate(e.target.elements.birth.value));
    // formData.append("gender", e.target.elements.gender.value);
    // formData.append("phone", e.target.elements.phone.value);
    // formData.append("academy", e.target.elements.academy.value);
    // formData.append("address", e.target.elements.address.value);
    // console.log(formData.get("birth"));

    // formData.set("birth", convertToDate(formData.get("birth")));
    addMember(formData2).then((response) => {
      console.log(response);
    });
    navigate("/");
  };

  return (
    <SignUpStyle>
      <div className="mainsection">
        <div className="section" id="section2">
          <form className="signup" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="id" className="form-label">
                아이디
              </label>
              <div className="input-group">
                <input
                  type="text"
                  id="id"
                  className="form-control"
                  aria-describedby="passwordHelpInline"
                  name="id"
                  // onChange={(e) => {
                  //   setId(e.target.value);
                  // }}
                  required
                />
                <button
                  type="button"
                  id="signupbtn"
                  className="btn btn-primary"
                  style={{ zIndex: "0" }}
                >
                  중복확인
                </button>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="nickName" className="form-label">
                닉네임
              </label>
              <div className="input-group">
                <input
                  type="text"
                  id="nickName"
                  className="form-control"
                  aria-describedby="passwordHelpInline"
                  name="nickname"
                  // onChange={(e) => {
                  //   setNickname(e.target.value);
                  // }}
                  required
                />
                <button
                  type="button"
                  id="signupbtn"
                  className="btn btn-primary"
                  style={{ zIndex: "0" }}
                >
                  중복확인
                </button>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="inputPassword" className="form-label">
                비밀번호
              </label>
              <input
                type="password"
                id="inputPassword"
                className="form-control"
                aria-describedby="passwordHelpInline"
                name="password"
                // onChange={(e) => {
                //   setPw(e.target.value);
                // }}
                required
              />
              <span id="passwordHelpInline" className="form-text">
                8-20자의 비밀번호를 입력하세요.
              </span>
            </div>

            <div className="mb-3">
              <label htmlFor="inputPassword6" className="form-label">
                비밀번호 확인
              </label>
              <input
                type="password"
                id="inputPassword6"
                className="form-control"
                aria-describedby="passwordHelpInline"
                required
              />
              <span id="passwordHelpInline" className="form-text">
                8-20자의 비밀번호를 입력하세요.
              </span>
            </div>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                이름
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                aria-describedby="passwordHelpInline"
                // onChange={(e) => {
                //   setName(e.target.value);
                // }}
                required
                name="name"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="birth" className="form-label">
                생일
              </label>
              <input
                className="form-control"
                id="birth"
                type="date"
                placeholder="생일"
                // onChange={(e) => {
                //   setBirth(e.target.value);
                // }}
                required
                name="birth"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">성별</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="flexRadioDefault1"
                  value="man"
                  readOnly
                  // if (checked) {
                  //   onChange={(e) => {
                  //     setGender(e.target.value);
                  //   }}
                  // }
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  남자
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="woman"
                  id="flexRadioDefault2"
                  checked
                  readOnly
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  여자
                </label>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                전화번호
              </label>
              <input
                type="tel"
                id="phone"
                className="form-control"
                aria-describedby="passwordHelpInline"
                required
                name="phone"
              />
              <span id="passwordHelpInline" className="form-text">
                -없이 번호만 입력해 주세요
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
                aria-describedby="passwordHelpInline"
                required
                name="academyName"
              />
              <span id="passwordHelpInline" className="form-text">
                현재 다니고 계신 학원 명을 입력해 주세요
              </span>
            </div>

            <div className="mb-3">
              <label htmlFor="addr" className="form-label">
                주소
              </label>
              <input
                type="text"
                id="addr"
                className="form-control"
                aria-describedby="passwordHelpInline"
                required
                name="address"
              />
              <span id="passwordHelpInline" className="form-text">
                상세주소를 입력해 주세요
              </span>
            </div>

            <button type="submit" id="signupbtn" className="btn btn-primary">
              회원가입
            </button>
          </form>
        </div>
      </div>
    </SignUpStyle>
  );
};

export default SignUp;
