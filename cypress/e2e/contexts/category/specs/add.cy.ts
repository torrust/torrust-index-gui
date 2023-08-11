import { RegistrationForm, random_user_registration_data } from "../../user/registration";

describe("The admin user", () => {
  let registration_form: RegistrationForm;

  before(() => {
    registration_form = random_user_registration_data();

    cy.visit("/");
    cy.visit("/signup");
    cy.register_as_admin(registration_form);
    cy.login(registration_form.username, registration_form.password);
  });

  after(() => {
    cy.delete_user(registration_form.username);
  });

  it("should be able to add a new category", () => {
    // Make sure the category does not exist
    cy.delete_category("new category");

    // Go to admin settings
    cy.get("div[data-cy=\"user-menu\"]").click();
    cy.get("li[data-cy=\"admin-settings-link\"]").click();

    // Click categories tab
    cy.contains("a", "categories").click();

    // Fill new category name
    cy.get("input[data-cy=\"add-category-input\"]").type("new category");

    // Add category
    cy.get("button[data-cy=\"add-category-button\"]").click();

    // The new category should appear in the list
    cy.contains("new category (0)");

    cy.delete_category("new category");
  });
});

describe("A non admin authenticated user", () => {
  let registration_form: RegistrationForm;

  before(() => {
    registration_form = random_user_registration_data();

    cy.visit("/");
    cy.visit("/signup");
    cy.register(registration_form);
    cy.login(registration_form.username, registration_form.password);
  });

  after(() => {
    cy.delete_user(registration_form.username);
  });

  it("should not be able to add a new category", () => {
    cy.visit("/admin/settings/categories");

    cy.contains("Please login to manage admin settings.");
  });
});

describe("A guest user", () => {
  it("should not be able to add a new category", () => {
    cy.visit("/admin/settings/categories");

    cy.contains("Please login to manage admin settings.");
  });
});
