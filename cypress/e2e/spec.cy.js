beforeEach(() => {
  cy.intercept("http://localhost:3000/data.json", {
    fixture: "data.json"
  }).as("getData");

  cy.visit("http://localhost:3000/");
  cy.wait("@getData");
});

describe("Loads the application", () => {
  it("Finds the app title and first comment and new comment form", () => {
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

describe("Adds a new comment", () => {
  it("Adds a new comment", () => {
    cy.get('[data-cy="inputNewComment"]').type("New comment");
    cy.get('[data-cy="submitNewComment"]').click();
    cy.contains("New comment");
  });
});

describe("Replies to an existing comment", () => {
  it("Replies to an existing comment", () => {
    cy.get('[data-cy="toggleReply-1"]').click();
    cy.get("[data-cy=inputReply-1]").type("Reply One");
    cy.get('[data-cy="submitReply-1"]').click();
    cy.contains("Reply One");
  });
});

describe("Deletes New comments and replies", () => {
  it("Deletes a new comment", () => {
    // setup a new comment to delete
    cy.get('[data-cy="inputNewComment"]').type("Delete this comment");
    cy.get('[data-cy="submitNewComment"]').click();
    cy.contains("Delete this comment");

    // delete the new comment
    cy.get('[data-cy="deleteComment-2"]').click();
    cy.contains("Delete this comment").should("not.exist");
  });

  it("Deletes a new reply", () => {
    // setup a new reply to delete
    cy.get('[data-cy="toggleReply-1"]').click();
    cy.get("[data-cy=inputReply-1]").type("Delete this reply");
    cy.get('[data-cy="submitReply-1"]').click();
    cy.contains("Delete this reply");

    // delete the new reply
    cy.get('[data-cy="deleteComment-2"]').click();
    cy.contains("Delete this reply").should("not.exist");
  });
});

describe("Edits New comments and replies", () => {
  it("Edits a new comment", () => {
    // setup a new comment to edit
    cy.get('[data-cy="inputNewComment"]').type("Edit this comment.");
    cy.get('[data-cy="submitNewComment"]').click();
    cy.contains("Edit this comment.");

    // edit the new comment
    cy.get('[data-cy="toggleEdit-2"]').click();
    cy.get('[data-cy="editComment-2"]').type("Editing now. ");
    cy.get('[data-cy="submitEdit-2"]').click();
    cy.contains("Editing now. Edit this comment.");
  });

  it("Edits a new reply", () => {
    // setup a new reply to edit
    cy.get('[data-cy="toggleReply-1"]').click();
    cy.get("[data-cy=inputReply-1]").type("Edit this reply.");
    cy.get('[data-cy="submitReply-1"]').click();
    cy.contains("@commenter1, Edit this reply");

    // edit the new reply
    cy.get('[data-cy="toggleEdit-2"]').click();
    cy.get('[data-cy="editComment-2"]').type("Editing now. ");
    cy.get('[data-cy="submitEdit-2"]').click();
    cy.contains("Editing now. @commenter1, Edit this reply.");
  });
});

describe("Votes on comment scores", () => {
  it("Up votes on the score", () => {
    cy.contains("42");
    cy.get('[data-cy="upVote-1"]').click();
    cy.contains("43");
  });
  it("Down votes on the score", () => {
    cy.contains("42");
    cy.get('[data-cy="downVote-1"]').click();
    cy.contains("41");
  });
});
