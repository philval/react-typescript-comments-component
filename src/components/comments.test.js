import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { JSDOM } from "jsdom";

import Comment from "./Comment";
import NewCommentForm from "./NewCommentForm";
import ReplyForm from "./ReplyForm";
import EditForm from "./EditForm";
import DeleteModal from "./DeleteModal";

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
    createdAt: new Date().toISOString(),
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

    expect(screen.getByAltText("avatar")).toHaveAttribute(
      "src",
      "images/avatars/image-amyrobson.png"
    );
    expect(screen.getByText(/johndoe/)).toBeInTheDocument();
    expect(screen.getByText(/just now/)).toBeInTheDocument(); // timeAgo()
    expect(screen.getByText(/This is the 1st comment/));
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
  });

  test("Deletes current comment", async () => {
    const user = userEvent.setup();
    const isModalOpen = true;
    const handleModalCancel = jest.fn();
    const handleModalDelete = jest.fn();
    // jest does not support <dialog> element yet...
    const dom = new JSDOM();
    global.window = dom.window;
    global.window.HTMLDialogElement.prototype.close = jest.fn();

    render(
      <DeleteModal
        isModalOpen={isModalOpen}
        onCancel={handleModalCancel}
        onDelete={handleModalDelete}
      />
    );

    expect(screen.getByTestId("dialog")).toBeInTheDocument();
    await user.click(screen.getByTestId("dialog-close"));
    expect(handleModalCancel).toHaveBeenCalledTimes(1);
    await user.click(screen.getByTestId("dialog-delete"));
    expect(handleModalDelete).toHaveBeenCalledTimes(1);
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

  test("Form displays error message for: empty input", async () => {
    const user = userEvent.setup();
    render(<ReplyForm username="joebloggs" commentID={1} />);
    await user.clear(screen.getByRole("textbox"));
    await user.click(screen.getByTestId("submitReply-1"));
    expect(screen.getByTestId("formError")).toHaveTextContent(
      "Please add a reply, minimum 8 characters."
    );
  });

  test("Form displays error message for: input less than minimum length", async () => {
    const user = userEvent.setup();
    render(<ReplyForm username="joebloggs" commentID={1} />);
    await user.clear(screen.getByRole("textbox"));
    await user.type(screen.getByRole("textbox"), "1234567");
    await user.click(screen.getByTestId("submitReply-1"));
    expect(screen.getByTestId("formError")).toHaveTextContent(
      "Replies must be at least 8 characters."
    );
  });

  test("Form displays error message for: input greater than minimum length", async () => {
    const user = userEvent.setup();
    render(<ReplyForm username="joebloggs" commentID={1} />);
    const tooLong = "12345678".repeat(32) + "1";
    await user.clear(screen.getByRole("textbox"));
    await user.type(screen.getByRole("textbox"), tooLong);
    await user.click(screen.getByTestId("submitReply-1"));
    expect(screen.getByTestId("formError")).toHaveTextContent(
      "Replies are maximum 256 characters."
    );
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

  test("Form displays error message for: empty input", async () => {
    const user = userEvent.setup();
    render(<NewCommentForm />);
    await user.click(screen.getByTestId("submitNewComment"));
    expect(screen.getByTestId("formError")).toHaveTextContent(
      "Please add a comment, minimum 8 characters."
    );
  });

  test("Form displays error message for: input less than minimum length", async () => {
    const user = userEvent.setup();
    render(<NewCommentForm />);
    await user.type(screen.getByRole("textbox"), "1234567");
    await user.click(screen.getByTestId("submitNewComment"));
    expect(screen.getByTestId("formError")).toHaveTextContent(
      "Comments must be at least 8 characters."
    );
  });

  test("Form displays error message for: input greater than minimum length", async () => {
    const user = userEvent.setup();
    render(<NewCommentForm />);
    const tooLong = "12345678".repeat(32) + "1";
    await user.type(screen.getByRole("textbox"), tooLong);
    await user.click(screen.getByTestId("submitNewComment"));
    expect(screen.getByTestId("formError")).toHaveTextContent(
      "Comments are maximum 256 characters."
    );
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
