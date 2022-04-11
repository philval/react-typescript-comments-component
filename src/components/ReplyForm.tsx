import { useState } from "react";

export default function ReplyForm() {
  const [toggleReply, setToggleReply] = useState<boolean>(false);
  const [reply, setReply] = useState<string>("");

  const handleToggleReply = () => {
    setToggleReply(!toggleReply);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReply(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO update state via reducer
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
            <input type="text" value={reply} onChange={handleChange} />
            <button type="submit">REPLY</button>
          </form>
        </div>
      )}
    </>
  );
}
