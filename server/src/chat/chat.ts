import { Server } from "socket.io";

export const initSocket = (httpServer: any) => {
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("New User connected");

    // room join
    socket.on("join-room", (joinRoomObj) => {});

    // new message
    socket.on("newMessage", (newMessage) => {});
  });
  return io;
};
