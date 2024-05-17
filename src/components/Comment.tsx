import { useState } from "react";
import { IComment, IUser } from "./CommentsInterface";
import timeAgo from "../utils/timeAgo";
import ReplyForm from "../components/ReplyForm";
import EditForm from "../components/EditForm";
import DeleteModal from "./DeleteModal";

// NOTE comments JSX is recursive

interface CommentProps {
  currentUser: IUser;
  comment: IComment;
  addNewReply: (comment: string, commentID: number) => void;
  deleteComment: (commentID: number) => void;
  editComment: (commentID: number, content: string) => void;
  updateScore(commentID: number, vote: number): void;
}

export default function Comment({
  currentUser,
  comment,
  addNewReply,
  deleteComment,
  editComment,
  updateScore
}: CommentProps): JSX.Element {
  const [toggleReply, setToggleReply] = useState<boolean>(false);
  const [toggleEdit, setToggleEdit] = useState<boolean>(false);
  const [isModalOpen, SetModalOpen] = useState<boolean>(false);

  function isUser() {
    return comment.user.username === currentUser.username;
  }

  const handleToggleReply = () => {
    setToggleReply(!toggleReply);
  };

  const handleToggleEdit = () => {
    setToggleEdit(!toggleEdit);
  };

  function handleDelete() {
    SetModalOpen(true);
  }

  function handleModalDelete() {
    deleteComment(comment.id);
  }

  function handleModalCancel() {
    SetModalOpen(false);
  }

  function handleVote(vote: number): void {
    updateScore(comment.id, vote);
  }

  return (
    <div key={comment.id} className="card-container">
      <div className="card-score">
        <div className="card-score-widget">
          <button
            className="button-score"
            type="button"
            disabled={isUser() ? true : false}
            onClick={() => handleVote(1)}
            data-cy={`upVote-${comment.id}`}
          >
            +
          </button>
          <div data-cy="score" className="card-score-number">
            {comment.score}
          </div>
          <button
            className="button-score"
            type="button"
            disabled={isUser() ? true : false}
            onClick={() => handleVote(-1)}
            data-cy={`downVote-${comment.id}`}
          >
            -
          </button>
        </div>
      </div>

      <div className="card-user">
        {isUser() ? (
          <img
            className="card-user-img-user"
            alt="avatar"
            src={comment.user.image.png}
          ></img>
        ) : (
          <img
            className="card-user-img-other"
            alt="avatar"
            src={comment.user.image.png}
          ></img>
        )}
        <div className="card-user-name">{comment.user.username}</div>
        {isUser() && <div className="card-user-you">you</div>}
        <div>{timeAgo(new Date(), comment.createdAt)}</div>
      </div>

      <div className="card-actions">
        {/* a user can not reply to own comments */}
        {!isUser() && (
          <button
            type="button"
            className="button-action button-action-reply"
            onClick={handleToggleReply}
            data-cy={`toggleReply-${comment.id}`}
            data-testid={`toggleReply-${comment.id}`}
          >
            <svg
              width="14"
              height="13"
              viewBox="0 0 14 13"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0.227189 4.31583L5.0398 0.159982C5.46106 -0.203822 6.125 0.0915222 6.125 0.656646V2.8456C10.5172 2.89589 14 3.77618 14 7.93861C14 9.61864 12.9177 11.283 11.7214 12.1532C11.348 12.4247 10.816 12.0839 10.9536 11.6437C12.1935 7.67857 10.3655 6.62588 6.125 6.56484V8.96878C6.125 9.5348 5.46056 9.82883 5.0398 9.46545L0.227189 5.30918C-0.0755195 5.04772 -0.0759395 4.57766 0.227189 4.31583Z" />
            </svg>
            Reply
          </button>
        )}

        {/* only a user can delete own comments */}
        {isUser() && (
          <>
            <button
              type="button"
              className="button-action button-action-delete"
              onClick={handleDelete}
              data-cy={`deleteComment-${comment.id}`}
              data-testid={`deleteComment-${comment.id}`}
            >
              <svg
                width="12"
                height="14"
                viewBox="0 0 12 14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.75 1.16667H11.6667V2.33333H0V1.16667H2.91667L3.89324 0H7.77346L8.75 1.16667ZM2.72223 14C1.86659 14 1.16667 13.3017 1.16667 12.4479V3.5H10.5V12.4479C10.5 13.3017 9.80007 14 8.94447 14H2.72223Z"
                />
              </svg>
              Delete
            </button>
            <DeleteModal
              isModalOpen={isModalOpen}
              onCancel={handleModalCancel}
              onDelete={handleModalDelete}
            />
          </>
        )}

        {/* only a user can edit own comments */}
        {isUser() && (
          <button
            type="button"
            className="button-action button-action-edit"
            onClick={handleToggleEdit}
            data-cy={`toggleEdit-${comment.id}`}
            data-testid={`toggleEdit-${comment.id}`}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.0813 0.474468L13.4788 2.87199C14.1491 3.51055 14.1765 4.57097 13.5401 5.24327L5.66499 13.1184C5.37977 13.4012 5.00593 13.5773 4.60623 13.6171L0.957442 13.9496H0.878691C0.646111 13.951 0.422565 13.8596 0.257434 13.6959C0.0728398 13.5119 -0.0201832 13.2553 0.00368177 12.9959L0.379936 9.34706C0.419753 8.94736 0.595858 8.57352 0.878691 8.2883L8.75377 0.413217C9.43263 -0.160306 10.4336 -0.133966 11.0813 0.474468ZM8.15877 3.4495L10.5038 5.79452L12.2538 4.08826L9.86504 1.69948L8.15877 3.4495Z"
              />
            </svg>
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
            commentID={comment.id}
            editComment={editComment}
            content={comment.content}
          />
        </div>
      )}

      {toggleReply && (
        <div className="card-reply-form">
          <ReplyForm
            currentUser={currentUser}
            handleToggleReply={handleToggleReply}
            username={comment.user.username}
            commentID={comment.id}
            addNewReply={addNewReply}
          />
        </div>
      )}

      {comment.replies.length > 0 && (
        <div className="card-replies">
          {comment.replies.map((reply: IComment) => (
            // render </Comment /> recursively...
            <Comment
              key={reply.id}
              currentUser={currentUser}
              comment={reply}
              addNewReply={addNewReply}
              deleteComment={deleteComment}
              editComment={editComment}
              updateScore={updateScore}
            />
          ))}
        </div>
      )}
    </div>
  );
}
