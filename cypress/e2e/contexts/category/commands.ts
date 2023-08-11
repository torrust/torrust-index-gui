// Custom commands for category context

Cypress.Commands.add("delete_category_from_database", (name) => {
  cy.task("deleteCategory", { name });
});

Cypress.Commands.add("add_category_to_database", (name) => {
  cy.task("addCategory", { name });
});
