import { useState } from "react";
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
  // state for toggling reply form
  const [toggleReply, setToggleReply] = useState<boolean>(false);

  const handleToggleReply = () => {
    setToggleReply(!toggleReply);
  };

  function handleDelete() {
    deleteComment(comment.id);
  }

  return (
    <div key={comment.id} className="card-container">
      <div className="card-score">
        <div className="card-score-widget">
          <div>+</div>
          <p>{comment.score}</p>
          <div>-</div>
        </div>
      </div>

      <div className="card-user">
        <p>CommentID: {comment.id}</p>
        <img alt="avatar" src={comment.user.image.png}></img>
        <p>User Name: {comment.user.username}</p>
        <p>Created At: {comment.createdAt}</p>
        {comment.replyingTo && <p>Replying to: {comment.replyingTo}</p>}
      </div>

      <div className="card-comment">
        <p>{comment.content}</p>
      </div>

      <div className="card-actions">
        <button
          onClick={handleToggleReply}
          data-cy={`toggleReply-${comment.id}`}
        >
          Reply
        </button>
        {comment.user.username === currentUser.username && (
          <button
            onClick={handleDelete}
            data-cy={`deleteComment-${comment.id}`}
          >
            Delete
          </button>
        )}
      </div>

      <div className="card-reply-form">
        {toggleReply && (
          <ReplyForm
            handleToggleReply={handleToggleReply}
            username={comment.user.username}
            commentID={comment.id}
            addNewReply={addNewReply}
          />
        )}
      </div>

      <div className="card-replies">
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
