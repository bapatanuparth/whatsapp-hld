import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
const server = http.createServer(app); //create a simple HTTP server
const io = new Server(server, {
  cors: {
    allowedHeaders: ["*"],
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("client is connected");
});

app.get("/", (req, res) => {
  res.send("Congratulations! Landing page");
});

server.listen(port, () => {
  //you have to make sure to listen on .server and not on .app
  console.log(`Server is listening at http://localhost:${port}`);
});
