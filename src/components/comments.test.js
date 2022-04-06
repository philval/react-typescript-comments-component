import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import Comment from "./Comment";

describe("App", () => {
  test("renders App title", () => {
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
        png: "./images/avatars/image-amyrobson.png",
        webp: "./images/avatars/image-amyrobson.webp"
      },
      username: "johndoe"
    },
    replies: []
  };

  test("renders Comment props", () => {
    render(<Comment comment={comment} />);

    expect(screen.getByText("This is the comment content")).toBeInTheDocument;
    expect(screen.getByText("5 months ago")).toBeInTheDocument;
    expect(screen.getByText(/^42$/)).toBeInTheDocument;
    expect(screen.getByText("johndoe")).toBeInTheDocument;
    expect(screen.getByRole("button", { name: "Reply" })).toHaveTextContent(
      "Reply"
    );
  });

  test("toggles Comment Reply form", () => {
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
});
