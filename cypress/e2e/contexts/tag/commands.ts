// Custom commands for tag context

Cypress.Commands.add("delete_tag_from_database", (name) => {
  cy.task("deleteTag", { name });
});

Cypress.Commands.add("add_tag_to_database", (name) => {
  cy.task("addTag", { name });
});
