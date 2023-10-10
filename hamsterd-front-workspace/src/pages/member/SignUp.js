import styled from "styled-components";
import { addMember } from "../../api/signup";

const SignUpStyle = styled.div`
  .mainsection {
    border: 1px solid  rgba(211,157,87);;
    border-radius: 20px;
    width: 1600px;
    margin-top: 30px;
    color: rgba(211,157,87);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    formData.set("birth", convertToDate(formData.get("birth")));
    addMember(formData);
  };

  return (
    <SignUpStyle>
      <div className="mainsection">
        <div className="section" id="section2">
          <form className="signup" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="inputPassword6" className="form-label">
                아이디
              </label>
              <div className="input-group">
                <input
                  type="text"
                  id="inputPassword6"
                  className="form-control"
                  aria-describedby="passwordHelpInline"
                  name="id"
                  required
                />
                <button
                  type="button"
                  id="signupbtn"
                  className="btn btn-primary"
                >
                  중복확인
                </button>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="inputPassword6" className="form-label">
                닉네임
              </label>
              <div className="input-group">
                <input
                  type="text"
                  id="inputPassword6"
                  className="form-control"
                  aria-describedby="passwordHelpInline"
                  name="nickname"
                  required
                />
                <button
                  type="button"
                  id="signupbtn"
                  className="btn btn-primary"
                >
                  중복확인
                </button>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="inputPassword6" className="form-label">
                비밀번호
              </label>
              <input
                type="password"
                id="inputPassword6"
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
              <label htmlFor="inputPassword6" className="form-label">
                이름
              </label>
              <input
                type="text"
                id="inputPassword6"
                className="form-control"
                aria-describedby="passwordHelpInline"
                required
                name="name"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="inputPassword6" className="form-label">
                생일
              </label>
              <input
                className="form-control"
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
              <label htmlFor="inputPassword6" className="form-label">
                전화번호
              </label>
              <input
                type="tel"
                id="inputPassword6"
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
              <label htmlFor="inputPassword6" className="form-label">
                학원 이름
              </label>
              <input
                type="text"
                id="inputPassword6"
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
              <label htmlFor="inputPassword6" className="form-label">
                주소
              </label>
              <input
                type="text"
                id="inputPassword6"
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
