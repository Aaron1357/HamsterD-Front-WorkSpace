import React from "react";
import { Link } from "react-router-dom";

function JoinGroupModal() {
  return (
    <div className="modalWrapper">
      <div className="modalContainer">
        <div>
          <p className="text">
            선택하신 상품이
            <br /> 장바구니에 추가 되었습니다.
          </p>
          <div className="btnWrapper">
            <Link to="/list-page">
              <button className="modalBtn shoppingBtn">쇼핑 계속하기</button>
            </Link>
            <Link to="/list-page">
              <button className="modalBtn cartBtn">장바구니로 이동</button>
            </Link>
          </div>
        </div>
      </div>
      <span className="background" />
    </div>
  );
}

export default JoinGroupModal;
