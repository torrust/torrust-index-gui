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

describe("Regarding user registration", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("a guest user should be able to sign up", () => {
    // Go to sign up form
    cy.contains("Login").click();
    cy.contains("Don't have an account? Sign up").click();

    const registration_form = random_user_registration_form();

    // See Cypress Docs -> Best Practices -> Selecting Elements
    // https://docs.cypress.io/guides/references/best-practices#Selecting-Elements
    cy.get("input[data-cy=\"username\"]").type(registration_form.username);
    cy.get("input[data-cy=\"email\"]").type(registration_form.email);
    cy.get("input[data-cy=\"password\"]").type(registration_form.password);
    cy.get("input[data-cy=\"confirm_password\"]").type(registration_form.confirm_password);

    cy.get("button[data-cy=\"submit\"]").click();

    cy.contains("Success");
  });
});
