import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";
import Comment from "./Comment";
import NewCommentForm from "./NewCommentForm";
import ReplyForm from "./ReplyForm";
import EditForm from "./EditForm";

// Ref RTL best practices
// https://kentcdodds.com/blog/common-mistakes-with-react-testing-library

// Ref RTL userEvent
// https://testing-library.com/docs/user-event/intro/

describe("Single comment", () => {
  //props
  const currentUser = {
    image: {
      png: "./images/avatars/image-juliusomo.png",
      webp: "./images/avatars/image-juliusomo.webp"
    },
    username: "johndoe"
  };

  const comment = {
    id: 1000,
    content: "This is the 1st comment. ",
    createdAt: "5 months ago",
    score: 42,
    user: {
      image: {
        png: "images/avatars/image-amyrobson.png",
        webp: "images/avatars/image-amyrobson.webp"
      },
      username: "johndoe"
    },
    replies: []
  };

  test("Displays comment contents", () => {
    render(<Comment currentUser={currentUser} comment={comment} />);

    expect(screen.getByText(/1000/)).toBeInTheDocument();
    expect(screen.getByAltText("avatar")).toHaveAttribute(
      "src",
      "images/avatars/image-amyrobson.png"
    );
    expect(screen.getByText(/johndoe/)).toBeInTheDocument();
    expect(screen.getByText(/5 months ago/)).toBeInTheDocument();
    expect(screen.getByText(/This is the 1st comment/));
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
  });

  test("Deletes current comment", async () => {
    const user = userEvent.setup();
    const deleteComment = jest.fn();
    render(
      <Comment
        currentUser={currentUser}
        comment={comment}
        deleteComment={deleteComment}
      />
    );
    await user.click(screen.getByRole("button", { name: "Delete" }));
    expect(deleteComment).toHaveBeenCalledTimes(1);
    expect(deleteComment).toHaveBeenCalledWith(1000);
  });

  test("Toggles edit form", async () => {
    const user = userEvent.setup();
    render(<Comment currentUser={currentUser} comment={comment} />);

    // when asserting that an element isn't there, use queryBy
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(screen.queryByTestId("submitEdit-1000")).toBeNull();

    // toggle on
    await user.click(screen.getByTestId("toggleEdit-1000"));
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByTestId("submitEdit-1000")).toBeInTheDocument();

    // toggle off
    await user.click(screen.getByTestId("toggleEdit-1000"));
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(screen.queryByTestId("submitReply-1000")).toBeNull();
  });

  test("Edits current comment", async () => {
    const user = userEvent.setup();
    const editComment = jest.fn();
    const handleToggleEdit = jest.fn();
    render(
      <EditForm
        commentID={comment.id}
        content={comment.content}
        handleToggleEdit={handleToggleEdit}
        editComment={editComment}
      />
    );
    await user.type(screen.getByRole("textbox"), "This is the edited text.");
    await user.click(screen.getByRole("button", { name: "Update" }));
    expect(handleToggleEdit).toHaveBeenCalledTimes(1);
    expect(editComment).toHaveBeenCalledTimes(1);
    expect(editComment).toHaveBeenCalledWith(
      1000,
      "This is the 1st comment. This is the edited text."
    );
  });

  test("Can not vote on own comments", () => {
    render(<Comment currentUser={currentUser} comment={comment} />);
    expect(screen.queryByRole("button", { name: "+" })).toHaveAttribute(
      "disabled"
    );
    expect(screen.queryByRole("button", { name: "-" })).toHaveAttribute(
      "disabled"
    );
  });
});

describe("Comment reply", () => {
  //props

  const currentUser = {
    image: {
      png: "./images/avatars/image-juliusomo.png",
      webp: "./images/avatars/image-juliusomo.webp"
    },
    username: "juliusomo"
  };

  const comment = {
    id: 1,
    content: "This is the comment content",
    createdAt: "5 months ago",
    score: 42,
    user: {
      image: {
        png: "images/avatars/image-amyrobson.png",
        webp: "images/avatars/image-amyrobson.webp"
      },
      username: "johndoe"
    },
    replies: []
  };

  test("Toggles reply form", async () => {
    const user = userEvent.setup();
    render(<Comment currentUser={currentUser} comment={comment} />);

    // when asserting that an element isn't there, use queryBy
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(screen.queryByTestId("submitReply-1")).toBeNull();

    // toggle on
    await user.click(screen.getByTestId("toggleReply-1"));
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByTestId("submitReply-1")).toBeInTheDocument();

    // toggle off
    await user.click(screen.getByTestId("toggleReply-1"));
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(screen.queryByTestId("submitReply-1")).toBeNull();
  });

  test("Reply form displays User avatar", async () => {
    render(<ReplyForm />);
    expect(screen.getByAltText("avatar")).toHaveAttribute(
      "src",
      "images/avatars/image-juliusomo.png"
    );
  });

  test("Reply form has placeholder text", async () => {
    render(<ReplyForm />);
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "placeholder",
      "Add a comment..."
    );
  });

  test("Reply starts with commenter's username", async () => {
    const user = userEvent.setup();
    const addNewReply = jest.fn();
    render(
      <Comment
        currentUser={currentUser}
        comment={comment}
        addNewReply={addNewReply}
      />
    );
    await user.click(screen.getByRole("button", { name: "Reply" }));
    expect(screen.getByRole("textbox")).toHaveValue("@johndoe, ");
  });
});

describe("New comment", () => {
  test("New comment form displays User avatar", () => {
    render(<NewCommentForm />);
    expect(screen.getByAltText("avatar")).toHaveAttribute(
      "src",
      "images/avatars/image-juliusomo.png"
    );
  });

  test("New comment form has placeholder text", () => {
    render(<NewCommentForm />);
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "placeholder",
      "Add a comment..."
    );
  });

  test("New comment form resets after text submitted", async () => {
    const addNewComment = jest.fn();
    const user = userEvent.setup();
    render(<NewCommentForm addNewComment={addNewComment} />);
    await user.type(screen.getByRole("textbox"), "The Quick Brown Fox");
    await user.click(screen.getByTestId("submitNewComment"));
    expect(addNewComment).toHaveBeenCalledTimes(1);
    expect(addNewComment).toHaveBeenCalledWith("The Quick Brown Fox");
    expect(screen.getByRole("textbox")).toHaveValue("");
  });
});

describe("Comment voting", () => {
  //props
  const currentUser = {
    image: {
      png: "./images/avatars/image-juliusomo.png",
      webp: "./images/avatars/image-juliusomo.webp"
    },
    username: "user1"
  };

  const comment = {
    id: 42,
    content: "Voting on this comment by another user. ",
    createdAt: "5 months ago",
    score: 7,
    user: {
      image: {
        png: "images/avatars/image-amyrobson.png",
        webp: "images/avatars/image-amyrobson.webp"
      },
      username: "user2"
    },
    replies: []
  };

  test("Can vote on a comment", async () => {
    const updateScore = jest.fn();
    const user = userEvent.setup();
    render(
      <Comment
        currentUser={currentUser}
        comment={comment}
        updateScore={updateScore}
      />
    );
    await user.click(screen.getByRole("button", { name: "+" }));
    expect(updateScore).toHaveBeenCalledTimes(1);
    expect(updateScore).toHaveBeenCalledWith(42, 1);
    updateScore.mockClear();
    await user.click(screen.getByRole("button", { name: "-" }));
    expect(updateScore).toHaveBeenCalledTimes(1);
    expect(updateScore).toHaveBeenCalledWith(42, -1);
  });
});

export {};
