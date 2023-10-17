import { detailBoard } from "../../api/boardFile";
import React, { useEffect, useState } from "react";

const BoardDetail = () => {
  const [boardDetail, setBoardDetail] = useState([]);

  useEffect(() => {
    detailBoard().then((res) => setBoardDetail(res));
  }, []);

  return (
    <div className="head1">
      <div className="head2">
        <form>
          <thead>게시판</thead>
          <tbody>
            {boardDetail.length > 0 ? (
              boardDetail.map((item) => (
                <tr key={item.postNo}>
                  <td>{item.postTitle}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>Loading...</td>
              </tr>
            )}
          </tbody>
          <tfoot></tfoot>
        </form>
      </div>
    </div>
  );
};
export default BoardDetail;
