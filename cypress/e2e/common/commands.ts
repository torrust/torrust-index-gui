// Common commands

Cypress.Commands.add("go_to_settings", () => {
  cy.get("div[data-cy=\"user-menu\"]").click();
  cy.get("li[data-cy=\"admin-settings-link\"]").click();
});
