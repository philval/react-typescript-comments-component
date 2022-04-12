import { IComment } from "./CommentsInterface";
import ReplyForm from "../components/ReplyForm";
interface Props {
  reply: IComment;
}

export default function CommentReply({ reply }: Props) {
  return (
    <div
      style={{
        backgroundColor: "#cffafe",
        padding: 12,
        marginBottom: 24
      }}
    >
      <p>{reply.score}</p>
      <img src={reply.user.image.png} alt=""></img>
      <p>{reply.user.username}</p>
      <p>{reply.createdAt}</p>
      <p>{reply.content}</p>
      <ReplyForm author={reply.user.username} />
    </div>
  );
}
