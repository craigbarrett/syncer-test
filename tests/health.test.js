const { describe, it } = require("node:test");
const assert = require("node:assert");
const { healthHandler } = require("../src/health");

function createMockRes() {
  const res = {
    statusCode: null,
    headers: {},
    body: null,
    writeHead(code, headers) {
      this.statusCode = code;
      this.headers = headers;
    },
    end(data) {
      this.body = data;
    }
  };
  return res;
}

describe("healthHandler", () => {
  it("returns 200 status code", () => {
    const res = createMockRes();
    healthHandler({}, res);
    assert.strictEqual(res.statusCode, 200);
  });

  it("returns JSON with status ok and timestamp", () => {
    const res = createMockRes();
    healthHandler({}, res);
    const body = JSON.parse(res.body);
    assert.strictEqual(body.status, "ok");
    assert.strictEqual(typeof body.timestamp, "string");
  });

  it("returns a valid ISO8601 timestamp", () => {
    const res = createMockRes();
    healthHandler({}, res);
    const body = JSON.parse(res.body);
    const parsed = Date.parse(body.timestamp);
    assert.ok(!Number.isNaN(parsed), "timestamp should be a valid ISO8601 string");
  });

  it("sets Content-Type to application/json", () => {
    const res = createMockRes();
    healthHandler({}, res);
    assert.strictEqual(res.headers["Content-Type"], "application/json");
  });
});
