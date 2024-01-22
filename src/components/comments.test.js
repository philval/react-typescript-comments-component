import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";
import Comment from "./Comment";
import NewCommentForm from "./NewCommentForm";
import ReplyForm from "./ReplyForm";

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
    content: "This is the 1st comment",
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
    expect(screen.getByText("This is the 1st comment"));
    expect(screen.getByRole("button", { name: "Reply" })).toBeInTheDocument();
    // comment by current user has delete and edit rights
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
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
    expect(screen.queryByRole("button", { name: "REPLY" })).toBeNull();

    // toggle on
    await user.click(screen.getByRole("button", { name: "Reply" }));
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "REPLY" })).toBeInTheDocument();

    // toggle off
    await user.click(screen.getByRole("button", { name: "Reply" }));
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(screen.queryByRole("button", { name: "REPLY" })).toBeNull();
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
    await user.click(screen.getByRole("button", { name: "SEND" }));
    expect(addNewComment).toHaveBeenCalledTimes(1);
    expect(addNewComment).toHaveBeenCalledWith("The Quick Brown Fox");
    expect(screen.getByRole("textbox")).toHaveValue("");
  });
});

export {};
