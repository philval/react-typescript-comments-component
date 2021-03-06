import { useState } from "react";

export default function NewCommentForm(): JSX.Element {
  const [newComment, setNewComment] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO update state via reducer
    setNewComment("");
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "#ffe4e6",
          padding: 12,
          marginBottom: 24
        }}
      >
        <img src="images/avatars/image-juliusomo.png" alt="avatar"></img>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={handleChange}
          />
          <button type="submit">SEND</button>
        </form>
      </div>
    </>
  );
}
