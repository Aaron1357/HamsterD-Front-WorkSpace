import styled from "styled-components";
import { addMember, findId, findNickname } from "../../api/member";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { regExpId, regExpPw, ConfirmPw } from "./regExp";

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
  const [validId, setValidId] = useState(false); // id 정규식
  const [validPw, setValidPw] = useState(false); // password 정규식
  const [validConPw, setValidConPw] = useState(false); // password 정규식

  const [idDupli, setIdDupli] = useState(false); // 아이디 중복확인
  const [nickDupli, setNickDupli] = useState(false); // 닉네임 중복확인

  const [id, setId] = useState([]);
  const [nickname, setNickname] = useState([]);
  const [password, setPw] = useState([]);
  const [confirmPw, setConfirmPw] = useState([]);
  const [name, setName] = useState([]);
  const [birth, setBirth] = useState([]);
  const [gender, setGender] = useState([]);
  const [phone, setPhone] = useState([]);
  const [academy, setAcademy] = useState([]);
  const [address, setAddr] = useState([]);

  const navigate = useNavigate();

  const signup = (e) => {
    e.preventDefault();

    if (idDupli && nickDupli) {
      // 중복확인이 완료 됬을때
      const formData2 = {
        id: id,
        nickname: nickname,
        password: password,
        name: name,
        birth: birth,
        gender: gender,
        phone: phone,
        academy: academy,
        address: address,
      };

      console.log(formData2);

      // console.log(formData2.id);

      // addMember(formData2);
      // navigate("/");
    } else {
      // 중복확인이 되지 않았을때
      alert("중복확인을 먼저 해주세요!!");
    }
  };

  const FindId = async (e) => {
    const element = e.target;

    const idInput = element.previousSibling; // 해당 태그의 형제요소 선택(아이디 input 태그)

    const result = await findId(idInput.value);

    console.log(result);

    if (result) {
      alert("중복된 아이디입니다!!!");
    } else if (!result) {
      alert("사용 가능!!");
      setIdDupli(true);
    }
  };

  const FindNickname = async (e) => {
    const element = e.target;

    const nameInput = element.previousSibling; // 해당 태그의 형제요소 선택(닉네임 input 태그)

    const result = await findNickname(nameInput.value);

    console.log(result);

    if (result) {
      alert("중복된 닉네임입니다!!!");
    } else if (!result) {
      alert("사용 가능!!");
      setNickDupli(true);
    }
  };

  const RegExpId = () => {
    // 아이디 유효성 검사!!
    console.log(regExpId(id));
    setValidId(regExpId(id));
  };

  const RegExpPw = () => {
    // 비밀번호 유효성 검사!!
    console.log(regExpPw(password));
    setValidPw(regExpPw(password));
  };

  const RegExpConfirmPw = () => {
    // 비밀번호 확인 유효성 검사!!
    console.log(ConfirmPw(password, confirmPw));
    setValidConPw(ConfirmPw(password, confirmPw));
  };

  return (
    <SignUpStyle>
      <div className="mainsection">
        <div className="section" id="section2">
          <form className="signup" onSubmit={signup}>
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
                  onChange={(e) => {
                    setId(e.target.value);
                    setIdDupli(false);
                  }}
                  onBlur={RegExpId}
                  required
                />
                <button
                  type="button"
                  id="signupbtn"
                  className="btn btn-primary"
                  style={{ zIndex: "0" }}
                  onClick={FindId}
                >
                  중복확인
                </button>
              </div>
              {validId ? (
                <span style={{ color: "green" }}>사용가능!</span>
              ) : (
                <span style={{ color: "red" }}>
                  3~16자리의 숫자와 영어로 입력해주세요.
                </span>
              )}
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
                  onChange={(e) => {
                    setNickname(e.target.value);
                    setNickDupli(false);
                  }}
                  required
                />
                <button
                  type="button"
                  id="signupbtn"
                  className="btn btn-primary"
                  style={{ zIndex: "0" }}
                  onClick={FindNickname}
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
                onBlur={RegExpPw}
                onChange={(e) => {
                  setPw(e.target.value);
                }}
                required
              />
              {validPw ? (
                <span style={{ color: "green" }}>사용가능!</span>
              ) : (
                <span style={{ color: "red" }}>
                  영문 대소문자, 특수문자, 숫자를 최소 1개 이상 혼합한 8글자에서
                  20글자 사이의 비밀번호를 입력해주세요. (단, 첫번째 글자는
                  특수문자가 올수 없습니다.)
                </span>
              )}
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
                onChange={(e) => {
                  setConfirmPw(e.target.value);
                }}
                onBlur={RegExpConfirmPw}
                required
              />
              {validConPw ? (
                <span style={{ color: "green" }}>일치!</span>
              ) : (
                <span style={{ color: "red" }}>불일치!</span>
              )}
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
                onChange={(e) => {
                  setName(e.target.value);
                }}
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
                onChange={(e) => {
                  setBirth(e.target.value);
                }}
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
                  value="man"
                  id="flexRadioDefault1"
                  checked={gender === "man"}
                  readOnly
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
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
                  checked={gender === "woman"}
                  readOnly
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
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
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
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
                onChange={(e) => {
                  setAcademy(e.target.value);
                }}
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
                onChange={(e) => {
                  setAddr(e.target.value);
                }}
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
