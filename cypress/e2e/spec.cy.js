/* eslint-disable no-undef */
describe("Loads the application", () => {
  it("finds the app title and first comment and new comment form", () => {
    cy.intercept("http://localhost:3000/data.json", {
      fixture: "data.json"
    }).as("getData");

    cy.visit("http://localhost:3000/");
    cy.wait("@getData");

    cy.contains("React Typescript Comments Component");
    cy.contains("commenter1");
    cy.contains("Comment 1");
    cy.get('[data-cy="inputNewComment"]').should(
      "have.attr",
      "placeholder",
      "Add a comment..."
    );
  });
});

describe("Adds a new comment for the user", () => {
  it("adds a new comment", () => {
    cy.intercept("http://localhost:3000/data.json", {
      fixture: "data.json"
    }).as("getData");

    cy.visit("http://localhost:3000/");
    cy.wait("@getData"); // Wait for the intercepted request to complete

    cy.contains("Comment 1");
    cy.get('[data-cy="inputNewComment"]').type("New comment");
    cy.get('[data-cy="submitNewComment"]').click();
    cy.contains("New comment");
  });
});

describe("Replies to an existing comment", () => {
  it("replies to replies...", () => {
    cy.intercept("http://localhost:3000/data.json", {
      fixture: "data.json"
    }).as("getData");

    cy.visit("http://localhost:3000/");
    cy.wait("@getData"); // Wait for the intercepted request to complete

    cy.contains("Comment 1");
    cy.get('[data-cy="toggleReply-1"]').click();
    cy.get("[data-cy=inputReply-1]").type("Reply One");
    cy.get('[data-cy="submitReply-1"]').click();
    cy.contains("Reply One");

    cy.get('[data-cy="toggleReply-2"]').click();
    cy.get("[data-cy=inputReply-2]").type("Reply Two");
    cy.get('[data-cy="submitReply-2"]').click();
    cy.contains("Reply Two");

    cy.get('[data-cy="toggleReply-3"]').click();
    cy.get("[data-cy=inputReply-3]").type("Reply Three");
    cy.get('[data-cy="submitReply-3"]').click();
    cy.contains("Reply Three");

    cy.get('[data-cy="toggleReply-2"]').click();
    cy.get("[data-cy=inputReply-2]").type("Reply Four");
    cy.get('[data-cy="submitReply-2"]').click();
    cy.contains("Reply Four");
  });
});

describe("Deletes New comments and replies", () => {
  it("deletes a new comment", () => {
    cy.intercept("http://localhost:3000/data.json", {
      fixture: "data.json"
    }).as("getData");

    cy.visit("http://localhost:3000/");
    cy.wait("@getData");

    // setup add a new comment to delete
    cy.get('[data-cy="inputNewComment"]').type("Delete this comment");
    cy.get('[data-cy="submitNewComment"]').click();

    cy.get('[data-cy="deleteComment-2"]').click();
    cy.contains("Delete this comment").should("not.exist");
  });

  it("deletes a new reply", () => {
    cy.intercept("http://localhost:3000/data.json", {
      fixture: "data.json"
    }).as("getData");

    cy.visit("http://localhost:3000/");
    cy.wait("@getData");

    // setup add a new reply to delete
    cy.get('[data-cy="toggleReply-1"]').click();
    cy.get("[data-cy=inputReply-1]").type("Delete this reply");
    cy.get('[data-cy="submitReply-1"]').click();
    cy.contains("Delete this reply");

    cy.get('[data-cy="deleteComment-2"]').click();
    cy.contains("Delete this reply").should("not.exist");
  });
});
