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
    console.log("reply is: ", reply);
    // TODO
    // update state
    // hide form
    handleToggleReply();
    // reset form contents
    setReply("");
  };
  return (
    <>
      <button style={{ marginBottom: 24 }} onClick={handleToggleReply}>
        Reply
      </button>
      {toggleReply && (
        <form onSubmit={handleSubmit}>
          <input type="text" value={reply} onChange={handleChange} />
          <button type="submit">REPLY</button>
        </form>
      )}
    </>
  );
}
