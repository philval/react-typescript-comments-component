import {
  render,
  screen,
  fireEvent,
  getByAltText
} from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import Comment from "./Comment";
import ReplyForm from "./ReplyForm";
import NewCommentForm from "./NewCommentForm";

describe("App", () => {
  test("Renders App title", () => {
    render(<App />);

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument;
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "React Typescript Comments Component"
    );
  });
});

describe("Single Comment", () => {
  //props
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

  test("Displays Comment contents", () => {
    render(<Comment comment={comment} />);

    expect(screen.getByText(/^42$/)).toBeInTheDocument;
    expect(screen.getByAltText("avatar")).toHaveAttribute(
      "src",
      "images/avatars/image-amyrobson.png"
    );
    expect(screen.getByText("johndoe")).toBeInTheDocument;
    expect(screen.getByText("5 months ago")).toBeInTheDocument;
    expect(screen.getByText("This is the comment content")).toBeInTheDocument;
    expect(screen.getByRole("button", { name: "Reply" })).toHaveTextContent(
      "Reply"
    );
  });

  test("Toggles Comment Reply form", () => {
    render(<Comment comment={comment} />);

    // when asserting that an element isn't there, use queryBy
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(screen.queryByRole("button", { name: "REPLY" })).toBeNull();

    // toggle on
    fireEvent.click(screen.getByRole("button", { name: "Reply" }));
    expect(screen.getByRole("textbox")).toBeInTheDocument;
    expect(screen.getByRole("button", { name: "REPLY" })).toHaveTextContent(
      "REPLY"
    );

    // toggle off
    fireEvent.click(screen.getByRole("button", { name: "Reply" }));
    expect(screen.queryByRole("textbox")).toBeNull();
    expect(screen.queryByRole("button", { name: "REPLY" })).toBeNull();
  });

  test("Reply Form displays User avatar", () => {
    render(<ReplyForm />);
    fireEvent.click(screen.getByRole("button", { name: "Reply" }));
    expect(screen.getByAltText("avatar")).toHaveAttribute(
      "src",
      "images/avatars/image-juliusomo.png"
    );
  });
});

describe("New Comment", () => {
  test("New Comment form displays User avatar", () => {
    render(<NewCommentForm />);
    expect(screen.getByAltText("avatar")).toHaveAttribute(
      "src",
      "images/avatars/image-juliusomo.png"
    );
  });

  test("New Comment form has placeholder text", () => {
    render(<NewCommentForm />);
    expect(screen.getByRole("textbox")).toHaveAttribute(
      "placeholder",
      "Add a comment..."
    );
  });
});
