import { random_user_registration_data } from "./registration";

describe("A registered user", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should be able to login", () => {
    cy.visit("/signup");

    const registration_form = random_user_registration_data();

    cy.register(registration_form);

    cy.visit("/signin");

    cy.get("input[data-cy=\"login-form-username\"]").type(registration_form.username);
    cy.get("input[data-cy=\"login-form-password\"]").type(registration_form.password);

    cy.get("button[data-cy=\"login-form-submit\"]").click();

    cy.url().should("include", "/torrents");
  });
});
