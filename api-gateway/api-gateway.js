const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Proxy configuration for pins service
const pinsServiceProxy = createProxyMiddleware({
  target: "http://localhost:3001/pins", // Replace with actual pins service URL
  changeOrigin: true,
  pathRewrite: {
    "^/pins": "", // Remove /pins from the path
  },
});

// Proxy configuration for boards service
const boardsServiceProxy = createProxyMiddleware({
  target: "http://localhost:3002/boards", // Replace with actual boards service URL
  changeOrigin: true,
  pathRewrite: {
    "^/boards": "", // Remove /boards from the path
  },
});

// Routes
app.use("/pins", pinsServiceProxy);
app.use("/boards", boardsServiceProxy);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
