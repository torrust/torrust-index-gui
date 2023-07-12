import { RegistrationForm } from "../e2e/contexts/user/registration";

Cypress.Commands.add("register", (registration_form) => {
  cy.visit("/signup");

  cy.get("input[data-cy=\"registration-form-username\"]").type(registration_form.username);
  cy.get("input[data-cy=\"registration-form-email\"]").type(registration_form.email);
  cy.get("input[data-cy=\"registration-form-password\"]").type(registration_form.password);
  cy.get("input[data-cy=\"registration-form-confirm-password\"]").type(registration_form.confirm_password);

  cy.get("button[data-cy=\"registration-form-submit\"]").click();

  cy.contains("Your account was registered!");
});

declare global {
  namespace Cypress {
    interface Chainable {
        register(registration_form: RegistrationForm): Chainable<void>
    }
  }
}
