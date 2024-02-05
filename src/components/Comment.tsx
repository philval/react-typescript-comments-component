import { useState } from "react";
import { IComment, IUser } from "./CommentsInterface";
import ReplyForm from "../components/ReplyForm";
import EditForm from "../components/EditForm";

// NOTE comments JSX is recursive

interface CommentProps {
  currentUser: IUser;
  comment: IComment;
  addNewReply: (comment: string, commentID: number) => void;
  deleteComment: (commentID: number) => void;
  editComment: (commentID: number, content: string) => void;
}

export default function Comment({
  currentUser,
  comment,
  addNewReply,
  deleteComment,
  editComment
}: CommentProps): JSX.Element {
  // state for toggling reply form
  const [toggleReply, setToggleReply] = useState<boolean>(false);
  const [toggleEdit, setToggleEdit] = useState<boolean>(false);

  const handleToggleReply = () => {
    setToggleReply(!toggleReply);
  };

  const handleToggleEdit = () => {
    setToggleEdit(!toggleEdit);
  };

  // TODO add modal to confirm delete
  function handleDelete() {
    deleteComment(comment.id);
  }

  return (
    <div key={comment.id} className="card-container">
      <div className="card-score">
        <div className="card-score-widget">
          <button className="button-score">+</button>
          <div className="card-score-number">{comment.score}</div>
          <button className="button-score">-</button>
        </div>
      </div>

      <div className="card-user">
        <p>CommentID: {comment.id}</p>
        <img alt="avatar" src={comment.user.image.png}></img>
        <p>User Name: {comment.user.username}</p>
        <p>Created At: {comment.createdAt}</p>
        {comment.replyingTo && <p>Replying to: {comment.replyingTo}</p>}
      </div>

      <div className="card-actions">
        {/* a user can not reply to own comments */}
        {comment.user.username !== currentUser.username && (
          <button
            className="button-action"
            onClick={handleToggleReply}
            data-cy={`toggleReply-${comment.id}`}
            data-testid={`toggleReply-${comment.id}`}
          >
            Reply
          </button>
        )}

        {/* only a user can delete own comments */}
        {comment.user.username === currentUser.username && (
          <button
            className="button-action"
            onClick={handleDelete}
            data-cy={`deleteComment-${comment.id}`}
            data-testid={`deleteComment-${comment.id}`}
          >
            Delete
          </button>
        )}

        {/* only a user can edit own comments */}
        {comment.user.username === currentUser.username && (
          <button
            className="button-action"
            onClick={handleToggleEdit}
            data-cy={`toggleEdit-${comment.id}`}
            data-testid={`toggleEdit-${comment.id}`}
          >
            Edit
          </button>
        )}
      </div>

      {!toggleEdit && (
        <div className="card-comment">
          <p>{comment.content}</p>
        </div>
      )}

      {toggleEdit && (
        <div className="card-comment">
          <EditForm
            handleToggleEdit={handleToggleEdit}
            // TODO is username needed?
            username={comment.user.username}
            commentID={comment.id}
            editComment={editComment}
            content={comment.content}
          />
        </div>
      )}

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
        {comment.replies.length > 0 &&
          comment.replies.map((reply: IComment) => (
            // call </Comment /> recursively...
            <Comment
              key={reply.id}
              currentUser={currentUser}
              comment={reply}
              addNewReply={addNewReply}
              deleteComment={deleteComment}
              editComment={editComment}
            />
          ))}
      </div>
    </div>
  );
}
