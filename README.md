# Laser Pointer

Point at things on your friend's screen while you talk. Your friend runs a
small desktop app that shares their screen and shows a transparent
always-on-top red dot; you open a webpage that shows their screen and moves
that dot wherever your mouse goes.

## How it works

- **server/** — a tiny Node WebSocket relay. It just passes WebRTC signaling
  messages (and pointer coordinates) between whoever's in the same "room".
  It never sees the actual screen video.
- **host/** — an Electron app **your friend runs**. It shares their screen
  over WebRTC and renders the pointer dot in a transparent overlay window
  that sits on top of everything else on their desktop.
- **viewer/** — a plain webpage **you open in your own browser**. It shows
  their shared screen; your mouse position over that video is sent to them
  in real time.

Video and pointer data flow directly between the two computers over WebRTC
(peer-to-peer) once the connection is established — the relay server is only
needed to set that connection up.

## 1. Run the relay server

You need this reachable by both computers. Easiest: run it on your own PC and
have your friend connect to your public IP (with the port forwarded), or
deploy it for free on something like Render/Fly.io/Railway. For a first test
on the same network, `localhost` is fine.

```bash
cd server
npm install
npm start
```

This starts the server on `ws://<your-address>:8080`.

## 2. Your friend: run the host app

They need [Node.js](https://nodejs.org) installed.

```bash
cd host
npm install
npm start
```

In the window that opens:
1. Set **Signaling server URL** to `ws://<address-of-the-server>:8080`.
2. Pick a **room code** (any string, e.g. `blue-otter-42`) and share it with
   you (over Discord/text/whatever).
3. Click **Share screen & connect** and choose the screen to share.

## 3. You: open the viewer page

Just open `viewer/index.html` in your browser (double-click it, or serve it
with any static file server).

1. Enter the same **server URL** and **room code**.
2. Click **Connect**. Their screen appears.
3. Move your mouse over the video — a red dot appears on their screen at the
   matching spot. Move off the video to hide it.

## Notes / limitations

- The overlay dot is click-through and always-on-top, so it shows up over
  whatever your friend is doing (files, browser, IDE, etc.) without
  interfering with their mouse/keyboard.
- This only shares video + a pointer, not control — you can point, not type
  or click for them.
- For internet use (not same LAN), the relay server needs a public address.
  WebRTC itself is peer-to-peer and usually punches through home NAT via the
  public STUN server already configured (`stun.l.google.com`); in rare cases
  behind strict NAT/firewalls you may need a TURN server too.
- Multi-monitor setups: the overlay currently covers the *primary* display
  only, matching whichever screen your friend picks to share.
