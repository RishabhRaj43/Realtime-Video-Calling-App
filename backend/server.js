import { Server } from "socket.io";

const io = new Server(5000, {
  cors: true,
});

const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on("connection", (socket) => {
  console.log("connected");

  socket.on("room:join", (data) => {
    const { email, roomId } = data;

    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);

    io.to(roomId).emit("user:joined", { email, id: socket.id });
    socket.join(roomId);

    io.to(socket.id).emit("room:join", data);
  });
});
