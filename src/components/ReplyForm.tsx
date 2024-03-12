import { useState } from "react";
interface ReplyFormProps {
  username: string;
  commentID: number;
  handleToggleReply: () => void;
  addNewReply: (comment: string, commentID: number) => void;
}

export default function ReplyForm({
  username,
  commentID,
  handleToggleReply,
  addNewReply
}: ReplyFormProps): JSX.Element {
  const [reply, setReply] = useState<string>(`@${username}, `);
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReply(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (reply.length === 0) {
      setError("Please add a reply, minimum 8 characters.");
    } else if (reply.length < 8) {
      setError("Replies must be at least 8 characters.");
    } else if (reply.length > 256) {
      setError("Replies are maximum 256 characters.");
    } else {
      addNewReply(reply, commentID);
      setReply(`@${username}, `);
      handleToggleReply();
      setError("");
    }
  };

  return (
    <>
      <div className="new-reply-container">
        <img
          className="card-user-img-user"
          alt="avatar"
          src="images/avatars/image-juliusomo.png"
        />
        <form className="new-reply-form" onSubmit={handleSubmit}>
          <textarea
            placeholder="Add a comment..."
            value={reply}
            onChange={handleChange}
            data-cy={`inputReply-${commentID}`}
            rows={4}
          />
          <button
            className="button-form"
            type="submit"
            data-cy={`submitReply-${commentID}`}
            data-testid={`submitReply-${commentID}`}
          >
            Reply
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
