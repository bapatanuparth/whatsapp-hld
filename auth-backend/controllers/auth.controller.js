import User from "../models/user.model.js";

import bcrypt from "bcrypt";
import generateJWTTokenAndSetCookie from "../utils/generateToken.js";

const signup = async (req, res) => {
  console.log("inside controller");
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const foundUser = await User.findOne({ username });
    if (foundUser) {
      res.status(401).json({ message: "Username already exists" });
    } else {
      const user = new User({ username: username, password: hashedPassword });
      generateJWTTokenAndSetCookie(user._id, res);
      await user.save();
      res.status(201).json({ message: "User created" });
    }
  } catch (error) {
    res.status(201).json({ message: "User reg failed" });
  }
};

export const login = async (req, res) => {
  console.log("inside login");
  try {
    const { username, password } = req.body;

    const foundUser = await User.findOne({ username });
    if (!foundUser) {
      res.status(401).json({ message: "User not found" });
    } else {
      const passwordMatch = await bcrypt.compare(password, foundUser?.password);
      if (!passwordMatch) {
        res.status(401).json({ message: "Auth failed" });
      }
      generateJWTTokenAndSetCookie(foundUser._id, res);
      res
        .status(200)
        .json({ _id: foundUser._id, username: foundUser.username });
    }
  } catch (error) {
    res.status(201).json({ message: "Login failed" });
  }
};

export default signup;
