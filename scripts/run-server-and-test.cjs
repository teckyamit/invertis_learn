const { spawn } = require("child_process");
const http = require("http");
const path = require("path");

function waitForServer(url, timeout = 30000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    function ping() {
      http.get(url, (res) => {
        resolve();
      }).on("error", () => {
        if (Date.now() - start > timeout) {
          reject(new Error("Server startup timed out"));
        } else {
          setTimeout(ping, 500);
        }
      });
    }
    ping();
  });
}

async function main() {
  console.log("Starting Next.js production server on 127.0.0.1:3000...");
  const server = spawn("npx.cmd", ["next", "start", "-H", "127.0.0.1", "-p", "3000"], {
    cwd: path.resolve(__dirname, ".."),
    stdio: "inherit",
    shell: true
  });

  server.on("error", (err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });

  try {
    console.log("Waiting for server to become responsive...");
    await waitForServer("http://127.0.0.1:3000/syllabus");
    console.log("Server is live! Running test suite...\n");

    const tester = spawn("node", [path.resolve(__dirname, "test-pyq-integration.cjs")], {
      cwd: path.resolve(__dirname, ".."),
      stdio: "inherit"
    });

    tester.on("close", (code) => {
      console.log("\nShutting down server...");
      // kill process tree on Windows
      if (server.pid) {
        spawn("taskkill", ["/pid", server.pid.toString(), "/f", "/t"]);
      }
      process.exit(code);
    });
  } catch (err) {
    console.error("Error during test run:", err);
    if (server.pid) {
      spawn("taskkill", ["/pid", server.pid.toString(), "/f", "/t"]);
    }
    process.exit(1);
  }
}

main();
