type RegistrationForm = {
  username: string
  email: string
  password: string
  confirm_password: string
}

function random_user_registration_form (): RegistrationForm {
  return {
    username: `user${random_user_id()}`,
    email: `user${random_user_id()}@example.com`,
    password: "12345678",
    confirm_password: "12345678"
  };
}

function random_user_id (): number {
  return Math.floor(Math.random() * 1000000);
}

describe("A guest", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should be able to sign up", () => {
    cy.get("button[data-cy=\"goto-signup\"]").click();

    const registration_form = random_user_registration_form();

    // See Cypress Docs -> Best Practices -> Selecting Elements
    // https://docs.cypress.io/guides/references/best-practices#Selecting-Elements
    cy.get("input[data-cy=\"registration-form-username\"]").type(registration_form.username);
    cy.get("input[data-cy=\"registration-form-email\"]").type(registration_form.email);
    cy.get("input[data-cy=\"registration-form-password\"]").type(registration_form.password);
    cy.get("input[data-cy=\"registration-form-confirm-password\"]").type(registration_form.confirm_password);

    cy.get("button[data-cy=\"registration-form-submit\"]").click();

    cy.contains("Your account was registered!");
  });
});
