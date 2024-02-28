// Custom commands for tag context

Cypress.Commands.add("delete_tags_from_database", () => {
  cy.task("deleteTags");
});

Cypress.Commands.add("add_tag_to_database", (name) => {
  cy.task("addTag", { name });
});
