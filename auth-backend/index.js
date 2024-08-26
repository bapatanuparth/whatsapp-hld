import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import connectToMongoDB from "./db/mongoDBConnection.js";

const app = express();
dotenv.config();
app.use(express.json());

const port = process.env.PORT || 5000;
// const server = http.createServer(app); //create a simple HTTP server

app.get("/", (req, res) => {
  res.send("Congratulations! Landing page");
});

app.use("/auth", authRouter);

app.listen(port, () => {
  connectToMongoDB();
  //you have to make sure to listen on .server and not on .app
  console.log(`Server is listening at http://localhost:${port}`);
});
