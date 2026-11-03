// Plesk (Phusion Passenger) startup file.
//
// Plesk cannot run `next start` directly, so Passenger boots this file and
// Next.js serves the build produced by `next build` on the server.
// Local development still uses `next dev` (see package.json).
const { createServer } = require("node:http");
const next = require("next");
const fs = require("node:fs");
const path = require("node:path");

// --- Duplicate console output (stdout/stderr) to app.log ---
try {
  const logFile = path.join(__dirname, "app.log");
  const logStream = fs.createWriteStream(logFile, { flags: "a" });
  logStream.on("error", (err) => {
    // Avoid unhandled stream error from crashing the server
    console.error("Failed to write to app.log:", err.message);
  });

  const origStdout = process.stdout.write.bind(process.stdout);
  const origStderr = process.stderr.write.bind(process.stderr);

  process.stdout.write = function (chunk, ...args) {
    try {
      logStream.write(chunk);
    } catch (_) {}
    return origStdout(chunk, ...args);
  };

  process.stderr.write = function (chunk, ...args) {
    try {
      logStream.write(chunk);
    } catch (_) {}
    return origStderr(chunk, ...args);
  };
} catch (e) {
  console.error("Could not initialize app.log stream:", e);
}
// -----------------------------------------------------------

const port = Number(process.env.PORT) || 3000;
const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer((req, res) => handle(req, res)).listen(port, () => {
      console.log(`> All-Terra Global ready on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start Next.js:", error);
    process.exit(1);
  });
