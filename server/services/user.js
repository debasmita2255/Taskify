const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required!" });
    }
    if (username.length < 5) {
      return res
        .status(400)
        .json({ error: "Username should be at least 5 characters!" });
    }
    if (password.length <= 3) {
      return res
        .status(400)
        .json({ error: "Password should be at least 4 characters!" });
    }

    const checkUser = await User.findOne({ $or: [{ email }, { username }] }); // check if database mei matching credential already exist krta hai
    if (checkUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists!" });
    } else {
      const hashPass = await bcrypt.hash(password, 10); // 10 is the salt
      const newUser = new User({ username, email, password: hashPass });
      await newUser.save();
      return res.status(200).json({ success: "Registration successful!" });
    }
  } catch (error) {
    console.log("Registration Error:", error);
    return res.status(500).json({ error: "Internal server error!" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required!" });
    }
    const checkUser = await User.findOne({ email }); // check if email matches one in the database

    if (!checkUser) {
      return res.status(400).json({ error: "Invalid Credentials!" });
    }

    const isMatch = await bcrypt.compare(password, checkUser.password); // wait till you compare the login password with the password stored in the database
    if (isMatch) {
      const token = jwt.sign(
        { id: checkUser._id, email: checkUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "30d" },
      );

      res.cookie("taskifyUserToken", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
      });

      return res.status(200).json({ success: "Login Successful!" });
    } else {
      return res.status(400).json({ error: "Invalid Credentials!" });
    }
  } catch (error) {
    console.log("Login Error:", error);
    return res.status(400).json({ error: "Internal server error!" });
  }
};

const logout = async (req, res) => {
  try {
    // Clear the exact cookie name you set during login
    res.clearCookie("taskifyUserToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });
    return res.status(200).json({ success: "Logged out successfully!" });
  } catch (error) {
    console.log(`Error in services/user: ${error}`);
    return res
      .status(500)
      .json({ error: "Internal server error during logout!" });
  }
};

module.exports = { register, login, logout };
