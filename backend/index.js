import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";
import connectToMongoDB from "./db/mongoDBConnection.js";
import { addMsgToConversation } from "./controllers/msgs.controller.js";
import msgRouter from "./routes/msgs.route.js";
import cors from "cors";
import { subscribe, publish } from "./redis/msgsPubSub.js";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from your frontend
    credentials: true, // Include credentials if needed (cookies, authorization headers)
  })
);

const port = process.env.PORT || 5000;
const server = http.createServer(app); //create a simple HTTP server
const io = new Server(server, {
  cors: {
    allowedHeaders: ["*"],
    origin: "*",
  },
});

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("client is connected");
  const username = socket.handshake.query.username;
  console.log(username);

  userSocketMap[username] = socket; //store the user connected to the socket in map
  const channelName = `chat_${username}`;
  subscribe(channelName, (msg) => {
    socket.emit("chat msg", JSON.parse(msg));
  });

  socket.on("chat msg", (msg) => {
    // socket.broadcast.emit("chat msg", msg);
    console.log("Message received" + msg.receiver);
    const receiverSocket = userSocketMap[msg.receiver]; //identify the right socket
    if (receiverSocket) {
      receiverSocket.emit("chat msg", msg.text);
    } else {
      const channelName = `chat_${msg.receiver}`;
      publish(channelName, JSON.stringify(msg));
    }

    addMsgToConversation([msg.sender, msg.receiver], {
      text: msg.text,
      sender: msg.sender,
      receiver: msg.receiver,
    });
  });
});

app.get("/", (req, res) => {
  res.send("Congratulations! Landing page");
});

app.use("/msgs", msgRouter);

server.listen(port, () => {
  connectToMongoDB();
  //you have to make sure to listen on .server and not on .app
  console.log(`Server is listening at http://localhost:${port}`);
});
