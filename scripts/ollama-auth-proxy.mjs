import http from "node:http";

const PORT = parseInt(process.env.PROXY_PORT || "8080", 10);
const TARGET_HOST = process.env.TARGET_HOST || "127.0.0.1";
const TARGET_PORT = parseInt(process.env.TARGET_PORT || "11434", 10);
const EXPECTED_TOKEN =
  process.env.OLLAMA_PROXY_TOKEN ||
  "6c78020674852b57be88c7416dae2fa2ce6f51f08823fc0d234a42fea1f161f6";

const server = http.createServer((req, res) => {
  // Allow CORS preflight requests
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
    });
    return res.end();
  }

  // Token authentication check
  const authHeader = req.headers["authorization"] || "";
  const expectedBearer = `Bearer ${EXPECTED_TOKEN}`;

  if (authHeader !== expectedBearer) {
    res.writeHead(401, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    });
    return res.end(JSON.stringify({ error: "Unauthorized: Invalid or missing token." }));
  }

  // Prepare headers for upstream forwarding
  const headers = { ...req.headers };
  delete headers["authorization"]; // do not leak or confuse upstream
  headers["host"] = `${TARGET_HOST}:${TARGET_PORT}`;

  const proxyReq = http.request(
    {
      hostname: TARGET_HOST,
      port: TARGET_PORT,
      path: req.url,
      method: req.method,
      headers,
    },
    (proxyRes) => {
      const responseHeaders = { ...proxyRes.headers };
      responseHeaders["Access-Control-Allow-Origin"] = "*";
      res.writeHead(proxyRes.statusCode || 500, responseHeaders);
      proxyRes.pipe(res);
    }
  );

  proxyReq.on("error", (err) => {
    console.error(`[Proxy Error] ${err.message}`);
    if (!res.headersSent) {
      res.writeHead(502, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      });
      res.end(JSON.stringify({ error: `Bad Gateway: Ollama error - ${err.message}` }));
    }
  });

  req.pipe(proxyReq);
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`[Ollama Auth Proxy] listening on http://127.0.0.1:${PORT} -> forwarding to http://${TARGET_HOST}:${TARGET_PORT}`);
});
