import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", (ws) => {
  console.log("✅ Client connected");

  ws.on("message", (message) => {
    console.log("📩 Received:", message);

    // Broadcast data to all connected clients (ESP32 + dashboards)
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => console.log("❌ Client disconnected"));
});

console.log("🚀 WebSocket server running on ws://localhost:3000");
