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
    <div
      style={{
        backgroundColor: "#cffafe",
        padding: 12,
        marginBottom: 24
      }}
    >
      <p>replyID: {reply.id}</p>
      <p>Score: {reply.score}</p>
      <img src={reply.user.image.png} alt=""></img>
      <p>{reply.user.username}</p>
      <p>{reply.createdAt}</p>
      <p>{reply.content}</p>
      <ReplyForm
        username={reply.user.username}
        commentID={reply.id}
        addNewReply={addNewReply}
      />
    </div>
  );
}
