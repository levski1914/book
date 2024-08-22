describe("Book Social Network - Profile Menu", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("navigates to the login page through the Profile menu", () => {
    // cy.get(".profile").realHover("mouse");

    cy.contains("a", "Log in").click();

    cy.url().should("include", "/login");
  });
});
// it("adds a book to wishlist", () => {
//   cy.get(".wishIcon").first().click();
//   cy.get("a").contains("Wishlist").click();
//   cy.url().should("include", "/wishlist");
//   cy.get(".wishlist-item").should("have.length.greaterThan", 0);
// });

// it("navigates to the manage books page and adds a book", () => {
//   cy.get("nav").contains("Profile").trigger("mouseover");
//   cy.get("a").contains("Log in").click();
//   cy.get('input[name="email"]').type("testtest@test.com");
//   cy.get('input[name="password"]').type("testtest");
//   cy.get("button").contains("Login").click();
//   cy.get("a").contains("Manage Books").click();
//   cy.url().should("include", "/manage-books");
//   cy.get('input[placeholder="Title"]').type("New Book");
//   cy.get('input[placeholder="Author"]').type("Author Name");
//   cy.get('input[type="file"]').selectFile(
//     "../../src/assets/images/beloved.jpg"
//   );
//   cy.get("button").contains("Add Book").click();
//   cy.contains("New Book by Author Name");
// });
