import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import usersRouter from "./routes/users.route.js";
import connectToMongoDB from "./db/mongoDBConnection.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
app.use(express.json()); //this is a middleware
app.use(cookieParser());

const port = process.env.PORT || 5000;
// const server = http.createServer(app); //create a simple HTTP server
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:8083"],
  })
);

app.get("/", (req, res) => {
  res.send("Congratulations! Landing page");
});

app.use("/auth", authRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  connectToMongoDB();
  //you have to make sure to listen on .server and not on .app
  console.log(`Server is listening at http://localhost:${port}`);
});
