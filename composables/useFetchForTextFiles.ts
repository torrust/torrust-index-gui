// Fetches a file from the server and
// returns the content of the file as
// text

class FetchTextFileError extends Error {}

export async function fetchTextFile (fileName: string) {
  try {
    const fetchResponse = await fetch(fileName);
    const fileContent = await fetchResponse.text();
    return fileContent;
  } catch (error) {
    throw new FetchTextFileError(`Couldn't fetch the file: ${fileName}`);
  }
}
