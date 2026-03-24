import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function connectSocket(token: string) {
  socket = io(import.meta.env.VITE_SOCKET_URL, { auth: { token } });
  return socket;
}

export function getSocket() {
  return socket;
}
