import { useRef, useEffect } from "react";
import ReactDOM from "react-dom";

interface DeleteModalProps {
  isModalOpen: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

export default function DeleteModal({
  isModalOpen,
  onCancel,
  onDelete
}: DeleteModalProps): JSX.Element | null {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // disable the esc key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
      }
    }

    if (isModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }
    // cleanup
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  if (isModalOpen) {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal(); // DOM
    }
  }

  function closeDialogue() {
    if (dialogRef.current) {
      dialogRef.current.close(); // DOM
    }
    onCancel();
  }

  function closeDialogueDeleteComment() {
    closeDialogue();
    onDelete();
  }

  return ReactDOM.createPortal(
    <dialog className="dialog" ref={dialogRef} data-testid="dialog">
      <h2>Delete comment</h2>
      <p>
        Are you sure you want to delete this comment? This will remove the
        comment and can&apos;t be undone.
      </p>
      <div className="dialog-buttons">
        <button
          type="button"
          className="button-dialog button-dialog-cancel"
          onClick={closeDialogue}
          data-cy="dialog-close"
          data-testid="dialog-close"
        >
          No, cancel
        </button>
        <button
          type="button"
          className="button-dialog button-dialog-delete"
          onClick={closeDialogueDeleteComment}
          data-cy="dialog-delete"
          data-testid="dialog-delete"
        >
          Yes, delete
        </button>
      </div>
    </dialog>,
    document.body
  );
}
