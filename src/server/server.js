import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  // Drawing event
  socket.on("draw", (data) => {
    socket.broadcast.emit("remote-draw", data);
  });

  // Object addition event
  socket.on("object-added", (data) => {
    socket.broadcast.emit("new-add", data);
  });

  socket.on("object-modified", (data) => {
    socket.broadcast.emit("modified", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("cursor:move", (data) => {
    socket.broadcast.emit("cursor:moved", data);
  });

  socket.on("disconnect", () => {
    io.emit("user:disconnected", socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
