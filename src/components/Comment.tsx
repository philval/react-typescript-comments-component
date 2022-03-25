import { IComment } from "./CommentsInterface";
import ReplyForm from "../components/ReplyForm";
import CommentReply from "../components/CommentReply";

// TODO type props
export default function Comment({ comment }: any) {
  return (
    <div key={comment.id}>
      <div
        style={{
          backgroundColor: "#e2e8f0",
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
          comment.replies.map((reply: IComment) => (
            <CommentReply key={reply.id} reply={reply} />
          ))}
      </div>
    </div>
  );
}
