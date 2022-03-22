// import { useState } from "react";
import { IComment } from "./CommentsInterface";
import ReplyForm from "../components/ReplyForm";

// TODO how to type props

export default function Comment({ comment }: any) {
  return (
    <>
      {comment.comments.map((comment: IComment) => (
        <>
          <div key={comment.id}>
            <div
              style={{
                backgroundColor: "#B0C4DE",
                padding: 12,
                marginBottom: 24
              }}
            >
              <p>{comment.score}</p>
              <img src={comment.user.image.png} alt=""></img>
              <p>{comment.user.username}</p>
              <p>{comment.createdAt}</p>
              <p>{comment.content}</p>
              <div>
                <ReplyForm />
              </div>
            </div>
            <div
              style={{
                marginLeft: 24
              }}
            >
              {comment.replies &&
                comment.replies.map((reply) => (
                  <div
                    key={reply.id}
                    style={{
                      backgroundColor: "#CCCCFF",
                      padding: 12,
                      marginBottom: 24
                    }}
                  >
                    <p>{reply.score}</p>
                    <img src={reply.user.image.png} alt=""></img>
                    <p>{reply.user.username}</p>
                    <p>{reply.createdAt}</p>
                    <p>{reply.content}</p>
                    <div>
                      <ReplyForm />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      ))}
    </>
  );
}
