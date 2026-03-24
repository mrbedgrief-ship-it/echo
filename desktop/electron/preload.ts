import { contextBridge } from "electron";

contextBridge.exposeInMainWorld("echoDesktop", {
  platform: process.platform,
});
