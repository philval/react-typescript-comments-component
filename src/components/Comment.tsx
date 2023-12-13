import { IComment } from "./CommentsInterface";
import ReplyForm from "../components/ReplyForm";
import CommentReply from "../components/CommentReply";

interface CommentProps {
  comment: IComment;
  addNewReply:  (comment: string, commentID: number) => void
}

export default function Comment({ comment, addNewReply }: CommentProps): JSX.Element {
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
        <img alt="avatar" src={comment.user.image.png}></img>
        <p>{comment.user.username}</p>
        <p>{comment.createdAt}</p>
        <p>{comment.content}</p>
        <div>
          <ReplyForm username={comment.user.username} commentID={comment.id} addNewReply={addNewReply}/>
        </div>
      </div>
      <div
        style={{
          marginLeft: 24
        }}
      >
        {comment.replies &&
          comment.replies.map((reply: IComment) => (
            <CommentReply key={reply.id} reply={reply} addNewReply={addNewReply}/>
          ))}
      </div>
    </div>
  );
}
