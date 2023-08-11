// It extracts the torrent info-hash from a custom HTTP header `x-torrust-torrent-infohash`.
export function extractInfoHashFromResponse (response: Cypress.Response<any>): string {
  return parseInfoHash(response.headers["x-torrust-torrent-infohash"]);
}

// It parses the torrent info-hash from a Cypress response header.
export function parseInfoHash (headerValue: string | string[]): string {
  if (typeof headerValue === "string") {
    return headerValue;
  } else {
    return headerValue.join(", ");
  }
}
