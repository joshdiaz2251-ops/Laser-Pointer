// Minimal WebSocket signaling/relay server.
// Rooms are identified by a short code. Whatever one peer in a room sends,
// everyone else in that room receives. Used to exchange WebRTC offer/answer/
// ICE candidates, and later to relay pointer coordinates as a fallback.
const { WebSocketServer } = require("ws");

const PORT = process.env.PORT || 8080;
const wss = new WebSocketServer({ port: PORT });

// roomCode -> Set<ws>
const rooms = new Map();

function joinRoom(code, ws) {
  if (!rooms.has(code)) rooms.set(code, new Set());
  rooms.get(code).add(ws);
  ws.roomCode = code;
}

function leaveRoom(ws) {
  const code = ws.roomCode;
  if (!code || !rooms.has(code)) return;
  const peers = rooms.get(code);
  peers.delete(ws);
  if (peers.size === 0) rooms.delete(code);
}

function broadcast(ws, data) {
  const code = ws.roomCode;
  if (!code || !rooms.has(code)) return;
  for (const peer of rooms.get(code)) {
    if (peer !== ws && peer.readyState === peer.OPEN) {
      peer.send(data);
    }
  }
}

wss.on("connection", (ws) => {
  ws.on("message", (raw) => {
    let msg;
    try {
      msg = JSON.parse(raw);
    } catch {
      return;
    }

    if (msg.type === "join") {
      joinRoom(String(msg.room || "").trim(), ws);
      return;
    }

    // Everything else (offer/answer/ice/pointer) just gets relayed
    // to the other peer(s) in the same room.
    broadcast(ws, raw);
  });

  ws.on("close", () => leaveRoom(ws));
});

console.log(`Signaling/relay server listening on ws://0.0.0.0:${PORT}`);
