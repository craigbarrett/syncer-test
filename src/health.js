function healthHandler(req, res) {
  const body = JSON.stringify({
    status: "ok",
    timestamp: new Date().toISOString()
  });

  res.writeHead(200, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(body)
  });
  res.end(body);
}

module.exports = { healthHandler };
