import { RegistrationForm, random_user_registration_data } from "../../user/registration";
import { random_category_name } from "../fixtures";

describe("The admin user", () => {
  let registration_form: RegistrationForm;

  before(() => {
    registration_form = random_user_registration_data();
    cy.register_as_admin_and_login(registration_form);
  });

  after(() => {
    cy.delete_user_from_database(registration_form.username);
  });

  it("should be able to delete a category", () => {
    const category_name = random_category_name();

    cy.add_category_to_database(category_name);

    cy.go_to_settings();

    // Click categories tab
    cy.contains("a", "categories").click();

    // Delete the category
    cy.get(`button[data-cy="delete-category-${category_name}"]`).click();

    // Confirm alert should pop up
    cy.on("window:confirm", (str) => {
      expect(str).to.equal(`Are you sure you want to delete ${category_name}?`);
    });

    // Confirm delete
    cy.on("window:confirm", () => true);

    cy.get(`[data-cy="delete-category-${category_name}"]`).should("not.exist");
  });
});

describe("A non admin authenticated user", () => {
  let registration_form: RegistrationForm;

  before(() => {
    registration_form = random_user_registration_data();
    cy.register_and_login(registration_form);
  });

  after(() => {
    cy.delete_user_from_database(registration_form.username);
  });

  it("should not be able to delete category", () => {
    cy.visit("/admin/settings/categories");
    cy.contains("Please login to manage admin settings.");
  });
});

describe("A guest user", () => {
  it("should not be able to delete a category", () => {
    cy.visit("/admin/settings/categories");
    cy.contains("Please login to manage admin settings.");
  });
});
