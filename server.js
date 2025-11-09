import express from "express";
import { WebSocketServer } from "ws";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, "public")));

// Use the Render provided port
const PORT = process.env.PORT || 3000;
const server = createServer(app);

// Create WebSocket server on the same HTTP server
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    console.log("Received:", message);

    // Broadcast to all clients
    wss.clients.forEach(client => {
      if (client.readyState === ws.OPEN) client.send(message.toString());
    });
  });

  ws.on("close", () => console.log("Client disconnected"));
});

server.listen(PORT, () => {
  console.log(`🌍 HTTP & WebSocket running on port ${PORT}`);
});
