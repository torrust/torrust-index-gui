// Custom commands for category context

Cypress.Commands.add("delete_category", (name) => {
  cy.task("deleteCategory", { name });
});
