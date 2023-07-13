import { random_user_registration_data } from "../registration";

describe("A guest", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should be able to sign up", () => {
    const registration_form = random_user_registration_data();

    cy.visit("/signup");

    cy.get("input[data-cy=\"registration-form-username\"]").type(registration_form.username);
    cy.get("input[data-cy=\"registration-form-email\"]").type(registration_form.email);
    cy.get("input[data-cy=\"registration-form-password\"]").type(registration_form.password);
    cy.get("input[data-cy=\"registration-form-confirm-password\"]").type(registration_form.confirm_password);

    cy.get("button[data-cy=\"registration-form-submit\"]").click();

    cy.contains("Your account was registered!");
  });
});
