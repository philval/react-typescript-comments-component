import { IComment } from "./CommentsInterface";
import ReplyForm from "../components/ReplyForm";
interface CommentReplyProps {
  reply: IComment;
  addNewReply: (comment: string, commentID: number) => void;
}

export default function CommentReply({
  reply,
  addNewReply
}: CommentReplyProps): JSX.Element {
  return (
    <div className="card-container">
      <div className="card-score">
        <div className="card-score-widget">
          <div>+</div>
          <p>{reply.score}</p>
          <div>-</div>
        </div>
      </div>
      <div className="card-user">
        <p>replyID: {reply.id}</p>
        <img src={reply.user.image.png} alt=""></img>
        <p>{reply.user.username}</p>
        <p>{reply.createdAt}</p>
      </div>
      <div className="card-comment">
        <p>{reply.content}</p>
      </div>
      <div className="card-actions">
        <ReplyForm
          username={reply.user.username}
          commentID={reply.id}
          addNewReply={addNewReply}
        />
      </div>
    </div>
  );
}
