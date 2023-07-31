import { v4 as uuidv4 } from "uuid";
import { RegistrationForm, random_user_registration_data } from "../../user/registration";

describe("A registered user", () => {
  let registration_form: RegistrationForm;

  before(() => {
    registration_form = random_user_registration_data();

    cy.visit("/");
    cy.visit("/signup");
    cy.register(registration_form);
    cy.login(registration_form.username, registration_form.password);
  });

  it("should be able to upload a torrent", () => {
    let torrentId = uuidv4();
    let torrentTitle = `title-${torrentId}`;
    let torrentDescription = `title-${torrentId}`;
    let torrentFilename = `file-${torrentId}.txt.torrent`;
    let torrentPath = `cypress/fixtures/torrents/${torrentFilename}`;

    cy.log("download a new test random torrent");

    cy.request({
      url: `http://localhost:3001/v1/torrent/meta-info/random/${torrentId}`,
      encoding: "binary"
    }).then((response) => {
      cy.log("random torrent downloaded to: ", torrentPath);
      cy.writeFile(torrentPath, response.body, "binary");
    });

    cy.visit("/upload");

    cy.get("input[data-cy=\"upload-form-title\"]").type(torrentTitle);
    cy.get("textarea[data-cy=\"upload-form-description\"]").type(torrentDescription);
    cy.get("select[data-cy=\"upload-form-category\"]").select("software");

    // todo: add tag.
    // By default there are no tags, so we need to create them first with
    // a custom command. We can enable this feature after writing the test for
    // the tags context.  We could even create some tags before running all the
    // tests.
    // cy.get("input[data-cy=\"upload-form-tags\"]").select('fractals');

    cy.get("input[data-cy=\"upload-form-torrent-upload\"]").selectFile(
      {
        contents: torrentPath,
        fileName: torrentFilename,
        mimeType: "application/x-bittorrent"
      }, { force: true });

    cy.get("button[data-cy=\"upload-form-submit\"]").click();

    cy.url().should("include", "/torrent/");
  });
});
