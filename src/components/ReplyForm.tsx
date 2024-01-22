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
  const [reply, setReply] = useState<string>(`@${username}, `); // anti-pattern ?

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReply(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNewReply(reply, commentID);
    setReply(`@${username}, `);
    handleToggleReply();
  };

  return (
    <>
      <div className="new-reply-container">
        <img alt="avatar" src="images/avatars/image-juliusomo.png" />
        <form className="new-reply-form" onSubmit={handleSubmit}>
          <textarea
            placeholder="Add a comment..."
            value={reply}
            onChange={handleChange}
            data-cy={`inputReply-${commentID}`}
            rows={4}
          />
          <button type="submit" data-cy={`submitReply-${commentID}`}>
            REPLY
          </button>
        </form>
      </div>
    </>
  );
}
