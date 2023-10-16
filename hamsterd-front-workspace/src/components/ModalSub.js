import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { login } from "../api/login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { asyncLogin } from "../store/userSlice";

const customStyles = {
  overlay: {
    backgroundColor: "rgb(0, 0, 0, 0.6)", // 모달이 열릴 때 뒷 배경의 색상과 투명도
  },
  content: {
    top: "50%", // 모달을 수직 가운데로 위치
    left: "50%", // 모달을 수평 가운데로 위치
    transform: "translate(-50%, -50%)", // 모달을 수직, 수평으로 가운데 정렬
    backgroundColor: "rgb(255, 255, 255, 1)", // 모달의 배경 색상
    borderRadius: "10%",
    width: "500px",
    height: "500px",
  },
}; //

const StyleTest = styled.div`
  .mainModal {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 400px;
    font-family: "EliceDx";
  }
  .set {
    width: 200px;
    height: 32px;
    font-size: 15px;
    border: 0;
    border-radius: 15px;
    outline: none;
    background-color: rgb(233, 233, 233);
  }

  @font-face {
    font-family: "EliceDx";
    font-weight: 100;
    src: url("../src/font/EliceDXNeolli-Bold.ttf") format("truetype");
  }

  .set {
    width: 200px;
    height: 32px;
    font-size: 15px;
    border: 0;
    border-radius: 15px;
    outline: none;
    background-color: rgb(233, 233, 233);
  }

  @font-face {
    font-family: "EliceDx";
    font-weight: 100;
    src: url("../src/font/EliceDXNeolli-Bold.ttf") format("truetype");
  }

  #loginbtn {
    margin-left: 60px;
  }

  #signUpbtn {
    margin-left: 50px;
  }

  .setControll {
  }

  .closebtn {
    position: relative;
    margin-left: 400px;
    margin-top: -40px;
  }
`;

function ModalSub() {
  // 세션 존재여부 검사
  const session = () => {
    // return window.sessionStorage.getItem("user");
    return window.localStorage.getItem("user");
  };
  console.log(session());

  const [isOpen, setIsOpen] = useState(true); // Modal 표시여부
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const closeTab = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    if (session() != null) {
      // 세션이 있다면 modal 닫기
      closeTab();
    }
  }, [localStorage]);

  const handleSignUpClick = () => {
    // 회원가입 버튼 클릭 시 '/signup' 경로로 이동
    navigate("/signup");
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    // 로그인 버튼 클릭시 로그인
    e.preventDefault();
    const id = e.target.elements.id.value; //아이디
    const password = e.target.elements.password.value; //비번
    // const idValue = e.target.elements.id.value; //아이디
    // const passwordValue = e.target.elements.password.value; //비번
    // const formData2 = {
    //   id: idValue,
    //   password: passwordValue,
    // };
    // console.log(formData2);
    // const result = login(formData2);

    // 로그인 시도
    dispatch(asyncLogin({ id, password }));
    navigate("/");
    // window.location.reload(true); // 새로고침

    // console.log(result);

    // if (result != null) {
    //   result.then(function (data) {
    //     console.log(data);
    //     console.log(data.token);
    //     window.sessionStorage.setItem("member", JSON.stringify(data));
    //     setIsOpen(false);
    //   });
    // }
  };

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      contentLabel="modal"
      ariaHideApp={false}
    >
      <StyleTest>
        <div className="mainModal">
          <br></br>
          <h3>HamsterD</h3>
          <div className="closebtn">
            <button
              onClick={closeTab}
              type="button"
              className="btn-close"
              aria-label="Close"
            ></button>
          </div>
          <br></br>
          <form className="innerModal" onSubmit={handleSubmit}>
            <div className="setControll">
              <input
                className="set"
                type="text"
                placeholder="  아이디를 입력하세요.."
                name="id"
              ></input>
              <br></br> <br></br>
              <input
                className="set"
                type="text"
                placeholder="  비밀번호를 입력하세요.."
                name="password"
              ></input>
              <br></br>
              <br></br>
              <button type="submit" id="loginbtn" className="btn btn-primary">
                로그인
              </button>
              <br></br> <br></br>
              <br></br>
              <br></br>
              <h4>아직 비회원이세요?</h4>
              <br></br>
              <button
                type="button"
                id="signUpbtn"
                className="btn btn-danger"
                onClick={handleSignUpClick}
              >
                회원가입
              </button>
            </div>
          </form>
        </div>
      </StyleTest>
    </Modal>
  );
}

export default ModalSub;
