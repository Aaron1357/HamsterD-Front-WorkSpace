import React from "react";

//상세보기에 해당하는 데이터를 출력할 컴포넌트
const Board2 = ({ title, desc }) => {
  return (
    <div>
      <h2>{title}</h2>
      <hr />
      <p>{desc}</p>
    </div>
  );
};

export default Board2;
