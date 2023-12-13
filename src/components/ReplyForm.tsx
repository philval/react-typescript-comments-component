import { useState } from "react";
interface ReplyFormProps {
  username: string
  commentID: number
  addNewReply: (comment: string, commentID: number) => void
}

export default function ReplyForm({ username, commentID, addNewReply }: ReplyFormProps): JSX.Element {
  const [toggleReply, setToggleReply] = useState<boolean>(false);
  const [reply, setReply] = useState<string>(`@${username}, `); // anti-pattern ?

  const handleToggleReply = () => {
    setToggleReply(!toggleReply);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReply(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // how will addReply update replies[] on comment ?
    addNewReply(reply, commentID);
    handleToggleReply();
    setReply("");
  };

  return (
    <>
      <button style={{ marginBottom: 24 }} onClick={handleToggleReply}>
        Reply
      </button>
      {toggleReply && (
        <div>
          <img alt="avatar" src="images/avatars/image-juliusomo.png" />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Add a comment..."
              value={reply}
              onChange={handleChange}
            />
            <button type="submit">REPLY</button>
          </form>
        </div>
      )}
    </>
  );
}
