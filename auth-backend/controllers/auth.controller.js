import User from "../models/user.model.js";

import bcrypt from "bcrypt";

const signup = async (req, res) => {
  console.log("inside controller");
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const foundUser = await User.findOne({ username });
    if (foundUser) {
      res.status(201).json({ message: "Username already exists" });
    } else {
      const user = new User({ username: username, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: "User created" });
    }
  } catch (error) {
    res.status(201).json({ message: "User reg failed" });
  }
};

export default signup;
