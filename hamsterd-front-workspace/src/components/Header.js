import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import logo from "../resource/logo.jpg";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import ModalSub from "../components/ModalSub";

import { userLogout } from "../store/userSlice";
import { useDispatch } from "react-redux";

const Test = styled.div`
  .header-section {
    display: flex;
    width: 100%;
    height: 120px;
  }
  ////
  .header {
    display: flex;
    align-items: center;
    margin-top: 70px;
    width: 100vw;
    min-width: 1100px;
    max-width: 1500px;
    flex-direction: row;
    justify-content: space-around;
    font-weight: bold;
    margin-right: 100px;
    font: 700 20px/25px "Roboto", sans-serif;
  }

  #logo {
    width: 400px;
    min-width: 370px;
    margin-left: 100px;
    display: flex;
    justify-content: center;
    height: 350px;
  }

  #logo img {
    width: 600px;

    margin-left: -90px;
    border-radius: 40px;
  }

  .menu a {
    text-decoration: none;
    color: rgba(211, 157, 87);
    font-family: fantasy;
  }

  .menu {
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .submenu {
    font-size: 1rem;
    visibility: hidden;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    height: 150px;
    margin-top: 20px;
    z-index: 2;
  }

  .header:hover .submenu {
    visibility: inherit;
    justify-content: space-around;
  }

  .logout {
    margin-top: -150px;
    margin-left: 200px;
  }

  /* 사이드바 CSS */
`;

const Sub = styled.div``;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const home = () => {
    // 로고 클릭시 메인페이지 이동
    navigate("/");
  };

  const logout = () => {
    console.log("logout!");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(userLogout());
    window.location.reload(true);
  };

  return (
    <Test>
      <Sub>
        <div>
          <ModalSub />
        </div>
      </Sub>

      <div className="header-section">
        <div id="logo">
          <img className="logoimg" src={logo} alt="Logo" onClick={home} />
        </div>
        <div className="realheader">
          <div className="header">
            <div className="menu" id="mypage">
              <div className="submenu1">
                <Link to="/mypage">마이 페이지</Link>
              </div>
              <div className="submenu">
                <a href="#">마이페이지</a>
                <Link to="/changeinfo">개인정보수정</Link>
                <a href="#">탈퇴</a>
              </div>
            </div>
            <div className="menu" id="board">
              <div className="submenu1">
                <Link to="/boardList">게시판</Link>
              </div>
              <div className="submenu">
                <a href="#">랭킹</a>
                <a href="#">스터디그룹 조회</a>
                <a href="creategroup">스터디 만들기</a>
              </div>
            </div>
            <div className="menu" id="studygroup">
              <div className="submenu1">
                <Link to="/studygroup">스터디그룹</Link>
              </div>
              <div className="submenu">
                <Link to="/groupreview">그룹평가</Link>
                <Link to="/schedule">스케쥴</Link>
              </div>
            </div>
            <div className="menu" id="social">
              <div className="submenu1">
                <Link to="/social">소셜</Link>
              </div>
              <div className="submenu">
                <a href="#">서브메뉴 1</a>
                <a href="#">서브메뉴 2</a>
                <a href="#">서브메뉴 3</a>
              </div>
            </div>

            <div className="menu" id="logout">
              <div className="logout">
                <button
                  type="button"
                  id="signUpbtn"
                  className="btn btn-danger"
                  onClick={logout}
                >
                  로그아웃
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Test>
  );
};

export default Header;
