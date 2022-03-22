import { useState } from "react";

export default function NewCommentForm() {
  const [newComment, setNewComment] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("new comment is: ", newComment);
    // TODO update state via reducer
    // reset form contents
    setNewComment("");
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "pink",
          padding: 12,
          marginBottom: 24
        }}
      >
        <img src="images/avatars/image-juliusomo.png" alt=""></img>
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
