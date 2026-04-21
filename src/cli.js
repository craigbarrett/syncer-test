#!/usr/bin/env node

const http = require("http");
const path = require("path");

const HEALTH_URL = process.env.SYNCER_HEALTH_URL || "http://localhost:3000/health";

function formatDuration(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const parts = [];
  if (hrs > 0) parts.push(`${hrs}h`);
  if (mins > 0) parts.push(`${mins}m`);
  parts.push(`${secs}s`);
  return parts.join(" ");
}

function checkHealth() {
  return new Promise((resolve) => {
    const req = http.get(HEALTH_URL, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        resolve(res.statusCode === 200);
      });
    });
    req.on("error", () => {
      resolve(false);
    });
    req.setTimeout(3000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function main() {
  const pkg = require(path.join(__dirname, "..", "package.json"));
  const healthy = await checkHealth();
  const uptime = process.uptime();

  console.log(`Health Endpoint: ${healthy ? "reachable" : "unreachable"}`);
  console.log(`Version: ${pkg.version}`);
  console.log(`Uptime: ${formatDuration(uptime)}`);

  process.exit(healthy ? 0 : 1);
}

main();
