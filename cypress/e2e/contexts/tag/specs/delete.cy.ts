import { RegistrationForm, random_user_registration_data } from "../../user/registration";
import { randomTagName } from "../random_data";

describe("The admin user", () => {
  const registration_form = random_user_registration_data();
  const tag_name = randomTagName();
  before(() => {
    cy.delete_tags_from_database();
    cy.register_as_admin_and_login(registration_form);
  });

  after(() => {
    cy.delete_user_from_database(registration_form.username);
  });

  it("should be able to delete a tag", () => {
    cy.add_tag_to_database(tag_name);

    cy.go_to_settings();

    // Click tags tab
    cy.contains("a", "tags").click();

    // Delete the tag
    cy.get(`button[data-cy="delete-tag-${tag_name}"]`).click();

    // Confirm alert should pop up
    cy.on("window:confirm", (str) => {
      expect(str).to.equal(`Are you sure you want to delete ${tag_name}?`);
    });

    // Confirm delete
    cy.on("window:confirm", () => true);

    cy.get(`[data-cy="delete-tag-${tag_name}"]`).should("not.exist");
  });
});

describe("A non admin authenticated user", () => {
  const registration_form = random_user_registration_data();

  before(() => {
    cy.delete_tags_from_database();
    cy.register_and_login(registration_form);
  });

  after(() => {
    cy.delete_user_from_database(registration_form.username);
  });

  it("should not be able to delete tags", () => {
    cy.visit("/admin/settings/tags");
    cy.contains("Please login to manage admin settings.");
  });
});

describe("A guest user", () => {
  it("should not be able to delete a tag", () => {
    cy.visit("/admin/settings/tags");
    cy.contains("Please login to manage admin settings.");
  });
});
