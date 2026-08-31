const { app, BrowserWindow, ipcMain, screen, session, desktopCapturer } = require("electron");
const path = require("path");

let controlWin = null;
let overlayWin = null;

function createControlWindow() {
  controlWin = new BrowserWindow({
    width: 420,
    height: 480,
    resizable: false,
    title: "Laser Pointer - Host (share your screen)",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
    },
  });
  controlWin.loadFile("control.html");
}

function createOverlayWindow() {
  const primary = screen.getPrimaryDisplay();
  const { x, y, width, height } = primary.bounds;

  overlayWin = new BrowserWindow({
    x,
    y,
    width,
    height,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    focusable: false,
    hasShadow: false,
    fullscreenable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
    },
  });

  overlayWin.setIgnoreMouseEvents(true, { forward: true });
  overlayWin.setAlwaysOnTop(true, "screen-saver");
  overlayWin.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  overlayWin.loadFile("overlay.html");
}

app.whenReady().then(() => {
  // Let the renderer call navigator.mediaDevices.getDisplayMedia() directly
  // and pick the whole screen automatically (no extra native picker dialog).
  session.defaultSession.setDisplayMediaRequestHandler((request, callback) => {
    desktopCapturer.getSources({ types: ["screen"] }).then((sources) => {
      callback({ video: sources[0], audio: "loopback" });
    });
  });

  createControlWindow();
  createOverlayWindow();
});

ipcMain.on("pointer-update", (_event, payload) => {
  if (overlayWin && !overlayWin.isDestroyed()) {
    overlayWin.webContents.send("pointer-update", payload);
  }
});

app.on("window-all-closed", () => {
  app.quit();
});
