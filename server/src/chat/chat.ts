import { Server } from "socket.io";

export const initSocket = (httpServer: any) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("New User connected");
    console.log("Socketid:", socket.id);

    // room join
    socket.on("join-room", (joinRoomObj) => {});

    // new message
    socket.on("newMessage", (newMessage) => {});
  });
  return io;
};
