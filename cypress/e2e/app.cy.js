// cypress/e2e/app.cy.js

describe("E-commerce app basic flow", () => {
  it("loads, adds item to cart, removes it, and verifies cart is empty", () => {
    const BASE_URL = "http://localhost:3000"; // change to 5173 if using Vite

    cy.visit(BASE_URL);

    // Wait for product cards to load
    cy.get('[data-testid="product-card"]', { timeout: 10000 })
      .should("have.length.greaterThan", 0);

    // Open first product details (click first link or button inside card)
    cy.get('[data-testid="product-card"]')
      .first()
      .find("a, button")
      .first()
      .click();

    // Detail page route
    cy.url().should("include", "/product/");

    // Add to cart
    cy.get('[data-testid="add-to-cart"]').click();

    // Go to cart
    cy.contains("Cart").click();

    // On /cart page
    cy.url().should("include", "/cart");

    // ✅ Should have at least one cart item before removal
    cy.get('[data-testid="cart-item"]')
      .its("length")
      .should("be.greaterThan", 0);

    // ✅ Remove first item
    cy.get('[data-testid="cart-item"]')
      .first()
      .contains("button", "Remove")
      .click();

    // ✅ Now there should be zero cart items
    cy.get('[data-testid="cart-item"]').should("have.length", 0);

    // (Optional) If you know your empty-message text, you can also do:
    // cy.contains(/empty/i).should("exist");
  });
});
