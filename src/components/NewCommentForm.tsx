import React, { useState } from "react";

interface NewCommentFormProps {
  addNewComment: (comment: string) => void;
}

export default function NewCommentForm({
  addNewComment
}: NewCommentFormProps): JSX.Element {
  const [newComment, setNewComment] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNewComment(newComment);
    setNewComment("");
  };

  return (
    <>
      <div className="new-comment-container">
        <img src="images/avatars/image-juliusomo.png" alt="avatar"></img>
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
        </form>
      </div>
      {/* </div> */}
    </>
  );
}
