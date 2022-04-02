import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "../App";

describe("App", () => {
  test("renders App title", () => {
    render(<App />);

    expect(screen.getByRole("heading")).toBeInTheDocument;

    expect(screen.getByRole("heading")).toHaveTextContent(
      "React Typescript Comments Component"
    );
  });
});
