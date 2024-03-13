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
    // test cancel dialog
    cy.get('[data-cy="deleteComment-2"]').click();
    cy.get('[data-cy="dialog-close"]').click();
    cy.contains("Delete this comment");
    // test delete dialog
    cy.get('[data-cy="deleteComment-2"]').click();
    cy.get('[data-cy="dialog-delete"]').click();
    cy.contains("Delete this comment").should("not.exist");
  });

  it("Deletes a new reply", () => {
    // setup a new reply to delete
    cy.get('[data-cy="toggleReply-1"]').click();
    cy.get("[data-cy=inputReply-1]").type("Delete this reply");
    cy.get('[data-cy="submitReply-1"]').click();
    cy.contains("Delete this reply");
    // test cancel dialog
    cy.get('[data-cy="deleteComment-2"]').click();
    cy.get('[data-cy="dialog-close"]').click();
    cy.contains("Delete this reply");
    // test delete dialog
    cy.get('[data-cy="deleteComment-2"]').click();
    cy.get('[data-cy="dialog-delete"]').click();
    cy.contains("Delete this reply").should("not.exist");
  });
});

describe("Edits new comments and replies", () => {
  it("Edits a new comment", () => {
    // setup a new comment to edit
    cy.get('[data-cy="inputNewComment"]').type("Edit this comment. ");
    cy.get('[data-cy="submitNewComment"]').click();
    cy.contains("Edit this comment. ");

    // edit the new comment
    cy.get('[data-cy="toggleEdit-2"]').click();
    cy.get('[data-cy="editComment-2"]').type("Editing now...");
    cy.get('[data-cy="submitEdit-2"]').click();
    cy.contains("Edit this comment. Editing now...");
  });

  it("Edits a new reply", () => {
    // setup a new reply to edit
    cy.get('[data-cy="toggleReply-1"]').click();
    cy.get("[data-cy=inputReply-1]").type("Edit this reply. ");
    cy.get('[data-cy="submitReply-1"]').click();
    cy.contains("@commenter1, Edit this reply. ");

    // edit the new reply
    cy.get('[data-cy="toggleEdit-2"]').click();
    cy.get('[data-cy="editComment-2"]').type("Editing now...");
    cy.get('[data-cy="submitEdit-2"]').click();
    cy.contains("@commenter1, Edit this reply. Editing now...");
  });
});

describe("Votes on comment scores", () => {
  it("Up votes on the score", () => {
    cy.contains("2");
    cy.get('[data-cy="upVote-1"]').click();
    cy.contains("3");
  });
  it("Down votes on the score", () => {
    cy.contains("2");
    cy.get('[data-cy="downVote-1"]').click();
    cy.contains("1");
  });
});

describe("First-level comments should be ordered by their score", () => {
  it("Changes comment order when a score is changed", () => {
    // add a new comment, score is 0
    cy.get('[data-cy="inputNewComment"]').type("New comment");
    cy.get('[data-cy="submitNewComment"]').click();
    cy.contains("New comment");
    // validate the current scores by checking the array
    cy.get('[data-cy="score"]').should("have.length", 2);
    cy.get('[data-cy="score"]').eq(0).should("have.text", "2");
    cy.get('[data-cy="score"]').eq(1).should("have.text", "0");
    // donwvote the score on comment 1 by another user to less than zero
    cy.get('[data-cy="downVote-1"]').click();
    cy.get('[data-cy="downVote-1"]').click();
    cy.get('[data-cy="downVote-1"]').click();
    // check the order of comments have changed.
    cy.get('[data-cy="score"]').eq(0).should("have.text", "0");
    cy.get('[data-cy="score"]').eq(1).should("have.text", "-1");
    // upvote the score on comment 1 by another user to more than zero
    cy.get('[data-cy="upVote-1"]').click();
    cy.get('[data-cy="upVote-1"]').click();
    // check the order of comments have changed.
    cy.get('[data-cy="score"]').eq(0).should("have.text", "1");
    cy.get('[data-cy="score"]').eq(1).should("have.text", "0");
  });
});
