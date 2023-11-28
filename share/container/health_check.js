/*

This application is used to create a `HEALTHCHECK` instruction in the
`Dockerfile` or `Containerfile`.

Usage:

node health_check.js 3000
node health_check.js PORT

*/

const http = require("http");

// Retrieve the port number from the command-line arguments.
// Default to 3000 if no argument is provided
const port = process.argv[2] || "3000";

const options = {
  host: "localhost",
  port,
  timeout: 2000
};

const request = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  if (res.statusCode === 200) {
    process.exit(0);
  }
  else {
    process.exit(1);
  }
});

request.on("error", function (err) {
  console.log("ERROR");
  process.exit(1);
});

request.end();
