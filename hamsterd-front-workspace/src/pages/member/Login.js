import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LoginStyle = styled.div`
  .mainsection {
    border: 1px solid var(--grey-blue-95, #edeff2);
    border-radius: 20px;
    width: 1600px;
    margin-top: 30px;
  }
  .section {
    //
    box-shadow: var(
      --shadows-gray-blue-3-5-b-box-shadow,
      0px 2px 5px 0px rgba(38, 51, 77, 0.03)
    );
    margin-top: 80px;
    margin-left: 200px;
    width: 500px;
    height: 620px;
  }
  #loginbtn {
    width: 100%;
  }
  #signUpbtn {
    margin-top: 10px;
    width: 100%;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const handleSignUpClick = () => {
    // 회원가입 버튼 클릭 시 '/signup' 경로로 이동
    navigate("/signup");
  };
  return (
    <LoginStyle>
      <div className="mainsection">
        <div className="section" id="section2">
          <form className="Login">
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
                  required
                />
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
              />
              <span id="passwordHelpInline" className="form-text">
                8-20자의 비밀번호를 입력하세요.
              </span>
            </div>

            <button type="button" id="loginbtn" className="btn btn-primary">
              로그인
            </button>

            <button
              type="button"
              id="signUpbtn"
              className="btn btn-danger"
              onClick={handleSignUpClick}
            >
              회원가입
            </button>
          </form>
        </div>
      </div>
    </LoginStyle>
  );
};

export default Login;
