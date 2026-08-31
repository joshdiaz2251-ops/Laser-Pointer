const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("pointerBridge", {
  send: (payload) => ipcRenderer.send("pointer-update", payload),
  onUpdate: (callback) => {
    ipcRenderer.on("pointer-update", (_event, payload) => callback(payload));
  },
});
