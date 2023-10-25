import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getGroupReviewList } from "../../api/studygroup";

const ReviewPage = (props) => {
  const [review, setReview] = useState([]);
  const [groupNo, setGroupNo] = useState(props.groupNo);

  // 그룹별 댓글 목록 받아와서 뿌리기
  const reviewOfGroup = async () => {
    const result = await getGroupReviewList(groupNo);
    setReview(result.data);
  };

  useEffect(() => {
    reviewOfGroup();
  }, [groupNo]);

  console.log(review);
  return (
    <>
      {/* <div className="inputgComment">
        {review.map((item, index) => (
          <div key={item.gcommentNo} id={item.gcommentNo} className="comment">
            <tr>
              <td>{index + 1}</td>
              <td>{item.commentContent}</td>
              <td>{item.member.nickname}</td>
            </tr>
          </div>
        ))}
      </div> */}
    </>
  );
};

export default ReviewPage;
