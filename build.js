// Writes what the build read of its build variables, which index.js serves on /build-variables: the value of the plain
// PUBLIC_GREETING, and only the SHA-256 of the sensitive BUILD_TOKEN. A Dockerfile build reads the token as a secret
// file, and Railpack gives it to the build as an environment variable.
const { createHash } = require("crypto");
const fs = require("fs");

const secretFile = "/run/secrets/BUILD_TOKEN";
const token = process.env.BUILD_TOKEN ?? (fs.existsSync(secretFile) ? fs.readFileSync(secretFile, "utf8") : null);

fs.writeFileSync(
  `${__dirname}/build-variables.json`,
  JSON.stringify({
    greeting: process.env.PUBLIC_GREETING ?? null,
    tokenSha256: token === null ? null : createHash("sha256").update(token).digest("hex"),
  }),
);
