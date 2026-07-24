import http from "http";
import path from "path";
import fs from "fs/promises";
import { WebSocketServer } from "ws";
const PORT = process.env.PORT ?? 9000;
const httpserver = http.createServer(async function (req, res) {
  const indexFile = await fs.readFile(path.resolve("./index.html"), "utf-8");
  res.setHeader("Content-Type", "text/html");
  return res.end(indexFile);
});
const wsServer = new WebSocketServer({ server: httpserver });

wsServer.on("connection", (websocket) => {
  console.log("WebSocket Connection...");

  websocket.on("message", (data) => {
    console.log(`WebSocket Message Recv. `, data.toString());
    websocket.send("pongg.. hello ji from server");
  });
});

httpserver.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
