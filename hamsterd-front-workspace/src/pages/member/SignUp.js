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
  const convertToDate = (dateString) => {
    const date = new Date(dateString);
    return date;
  };

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
      academyName: e.target.academyName.value,
      address: e.target.address.value,
    };
//
    console.log(formData2.id);

    addMember(formData2);
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
                required
                name="password"
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
                id="academyName"
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
