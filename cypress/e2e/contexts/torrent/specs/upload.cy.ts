import { RegistrationForm, random_user_registration_data } from "../../user/registration";

// It extracts the filename from the content-disposition header.
//
// For example:
//
// From: attachment; filename=file-6dcf841b-bc75-4a2e-9aa0-8ca63b49df18.txt.torrent
// It returns: file-6dcf841b-bc75-4a2e-9aa0-8ca63b49df18.txt.torrent
function extractFilename (contentDisposition: string): string {
  if (contentDisposition && contentDisposition.includes("attachment")) {
    return contentDisposition.split(";")[1].split("=")[1].replace(/\"/g, "");
  }
  return "";
}

// It extracts the test torrent ID from the torrent file name.
//
// For example:
//
// From: file-6dcf841b-bc75-4a2e-9aa0-8ca63b49df18.txt.torrent
// It returns: 6dcf841b-bc75-4a2e-9aa0-8ca63b49df18
function extractTorrentIdFromFilename (filename: string): string {
  return filename.split(".")[0].split("file-")[1];
}

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
    let torrentId = "";

    cy.log("download a random torrent for the test");

    cy.request({
      url: "http://localhost:3001/v1/torrents/random",
      encoding: "binary"
    }).then((response) => {
      cy.log("random torrent downloaded");

      const header = response.headers["content-disposition"];

      let contentDisposition: string;
      if (typeof header === "string") {
        contentDisposition = header;
      } else {
        contentDisposition = header[0];
      }

      const filename = extractFilename(contentDisposition);
      const torrentPath = `cypress/fixtures/torrents/${filename}`;
      torrentId = extractTorrentIdFromFilename(filename);

      // Alias the torrentId for later use
      cy.wrap(torrentId).as("torrentId");

      cy.log("torrent ID: ", torrentId);
      cy.log("random torrent downloaded: ", torrentPath);

      cy.writeFile(torrentPath, response.body, "binary");
    });

    cy.visit("/upload");

    cy.get("@torrentId").then((torrentId) => {
      cy.get("input[data-cy=\"upload-form-title\"]").type(`title-${torrentId}`);
      cy.get("textarea[data-cy=\"upload-form-description\"]").type(`description-${torrentId}`);
    });
    cy.get("select[data-cy=\"upload-form-category\"]").select("software");

    // todo: add tag.
    // By default there are no tags, so we need to create them first with
    // a custom command. We can enable this feature after writing the test for
    // the tags context.  We could even create some tags before running all the
    // tests.
    // cy.get("input[data-cy=\"upload-form-tags\"]").select('fractals');

    cy.get("@torrentId").then((torrentId) => {
      cy.get("input[data-cy=\"upload-form-torrent-upload\"]").selectFile(
        {
          contents: `cypress/fixtures/torrents/file-${torrentId}.txt.torrent`,
          fileName: `file-${torrentId}.torrent`,
          mimeType: "application/x-bittorrent"
        }, { force: true });
    });

    cy.get("button[data-cy=\"upload-form-submit\"]").click();

    cy.url().should("include", "/torrent/");
  });
});
