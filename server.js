import WebSocket, { WebSocketServer } from "ws";
import express from "express";

const app = express();
const PORT = process.env.PORT || 10000;

// Serve dashboard files
app.use(express.static("public"));

// Start HTTP server
const server = app.listen(PORT, () => {
  console.log(`🌍 Express server running on port ${PORT}`);
});

// Start WebSocket server
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    console.log("Received from client:", message.toString());

    // Broadcast to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => console.log("Client disconnected"));
});
