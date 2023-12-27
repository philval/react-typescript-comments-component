/* eslint-disable no-undef */

describe("Loads the application", () => {
  it("finds the app title and first comment and new comment form", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("React Typescript Comments Component");
    cy.contains("amyrobson");
    cy.get("input").should("have.attr", "placeholder", "Add a comment...");
  });
});
