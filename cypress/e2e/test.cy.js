import { cy } from "cypress";

describe("Hello World Test", () => {
  it('should display "Hello, World!"', () => {
    cy.visit("https://example.com");
    cy.log("Hello, World!");
    expect("Example Domain").toBeInTheDocument();
  });
});
