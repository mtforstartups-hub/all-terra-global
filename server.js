// Plesk (Phusion Passenger) startup file.
//
// Plesk cannot run `next start` directly, so Passenger boots this file and
// Next.js serves the build produced by `next build` on the server.
// Local development still uses `next dev` (see package.json).
const { createServer } = require("node:http");
const next = require("next");

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
