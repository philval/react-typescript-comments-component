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
  it("replies to commentID 1", () => {
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

    //   const [newID, setNewID] = useState<number>(5); //
    cy.get('[data-cy="toggleReply-5"]').click();
    cy.get("[data-cy=inputReply-5]").type("Reply Two");
    cy.get('[data-cy="submitReply-5"]').click();
    cy.contains("Reply Two");

    cy.get('[data-cy="toggleReply-6"]').click();
    cy.get("[data-cy=inputReply-6]").type("Reply Three");
    cy.get('[data-cy="submitReply-6"]').click();
    cy.contains("Reply Three");

    cy.get('[data-cy="toggleReply-5"]').click();
    cy.get("[data-cy=inputReply-5]").type("Reply Four");
    cy.get('[data-cy="submitReply-5"]').click();
    cy.contains("Reply Four");
  });
});
