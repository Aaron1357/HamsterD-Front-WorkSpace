import styled, { keyframes } from "styled-components";
import React from "react";

const blink = keyframes`
  0% {
    background-color: red;
    color: white;
  }
  50% {
    background-color: blue;
    color: red;
  }
  100% {
    background-color: yellow;
    color: white;
  }
`;

const FireTest = styled.div`
  .maincon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid rgba(211, 157, 87);
    border-radius: 20px;
    width: 1600px;
    height: 100vh;
    margin-top: 30px;
    color: rgba(211, 157, 87);
  }

  #fireBtn {
    width: 500px;
    height: 200px;
    font-size: 100px;
    animation: ${blink} 0.1s linear infinite alternate; /* Apply the blink animation here */
  }
`;

const Fire = () => {
  return (
    <FireTest>
      <div className="maincon">
        <div className="fireBtn">
          <button type="button" id="fireBtn" className="btn btn-danger">
            탈퇴
          </button>
        </div>
      </div>
    </FireTest>
  );
};

export default Fire;
