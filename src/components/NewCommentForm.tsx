import React, { useState } from "react";
import { IUser } from "./CommentsInterface";

interface NewCommentFormProps {
  currentUser: IUser;
  addNewComment: (comment: string) => void;
}

export default function NewCommentForm({
  currentUser,
  addNewComment
}: NewCommentFormProps): JSX.Element {
  const [newComment, setNewComment] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newComment.length === 0) {
      setError("Please add a comment, minimum 8 characters.");
    } else if (newComment.length < 8) {
      setError("Comments must be at least 8 characters.");
    } else if (newComment.length > 256) {
      setError("Comments are maximum 256 characters.");
    } else {
      addNewComment(newComment);
      setNewComment("");
      setError("");
    }
  };

  return (
    <>
      <div className="new-comment-container">
        <img
          className="card-user-img-user"
          src={currentUser.image?.png}
          alt="avatar"
        ></img>
        <form className="new-comment-form" onSubmit={handleSubmit}>
          <textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={handleChange}
            data-cy="inputNewComment"
            rows={4}
          />
          <button
            className="button-form"
            type="submit"
            data-cy="submitNewComment"
            data-testid="submitNewComment"
          >
            Send
          </button>
          {error && (
            <div data-testid="formError" className="form-error">
              {error}
            </div>
          )}
        </form>
      </div>
    </>
  );
}
