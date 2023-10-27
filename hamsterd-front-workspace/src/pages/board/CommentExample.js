const CommentExample = () => {
  return (
    <div>
      <div className="commentBox">
        <div className="commentProfile">
          <img src={testImg}></img>
        </div>
        // 아래 코드에서 props로 0을 넘기는 이유는 ! DB에 넣을 떄 부모 코드를
        0으로 넣기 위해서
        <CommentComponent props={0} ref={addCommentHandler} />
      </div>
      <div className="commentBox2">
        <ul className="comment">
          {comments?.map((comment) =>
            comment.noticeCommentCodeSuper > 0 ? null : (
              <li className="userProfile" key={comment.noticeCommentCode}>
                <div>
                  {
                    // 유저 정보
                  }
                  <div>
                    <div className="useruser">
                      <div className="profile">
                        <img src={testImg} alt="작성자 프로필" />
                      </div>
                      <div className="user">
                        <p style={{ fontSize: "18px", fontWeight: "border" }}>
                          {comment?.member?.nickname}
                        </p>
                      </div>
                    </div>
                    {
                      // 댓글 정보
                    }
                    <div className="comment-desc">
                      <div className="commentTextBox">
                        {comment?.noticeCommentDesc}
                      </div>
                      <div>{comment?.noticeCommentDate}</div>
                      <CommentBtnComponent
                        code={comment?.noticeCommentCode}
                        writer={comment?.member.id}
                        updateCommentHandler={updateCommentHandler}
                        deleteCommentHandler={deleteCommentHandler}
                      />
                    </div>
                    {currClickBtn === comment.noticeCommentCode ? (
                      comment?.member.id === user.id ? (
                        <UpdateCommentComponent
                          code={comment?.noticeCommentCode}
                          updateCommentHandler={updateCommentHandler}
                          updateSuccHandler={updateSuccHandler}
                        />
                      ) : null
                    ) : null}
                  </div>
                  <div className="reCommentContent">
                    {
                      // 대댓글 보기, 대댓글 작성 코드
                      // 상태 값으로 저장하고 있는 숫자와 선택한 댓글의 코드가 같은 경우에?
                      selected_Comment == comment.noticeCommentCode ? (
                        <div>
                          {
                            // 댓글 작성 닫기 버튼을 누르게 되면 기존에 저장하고 있는 상태값 숫자를 리셋해 줘야함 set(0)하면 코드 컴파일 도중 실행 되니까.. handler만들어서
                          }
                          <button
                            className="commentView_btn"
                            onClick={selected_Comment_handler}
                          >
                            댓글 보기 닫기
                          </button>
                          {/* 대댓글 호출 로직 */}
                          <ul>
                            {comments?.map((comment) =>
                              comment.noticeCommentCodeSuper <
                              0 ? null : comment.noticeCommentCodeSuper !==
                                selected_Comment ? null : (
                                <li
                                  key={comment.noticeCommentCode}
                                  className="comment-desc"
                                >
                                  <ReCommentComponent props={comment} />
                                  <CommentBtnComponent
                                    code={comment?.noticeCommentCode}
                                    writer={comment?.member.id}
                                    updateCommentHandler={updateCommentHandler}
                                    deleteCommentHandler={deleteCommentHandler}
                                  />
                                  {currClickBtn == comment.noticeCommentCode ? (
                                    comment?.member.id === user.id ? (
                                      <UpdateCommentComponent
                                        code={comment?.noticeCommentCode}
                                        updateCommentHandler={
                                          updateCommentHandler
                                        }
                                        updateSuccHandler={updateSuccHandler}
                                      />
                                    ) : null
                                  ) : null}
                                </li>
                              )
                            )}
                          </ul>
                          <CommentComponent
                            // props={{ num1: currClickComment, num2: 10, num3: 100 }}    //<- 여러개 던질때
                            props={selected_Comment}
                            ref={addCommentHandler}
                          />
                        </div>
                      ) : (
                        <div>
                          {
                            //id에 상위 댓글의 코드 값을 넣어서 버튼 id부여함.
                            // 부여한 이유는... 댓글 작성의 경우에 CommentComponent를 호출해서 재사용 하기 위함
                          }
                          <button
                            className="commentView_btn"
                            id={`${comment.noticeCommentCode}`}
                            onClick={(e) => {
                              setSelected_Comment(comment.noticeCommentCode);
                            }}
                          >
                            댓글 보기
                          </button>
                        </div>
                      )
                    }
                  </div>
                </div>
                <hr
                  style={{
                    width: "100%",
                    border: "0px",
                    borderTop: "1px solid #7BCFE1",
                  }}
                />
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};
