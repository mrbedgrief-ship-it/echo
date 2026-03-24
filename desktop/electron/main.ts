import { app, BrowserWindow, shell } from "electron";
import path from "node:path";

const isDev = !!process.env.VITE_DEV_SERVER_URL;

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 920,
    minWidth: 1100,
    minHeight: 760,
    title: "Echo — A calmer way to stay close.",
    backgroundColor: "#0c0f17",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL!);
    win.webContents.openDevTools({ mode: "detach" });
  } else {
    win.loadFile(path.join(app.getAppPath(), "dist", "index.html"));
  }

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });
}

app.whenReady().then(createWindow);
app.on("window-all-closed", () => process.platform !== "darwin" && app.quit());
