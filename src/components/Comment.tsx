import { IComment, IUser } from "./CommentsInterface";
import ReplyForm from "../components/ReplyForm";

// NOTE comments JSX is recursive

interface CommentProps {
  currentUser: IUser;
  comment: IComment;
  addNewReply: (comment: string, commentID: number) => void;
  deleteComment: (commentID: number) => void;
}

export default function Comment({
  currentUser,
  comment,
  addNewReply,
  deleteComment
}: CommentProps): JSX.Element {
  function handleDelete() {
    deleteComment(comment.id);
  }

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
        <p>User Name: {comment.user.username}</p>
        <p>Created At: {comment.createdAt}</p>
        <p>{comment.replyingTo && <p>Replying to: {comment.replyingTo}</p>}</p>
        <p>{comment.content}</p>
        {comment.user.username === currentUser.username && (
          <button
            onClick={handleDelete}
            data-cy={`deleteComment-${comment.id}`}
          >
            Delete
          </button>
        )}
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
            <Comment
              key={reply.id}
              currentUser={currentUser}
              comment={reply}
              addNewReply={addNewReply}
              deleteComment={deleteComment}
            />
          ))}
      </div>
    </div>
  );
}
