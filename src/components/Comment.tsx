import { IComment } from "./CommentsInterface";
import ReplyForm from "../components/ReplyForm";

// NOTE comments JSX is recursive

interface CommentProps {
  comment: IComment;
  addNewReply: (comment: string, commentID: number) => void;
}

export default function Comment({
  comment,
  addNewReply
}: CommentProps): JSX.Element {
  return (
    <div key={comment.id}>
      <div
        style={{
          backgroundColor: "#e2e8f0",
          padding: 12,
          marginBottom: 24
        }}
      >
        <p>CommentID: {comment.id}</p>
        <p>Score: {comment.score}</p>
        <img alt="avatar" src={comment.user.image.png}></img>
        <p>{comment.user.username}</p>
        <p>{comment.createdAt}</p>
        <p>{comment.content}</p>
        <div>
          <ReplyForm
            username={comment.user.username}
            commentID={comment.id}
            addNewReply={addNewReply}
          />
        </div>
      </div>
      <div
        style={{
          marginLeft: 24
        }}
      >
        {comment.replies &&
          comment.replies.map((reply: IComment) => (
            // call </Comment /> recursively...
            <Comment key={reply.id} comment={reply} addNewReply={addNewReply} />
          ))}
      </div>
    </div>
  );
}
