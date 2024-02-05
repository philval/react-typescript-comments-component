import { useState } from "react";
interface EditFormProps {
  username: string;
  commentID: number;
  handleToggleEdit: () => void;
  editComment: (commentID: number, content: string) => void;
  content: string;
}

export default function ReplyForm({
  // username,
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
      <form className="new-reply-form" onSubmit={handleSubmit}>
        {/* set focus to end of text */}
        <textarea
          autoFocus
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
