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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditContent(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editComment(commentID, editContent);
    handleToggleEdit();
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
      </form>
    </>
  );
}
