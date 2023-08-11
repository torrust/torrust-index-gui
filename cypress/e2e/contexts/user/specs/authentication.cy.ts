import { random_user_registration_data } from "../registration";

describe("A registered user", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should be able to sign in", () => {
    cy.visit("/signup");

    const registration_form = random_user_registration_data();

    cy.register(registration_form);

    cy.visit("/signin");

    cy.get("input[data-cy=\"login-form-username\"]").type(registration_form.username);
    cy.get("input[data-cy=\"login-form-password\"]").type(registration_form.password);

    cy.get("button[data-cy=\"login-form-submit\"]").click();

    cy.url().should("include", "/torrents");

    cy.delete_user_from_database(registration_form.username);
  });
});

describe("The website admin", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should be able to sign in as admin", () => {
    const registration_form = random_user_registration_data();

    cy.register_as_admin(registration_form);

    cy.login(registration_form.username, registration_form.password);

    // If the user is an admin, the link to admin settings should be available
    cy.get("li[data-cy=\"admin-settings-link\"]");

    cy.delete_user_from_database(registration_form.username);
  });
});
