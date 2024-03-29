import { useState } from "react";
interface EditFormProps {
  commentID: number;
  handleToggleEdit: () => void;
  editComment: (commentID: number, content: string) => void;
  content: string;
}

export default function ReplyForm({
  commentID,
  content,
  handleToggleEdit,
  editComment
}: EditFormProps): JSX.Element {
  const [editContent, setEditContent] = useState<string>(content);
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditContent(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editContent.length === 0) {
      setError("Please add a comment, minimum 8 characters.");
    } else if (editContent.length < 8) {
      setError("Comments must be at least 8 characters.");
    } else if (editContent.length > 256) {
      setError("Comments are maximum 256 characters.");
    } else {
      editComment(commentID, editContent);
      handleToggleEdit();
      setError("");
    }
  };

  return (
    <>
      <form className="edit-comment-form" onSubmit={handleSubmit}>
        <textarea
          value={editContent}
          onChange={handleChange}
          data-cy={`editComment-${commentID}`}
          rows={4}
        />
        <button
          className="button-form"
          type="submit"
          data-cy={`submitEdit-${commentID}`}
          data-testid={`submitEdit-${commentID}`}
        >
          Update
        </button>
        {error && (
          <div data-testid="formError" className="form-error">
            {error}
          </div>
        )}
      </form>
    </>
  );
}
